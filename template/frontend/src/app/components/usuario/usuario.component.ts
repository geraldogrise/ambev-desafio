import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from '../../models/UserModel';
import UserService from '../../services/UserService';
import { ApiSingleResponse } from '../../models/core/ApiSingleResponse';
import { UserStatus } from '../../models/enums/UserStatus';
import { UserRole } from '../../models/enums/UserRole';
import { mapToUserModel } from '../common/mapToUserModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  model: UserModel  = new UserModel();
  form!: FormGroup;
  id: string | null = null;
  titulo: string = "Cadastrar Usuário";

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); 
      if (this.id) {
        this.titulo = "Editar Usuário";
        this.load();
      }
    });
  }

  inicializarForm()
  {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      status: [UserStatus.Unknown, Validators.required],
      role: [UserRole.None, Validators.required],

      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],

      lat: ['', Validators.required],
      long: ['', Validators.required]
    });
  }

  load() {
    this.service.GetById(this.id ?? "").subscribe({
      next: (response: ApiSingleResponse<UserModel>) => {
        if (response.success) {
          const userModel = mapToUserModel(response.data.data);
          this.model = userModel;
          this.loadForm();
          console.log('Usuário carregado:', this.model);
        } else {
          console.error('Erro ao buscar usuário:', response.message);
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      }
    });
 

  }

  loadForm()
  {
    console.log(this.model);
    // Preencher os campos do formulário com os dados do usuário
    this.form.patchValue({
      username: this.model.username,
      email: this.model.email,
      phone: this.model.phone,
      status: this.model.status,
      role: this.model.role,
      firstname: this.model.name.firstname,
      lastname: this.model.name.lastname,
      city: this.model.address.city,
      street: this.model.address.street,
      number: this.model.address.number,
      zipcode: this.model.address.zipcode,
      lat: this.model.address.geolocation.lat,
      long: this.model.address.geolocation.long
    });
  }

  converter()
  {
    const converted = new UserModel(
      this.id ?? "", 
      this.form.value.username,
      this.form.value.password || "", 
      this.form.value.email,
      this.form.value.phone,
      this.form.value.status,
      this.form.value.role,
      { firstname: this.form.value.firstname, lastname: this.form.value.lastname },
      {
        city: this.form.value.city,
        street: this.form.value.street,
        number: this.form.value.number,
        zipcode: this.form.value.zipcode,
        geolocation: { lat: this.form.value.lat, long: this.form.value.long }
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

  insert(request: UserModel)
  {
    this.service.Insert(request).subscribe(() => {
      alert('Usuário salvo com sucesso!');
      this.router.navigate(['/usuarios']);
    }, error => {
      alert('Erro ao salvar usuário.');
      console.error(error);
    });
  }

  update(request: UserModel)
  {
    if(this.id)
    {
        this.service.Update(this.id, request).subscribe(() => {
          alert('Usuário atualizado com sucesso!');
          this.router.navigate(['/usuarios']);
        }, error => {
          alert('Erro ao atualizar usuário.');
          console.error(error);
        });
    }
     
  }



  cancel()
  {
    this.router.navigate(['/usuarios']);
  }
}
