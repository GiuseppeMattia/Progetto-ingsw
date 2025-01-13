import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regolesceglitu',
  imports: [],
  templateUrl: './regolesceglitu.component.html',
  styleUrl: './regolesceglitu.component.css'
})
export class RegolesceglituComponent {
  constructor(private router: Router) {}

  home(){
    this.router.navigate(["/home"]);
  }

  play(){
    this.router.navigate(["/sceglitu"])
  }
}
