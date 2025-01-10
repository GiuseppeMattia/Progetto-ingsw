import {Component, HostListener, NgModule, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegisterComponent, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'frontend-ingsw';
  constructor(private http: HttpClient,
              private api: ApiService) {
  }
  ngOnInit() {
    this.api.getGreet().subscribe(response => {
      console.log(response);
    });
  }

}
