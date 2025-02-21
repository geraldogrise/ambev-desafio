import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/mat.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from './components/core/header/header.component';

@NgModule({
  declarations: [
     HeaderComponent,
     AppComponent,
     LoginComponent
 ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatModule,
    RouterModule.forRoot(routes) 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }