import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regolecompletatu',
  imports: [],
  templateUrl: './regolecompletatu.component.html',
  styleUrl: './regolecompletatu.component.css'
})
export class RegolecompletatuComponent {
  constructor(private router: Router) {}

  home(){
    this.router.navigate(["/home"]);
  }

  play(){

  }
}
