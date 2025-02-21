import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from '../../models/UserModel';
import UserService from '../../services/UserService';
import { ApiSingleResponse } from '../../models/core/ApiSingleResponse';
import { UserStatus } from '../../models/enums/UserStatus';
import { UserRole } from '../../models/enums/UserRole';
import { mapToUserModel } from '../common/mapToUserModel';
import ProductModel from '../../models/ProductModel';
import ProductService from '../../services/ProductService';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {

  model: ProductModel  = new ProductModel();
  form!: FormGroup;
  id: string | null = null;
  titulo: string = "Cadastrar Produto";

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); 
      if (this.id) {
        this.titulo = "Editar Produto";
        this.load();
      }
    });
  }

  inicializarForm()
  {
    this.form = this.fb.group({
      id: [null], // Pode ser preenchido automaticamente
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
      rating: this.fb.group({
        rate: [0, [Validators.min(0), Validators.max(5)]],
        count: [0, Validators.min(0)]
      })
    });
  }

  load() {
    this.service.GetById(this.id ?? "").subscribe({
      next: (response: ApiSingleResponse<ProductModel>) => {
        if (response.success) {
          this.model = response.data.data;
          this.loadForm();
          console.log('Produto carregado:', this.model);
        } else {
          console.error('Erro ao buscar produto:', response.message);
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      }
    });
 

  }

  loadForm()
  {
  
    this.form.patchValue({
      id: this.model.id,
      title: this.model.title,
      price: this.model.price,
      description: this.model.description,
      category: this.model.category,
      image: this.model.image,
      rating: {
        rate: this.model.rating?.rate || 0,
        count: this.model.rating?.count || 0
      }
    });

  }

  converter()
  {
    const converted = new ProductModel(
      this.id ?? "", 
      this.form.value.title,
      this.form.value.price,
      this.form.value.description,
      this.form.value.category,
      this.form.value.image,
      {
        rate: this.form.get('rating.rate')?.value?? 0,
        count: this.form.get('rating.count')?.value ?? 0
      }
    );

    return converted;
    
  }

  save() {
    if (this.form.valid) {
       const request = this.converter();
       if (this.id) {
          this.update(request);
       }
       else{
         this.insert(request);
       }
    } else {
      console.log(this.form);
      alert('Preencha todos os campos corretamente.');
    }
  }

  insert(request: ProductModel)
  {
    this.service.Insert(request).subscribe(() => {
      alert('Produto salvo com sucesso!');
      this.router.navigate(['/produtos']);
    }, error => {
      alert('Erro ao salvar produto.');
      console.error(error);
    });
  }

  update(request: ProductModel)
  {
    if(this.id)
    {
        this.service.Update(this.id, request).subscribe(() => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/produtos']);
        }, error => {
          alert('Erro ao atualizar produto.');
          console.error(error);
        });
    }
     
  }

  cancel()
  {
    this.router.navigate(['/produtos']);
  }
}
