import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-record',
  imports: [],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit{
  public recordSceglitu: any;
  public recordCompletaTu: any;

  constructor(private api: ApiService,
              private cookieService: CookieService,
              private router: Router) {}

  ngOnInit() {
    this.getScegliTu();
    this.getCompletaTu();
  }

  getScegliTu(){
    let record = this.api.scegliTu(this.cookieService.get("username"));
    record.subscribe(punteggio => {
      this.recordSceglitu = punteggio;
    })
  }

  getCompletaTu(){
    let record = this.api.completaTu(this.cookieService.get("username"));
    record.subscribe(punteggio => {
      this.recordCompletaTu = punteggio;
    })
  }

  home(){
    this.router.navigate(["/home"]);
  }
}
