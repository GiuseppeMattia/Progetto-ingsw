import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Usato per mandare i punteggi al componente dei risultati
export class ResultsService {

  private points: number
  private modality: boolean; // true: "Scegli Tu!", false: "Completa Tu!"

  constructor() {
    this.points = 0;
    this.modality = false;
  }

  getPoints(){
    return this.points;
  }

  setPoints(p: number){
    this.points = p;
  }

  isModality(){
    return this.modality;
  }

  setModality(m: boolean){
    this.modality = m;
  }
}
