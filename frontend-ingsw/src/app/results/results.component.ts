import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';
import {NgIf} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-results',
  imports: [
    NgIf,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent implements OnInit, OnDestroy{

  protected points: number;   // Punti fatti nella parita
  protected correctAnswers: any;  // Risposte corrette fatte nella partita
  protected updated: boolean;

  private modality: string;    // true: "Scegli Tu!", false: "Completa Tu!"
  private currentRecord: number = 0;    // Record attuale

  constructor(private cookieService: CookieService, private router: Router, private api: ApiService) {
    this.points = Number(this.cookieService.get("points"));
    this.modality = this.cookieService.get("modality");
    this.updated = false;

    this.correctAnswers = this.cookieService.get("correct");
    this.currentRecord = Number(this.cookieService.get("record"))
  }

  ngOnInit(){
    this.verify();
  }

  // Elimina tutti i cookie che non sono necessari
  ngOnDestroy() {
    this.cookieService.delete("points");
    this.cookieService.delete("modality");
    this.cookieService.delete("correct");
    this.cookieService.delete("record");
  }

  // Riporta alla home
  home(){
    this.router.navigate(["/home"]);
  }

  // Verifica che il record sia stato battuto
    async verify() {
      if(this.points > this.currentRecord) {
        let check = (this.modality === "sceglitu");
        if (check) {
            await firstValueFrom(this.api.updateScegliTuRecord(this.cookieService.get("username"), this.points));
          } else {
            await firstValueFrom(this.api.updateCompletaTuRecord(this.cookieService.get("username"), this.points));
          }

          this.updated = true;
      }
      else{
        this.updated = false;
      }
    }

  // Bottone che riporta a una delle due modalità
  play(){
    (this.cookieService.get("modality") === "sceglitu") ? this.router.navigate(["/regolesceglitu"]) : this.router.navigate(["/regolecompletatu"]);
  }

}
