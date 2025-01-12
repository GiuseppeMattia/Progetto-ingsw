import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router,
              private auth: AuthService,
              private cookieService: CookieService) {}

  exit(){
    this.cookieService.delete("username");
    this.auth.setLogged(false);
    this.router.navigate(["/login"]);
    console.log('Logout effettuato con successo');
  }

  record(){
    this.router.navigate(["/record"]);
  }
}
