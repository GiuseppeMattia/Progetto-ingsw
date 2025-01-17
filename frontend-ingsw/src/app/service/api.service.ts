import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {Domanda} from '../models/domanda.model';
import {Risposta} from '../models/risposta.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private router: Router) {}

  findErrorForArrays(error: HttpErrorResponse){
    if(error.status === 0){ // Se il backend è spento, manda l'alert
      alert('Qualcosa è andato storto nel caricamento delle risorse necessarie alla partita.' +
            'Riprova più tardi');
      this.router.navigate(["/home"]);
    }
    else{
      return throwError(() => ({ message: 'Si è verificato un errore sconosciuto', status: error.status}));
    }
    return of([]);
  }

  findErrorsForRecord(error: HttpErrorResponse){
    if(error.status === 0){ // Se il backend è spento, manda l'alert
      alert('Qualcosa è andato storto nel salvataggio dei nuovi record. ' +
        'Riprova più tardi');
      this.router.navigate(["/home"]);
    }
    else{
      return throwError(() => ({ message: 'Si è verificato un errore sconosciuto', status: error.status}));
    }
    return of([]);
  }
/*
  // Chiamata al backend di prova per vedere che il backend funziona
  getGreet(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/greet`);
  }
*/
  // Invia al backend i dati da verificare
  sendUser(username: any, password: any): Observable<any>{
    let body = {username, password};
    return this.http.post(`${this.baseUrl}/validate`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 0){ // Se il backend è spento, manda l'alert
            return throwError(() => ({ message: 'Backend spento', status: error.status}));
        }
        else{
          return throwError(() => ({ message: 'Errore sconosciuto', status: error.status}));
        }
      })
    );
  }

  // Registra l'utente
  registerUser(username: any, password: any): Observable<any>{

    let body = {username, password};
    return this.http.post(`${this.baseUrl}/create`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 0){ // Se il backend è spento, manda l'alert
          return throwError(() => ({ message: 'Backend spento', status: error.status}));
        }
        else{
          return throwError(() => ({ message: 'Si è verificato un errore sconosciuto', status: error.status}));
        }
        return of(null);
      })
    );
  }

  // Fornisce il record della modalità "Scegli Tu!"
  scegliTu(username: string){
   return this.http.post(`${this.baseUrl}/sceglitu`, username).pipe(
     catchError((error: HttpErrorResponse) => {
       if(error.status === 0){ // Se il backend è spento, manda l'alert
         return this.findErrorForArrays(error);       }
       else{
         return throwError(() => ({ message: 'Si è verificato un errore sconosciuto', status: error.status}));
       }
     })
   );
  }

  // Fornisce il record della modalità "Completa Tu!"
  completaTu(username: string){
    return this.http.post(`${this.baseUrl}/completatu`, username).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 0){ // Se il backend è spento, manda l'alert
          return this.findErrorForArrays(error);
        }
        else{
          return throwError(() => ({ message: 'Si è verificato un errore sconosciuto', status: error.status}));
        }
      })
    );
  }

  // Fornisce tutte le domande
    /*
  questions(): Observable<Domanda[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questions`).pipe(
      map((data: any[]) =>
        data.map(item => new Domanda(
          item.id,
          item.descrizione,
          item.modalitasceglitu,
          item.rispostacorretta,
          item.audio
        ))
      ),
      catchError((error: HttpErrorResponse) => {
        return this.findErrorForArrays(error);
      })
    );
  }
*/
  // Fornisce domande in base alla modalità (true: "Scegli Tu!", false: "Completa Tu!")
  questionsByModality(modality: boolean): Observable<Domanda[]>{
    return this.http.post<any[]>(`${this.baseUrl}/questionsbymodality`, modality).pipe(
      map((data: any[]) =>
        data.map(item => new Domanda(
          item.id,
          item.descrizione,
          item.modalitasceglitu,
          item.rispostacorretta,
          item.audio
        ))
      ),
      catchError((error: HttpErrorResponse) => {
        return this.findErrorForArrays(error);
      })
    );
  }

  // Fornisce tutte le risposte
    /*
  answers(): Observable<Risposta[]>{
    return this.http.get<any[]>(`${this.baseUrl}/answers`).pipe(
      map((data: any[]) =>
        data.map(item => new Risposta(
          item.id,
          item.descrizione,
          item.modalitasceglitu
        ))
      )
    );
  }
*/
  // Fornisce risposte in base alla modalità (true: "Scegli Tu!", false: "Completa Tu!")
  answersByModality(modality: boolean): Observable<Risposta[]> {
    return this.http.post<any[]>(`${this.baseUrl}/answersbymodality`, modality).pipe(
      map((data: any[]) =>
        data.map(item => new Risposta(
          item.id,
          item.descrizione,
          item.modalitasceglitu
        ))
      )
    );
  }

  // Fornisce le riposte corrette dato il campo "rispostacorretta" della domanda
  answerById(id: number): Observable<Risposta> {
    return this.http.post<any>(`${this.baseUrl}/answerbyid`, id).pipe(
      map((item: any) =>
        new Risposta(
          item.id,
          item.descrizione,
          item.modalitasceglitu
        )
      )
    );
  }

  updateScegliTuRecord(username: string, record: number) {
    const body = { username, record };
    return this.http.post(`${this.baseUrl}/updatesceglitu`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.findErrorsForRecord(error);
      })
    );
  }

    updateCompletaTuRecord(username: string, record: number){
      const body = { username, record };
      return this.http.post(`${this.baseUrl}/updatecompletatu`, body).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.findErrorsForRecord(error);
        })
      );
    }

}
