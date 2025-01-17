import {Component, HostListener, NgModule, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApiService} from './service/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(private api: ApiService) {
  }
  ngOnInit() {
    /*
    this.api.getGreet().subscribe(response => {
      console.log(response);
    });
     */
  }

}
