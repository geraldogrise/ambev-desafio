import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from '../../models/core/PageModel';
import UserService from '../../services/UserService';
import UserModel from '../../models/UserModel';
import ProductService from '../../services/ProductService';
import ProductModel from '../../models/ProductModel';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  data = new Array<ProductModel>();

  displayedColumns: string[] = ['id', 'title', 'category', 'actions'];

  pageModel: PageModel = new PageModel(1, 10, 'title');

  constructor(
    private service: ProductService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(): void {
      this.service.GetAll(this.pageModel).subscribe({
        next: (response) => {
           this.data = response.data?.data?.data || [];
        },
        error: (err) => {
          console.error('Erro ao buscar produtos', err);
        }
      });
   }
  insert()
  {
    this.router.navigate([`/produto`]);
  }

  edit(id: string) {
    this.router.navigate([`/produto/${id}`]);
  }

  delete(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.service.Delete(id).subscribe({
        next: () => {
          alert('produto excluído com sucesso!');
          this.getAll();
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
          alert('Ocorreu um erro ao excluir o produto. Tente novamente.');
        }
      });
    }
  }
  
}