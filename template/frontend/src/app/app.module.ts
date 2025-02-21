import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/mat.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from './components/core/header/header.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import UserService from './services/UserService';
import ProductService from './services/ProductService';
import { HttpClientModule } from '@angular/common/http';
import { UserRoleSelectComponent } from './components/core/user-role-select/user-role-select.component';
import { UserStatusSelectComponent } from './components/core/user-status-select/user-status-select.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ProdutoComponent } from './components/produto/produto.component';



@NgModule({
  declarations: [
     HeaderComponent,
     UserRoleSelectComponent,
     UserStatusSelectComponent,
     AppComponent,
     LoginComponent,
     UsuariosComponent,
     UsuarioComponent,
     ProdutosComponent,
     ProdutoComponent

 ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [
    UserService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }