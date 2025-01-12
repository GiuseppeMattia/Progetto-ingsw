import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {}

  isLogged(): boolean {
    return this.cookieService.get('logged') === "true";
  }

  setLogged(name: boolean){
    this.cookieService.set('logged', name.toString());
  }
}


