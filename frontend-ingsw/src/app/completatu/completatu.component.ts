import {Component, OnDestroy, OnInit} from '@angular/core';
import {Domanda} from '../models/domanda.model';
import {Risposta} from '../models/risposta.model';
import {ApiService} from '../service/api.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {forkJoin} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-completatu',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './completatu.component.html',
  styleUrl: './completatu.component.css'
})

export class CompletatuComponent implements OnInit, OnDestroy{

  protected questions: Domanda[];     // Domande da mostrare

  protected currentIndex: number;       // Indice che tiene traccia della domanda corrente
  protected readonly numberOfQuestions: number = 10; // Numero di domande (costante)
  protected currentQuestion: Domanda | null;  // Domanda corrente
  protected insertedAnswer: String | null;  // Risposta inserita
  protected correctAnswers: Risposta[];      // Risposte corrette
  protected currentPoints: number;            // Punteggio attuale
  protected button: string;                   // Scritta del bottone
  protected remainingTime: number;            // Tempo rimanente

  private intervalId: any;                    // Timer
  private answeredCorrectly: Number[];        // Array che contiene le risposte che il giocatore ha azzeccato

  constructor(private api: ApiService, private router: Router, private cookieService: CookieService){
    this.questions = [];

    this.currentIndex = 0;
    this.currentQuestion = null;
    this.insertedAnswer = "";
    this.correctAnswers = [];
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


  ngOnInit() {
    let record = this.api.completaTu(this.cookieService.get("username"));
    record.subscribe(recordone => {
      this.cookieService.set("record", recordone.toString());
    })

    // Prende le domande dal backend
    let d  = this.api.questionsByModality(false);

    d.subscribe(questions => {
      // Imposta le domande da fare
      this.questions = this.getRandomElements(questions, this.numberOfQuestions);

      // Prende le risposte corrette
      let correctAnswers = this.questions.map((question) =>
        this.api.answerById(question.rispostacorretta)
      );

      // Aspetta che finiscano tutte le chiamate asincrone
      forkJoin([...correctAnswers]).subscribe((corrette) => {
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

  debug(){
    for(let i: number = 0; i < this.numberOfQuestions; i++){
      console.log("Domanda " + i + ": " + this.questions[i].descrizione);
      console.log("Risposta associata alla domanda " + i + ": " + this.questions[i].rispostacorretta)
      console.log("Risposta alla domanda " + i + " data dall'array di risposte corrette: " + this.correctAnswers[i].id)
    }
  }

  // Mostra la domanda corrente
  showQuestion(){

    // console.log("L'indice al momento è: " + this.currentIndex);
    // console.log("La traccia audio al momento è: " + this.audioUrl[this.currentIndex] +
    //             " e corrisponde alla traccia: " + this.questions[this.currentIndex].descrizione);

    this.currentQuestion = this.questions[this.currentIndex];
    this.startCountdown();
  }

  next(){
    // Resetta il timer
    this.remainingTime = 15;

    // Se la risposta è giusta, aumenta il punteggio corrente
    if((this.insertedAnswer)?.toLowerCase() === (this.correctAnswers[this.currentIndex].descrizione).toLowerCase()){
        this.currentPoints++;
        this.answeredCorrectly.push(this.currentIndex + 1);
    }

    // Avanti con le domande
    this.currentIndex++;

    // Se non è all'ultima domanda, mostra la prossima domanda
    if(this.currentIndex < this.numberOfQuestions - 1){
      this.insertedAnswer = "";
      this.showQuestion();
    }
    else if(this.currentIndex === this.numberOfQuestions - 1){
      // Cambia il bottone se è all'ultima domanda
      this.insertedAnswer = "";
      this.button = "Termina";
      this.showQuestion();
    } else{
      // Se è andato oltre l'indice delle domande, porta alla schermata dei risultati
      this.cookieService.set("points", this.currentPoints.toString())
      this.cookieService.set("modality", "completatu");
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
