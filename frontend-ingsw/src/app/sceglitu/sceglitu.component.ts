import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {Domanda} from '../models/domanda.model';
import {CommonModule} from '@angular/common';
import {Risposta} from '../models/risposta.model';
import {forkJoin} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-sceglitu',
  imports: [CommonModule, FormsModule],
  templateUrl: './sceglitu.component.html',
  styleUrl: './sceglitu.component.css'
})

export class SceglituComponent implements OnInit, OnDestroy{

  protected questions: Domanda[];     // Domande da mostrare
  protected answers: Risposta[];      // Tutte le risposte
  protected audioUrl : any;           // Array che salva le tracce audio delle domande

  protected currentIndex: number;       // Indice che tiene traccia della domanda corrente
  protected readonly numberOfQuestions: number = 10; // Numero di domande (costante)
  protected currentQuestion: Domanda | null;  // Domanda corrente
  protected selectedAnswer: Risposta | null;  // Risposta selezionata
  protected correctAnswers:  Risposta[];      // Risposte corrette
  protected answersToShow: Risposta[];        // Risposte da mostrare
  protected currentPoints: number;            // Punteggio attuale
  protected currentAudio: any;                // Audio al momento in riproduzione
  protected button: string;                   // Scritta del bottone
  protected remainingTime: number;            // Tempo rimanente

  private intervalId: any;                    // Timer
  private answeredCorrectly: Number[];        // Array che contiene le risposte che il giocatore ha azzeccato

  constructor(private api: ApiService, private router: Router, private cookieService: CookieService){
    this.questions = [];
    this.audioUrl = [];
    this.answers = [];

    this.currentIndex = 0;
    this.currentQuestion = null;
    this.selectedAnswer = null;
    this.correctAnswers = [];
    this.answersToShow = [];
    this.currentPoints = 0;

    this.button = "Avanti";
    this.remainingTime = 15;

    this.answeredCorrectly = [];
  };


  // Prende count elementi casuali dato l'array T di elementi
  getRandomElements<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    const arrayCopy = [...array]; // Copia l'array in un altro array
    for (let i = 0; i < count; i++) {
      if (arrayCopy.length === 0) break;
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      // splice modifica l'array arrayCopy rimuovendo un elemento (1) a caso (randomIndex).
      // Poi, si accede all'elemento rimosso ([0]) e si inserisce (push) in result
      result.push(arrayCopy.splice(randomIndex, 1)[0]);
    }
    return result;
  }

  // Funzione che mischia l'array temporaneo di risposte
  shuffleArray(array: Risposta[]): Risposta[] {
    const arrayCopy = [...array]; // Copia l'array
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Scambia l'elemento corrente con uno casuale
      [arrayCopy[i], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[i]];
    }
    return arrayCopy;
  }


  fromByteToAudio(byte: string){
    let byteCharacters = atob(byte); // Trasforma da Base64 ad ASCII
    let byteArray = new Uint8Array(byteCharacters.length);

    // Memcpy alla crapigna perché Typescript non lo ha
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Blob: dato usato per rappresentare immagini, video, audio, ecc.
    return new Blob([byteArray], { type: 'audio/mp3' });
  }

  ngOnInit() {
    let record = this.api.scegliTu(this.cookieService.get("username"));
    record.subscribe(recordone => {
      this.cookieService.set("record", recordone.toString());
    })

    // Prende le domande dal backend
    let d  = this.api.questionsByModality(true);

    d.subscribe(questions => {
      // Imposta le domande da fare
      this.questions = this.getRandomElements(questions, this.numberOfQuestions);

      // Crea gli audio da mostrare
      for (let i: number = 0; i < this.numberOfQuestions; i++) {
        this.audioUrl.push(URL.createObjectURL(this.fromByteToAudio(this.questions[i].audio)));
      }

      // Chiede TUTTE le risposte al backend
      let answers = this.api.answersByModality(true);

      // Prende le risposte corrette
      let correctAnswers = this.questions.map((question) =>
        this.api.answerById(question.rispostacorretta)
      );

      // Aspetta che finiscano tutte le chiamate asincrone
      forkJoin([answers, ...correctAnswers]).subscribe(([risposte, ...corrette]) => {
        // Assegna tutte le risposte
        this.answers = risposte;
        // Assegna le risposte corrette
        this.correctAnswers = corrette;

        // Mostra la prima domanda
        // this.debug();
        this.showQuestion();
      });
    });
  }

  // Quando ritorna al menù, cancella il timer
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
/*
  debug(){
    for(let i: number = 0; i < this.numberOfQuestions; i++){
      console.log("Domanda " + i + ": " + this.questions[i].descrizione);
      console.log("Risposta associata alla domanda " + i + ": " + this.questions[i].rispostacorretta)
      console.log("Risposta alla domanda " + i + " data dall'array di risposte corrette: " + this.correctAnswers[i].id)
    }
  }
*/
  // Carica le risposte
  loadAnswers(){
    // Carica 4 risposte casuali
    this.answersToShow = this.getRandomElements(this.answers, 4);

    // Controlla che la risposta giusta non ci sia già
    for(let i: number = 0; i < 4; i++){
      if(this.correctAnswers[this.currentIndex].id === this.answersToShow[i].id){
          return;
      }
    }

    // L'indice non c'è, quindi viene caricato
    this.answersToShow[0] = this.correctAnswers[this.currentIndex];

    // Shuffle dell'array per disordinare gli elementi
    this.answersToShow = this.shuffleArray(this.answersToShow);
  }

  // Mostra la domanda corrente
  showQuestion(){

    // console.log("L'indice al momento è: " + this.currentIndex);
    // console.log("La traccia audio al momento è: " + this.audioUrl[this.currentIndex] +
    //             " e corrisponde alla traccia: " + this.questions[this.currentIndex].descrizione);

    this.loadAnswers()
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedAnswer = null;
    this.currentAudio = this.audioUrl[this.currentIndex];
    this.startCountdown();
  }

  selectAnswer(selected: Risposta){
    this.selectedAnswer = selected;
  }

  next(){
    // Resetta il timer
    this.remainingTime = 15;

    // Se ha selezionato la risposta ed è giusta, aumenta il punteggio corrente
    if(this.selectedAnswer != null){
      if(this.selectedAnswer.id === this.correctAnswers[this.currentIndex].id){
        this.currentPoints++;
        this.answeredCorrectly.push(this.currentIndex + 1);
      }
    }

    // Avanti con le domande e la traccia audio
    this.currentIndex++;

    // Se non è all'ultima domanda, mostra la prossima domanda
    if(this.currentIndex < this.numberOfQuestions - 1){
      this.showQuestion();
    }
    else if(this.currentIndex === this.numberOfQuestions - 1){
        // Cambia il bottone se è all'ultima domanda
        this.button = "Termina";
        this.showQuestion();
    } else{
        // Se è andato oltre l'indice delle domande, porta alla schermata dei risultati
        this.cookieService.set("points", this.currentPoints.toString())
        this.cookieService.set("modality", "sceglitu");
        this.cookieService.set("correct", JSON.stringify(this.answeredCorrectly));
        this.router.navigate(["/points"]);
      }
  }

  // Inizia il timer con, opzionalmente, un punteggio già dato (in caso si sia messo in pausa il timer)
  startCountdown(time?: number): void {
    clearInterval(this.intervalId);
    if(time){
      this.remainingTime = time;
    }

    // Avvia il timer
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
        alert("Il tempo è scaduto!");
        this.next();
      }
    }, 1000); // Ogni 1000 ms (1 secondo)
  }

  // Porta alla schermata principale
  home(): void {
    let temp = this.remainingTime;    // Da usare per salvare il tempo rimanente prima dell'alert
    clearInterval(this.intervalId); // Ferma il timer
    const result = confirm("Vuoi tornare al menù?");
    if (result) {
      this.router.navigate(["/home"]); // Naviga al menù
    }
    else{
      this.startCountdown(temp);    // Riprende il timer da dove si era fermato
    }
  }

}
