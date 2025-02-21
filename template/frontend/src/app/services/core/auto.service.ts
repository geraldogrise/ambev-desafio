import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import UserModel from '../../models/UserModel';

@Injectable()
export class AuthService {

  private authenticated: boolean = false;

  constructor(private router: Router) { }

  login(user : UserModel ){
    let emitir = false;
    if (user.username === 'grise' &&  user.password === '1234') {
      this.authenticated = true;
      this.router.navigate(['/']);
    } 
  }

  getAuthenticated(){
    return this.authenticated;
  }

}