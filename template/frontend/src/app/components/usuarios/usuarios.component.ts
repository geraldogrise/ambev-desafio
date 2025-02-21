import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from '../../models/core/PageModel';
import UserService from '../../services/UserService';
import UserModel from '../../models/UserModel';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  users = new Array<UserModel>();

  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'actions'];
  pageModel: PageModel = new PageModel(1, 10, 'username');

  constructor(
    private userService: UserService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(): void {
      this.userService.GetAll(this.pageModel).subscribe({
        next: (response) => {
           this.users = response.data?.data?.data || [];
        },
        error: (err) => {
          console.error('Erro ao buscar usuários', err);
        }
      });
   }
  insert()
  {
    this.router.navigate([`/usuario`]);
  }

  edit(id: string) {
    this.router.navigate([`/usuario/${id}`]);
  }

  delete(id: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.Delete(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          // Aqui você pode chamar um método para atualizar a lista de usuários
          this.getAll();
        },
        error: (err) => {
          console.error('Erro ao excluir usuário:', err);
          alert('Ocorreu um erro ao excluir o usuário. Tente novamente.');
        }
      });
    }
  }
  
}