import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: boolean = false;
  constructor() {}

  isLogged(){
    return this.logged;
  }

  setLogged(b: boolean){
    this.logged = b;
  }
}
