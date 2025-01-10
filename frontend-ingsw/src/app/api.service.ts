import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Chiamata al backend di prova per vedere che il backend funziona
  getGreet(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/greet`);
  }

  // Invia al backend i dati da verificare
  sendUser(username: any, password: any): Observable<any>{
    let body = {username, password};
    return this.http.post(`${this.baseUrl}/validate`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 0){ // Se il backend è spento, manda l'alert
          alert('Il servizio non è al momento raggiungibile. Riprova più tardi');
        }
        else{
          return throwError(() => ({ message: 'Messaggio di errore', status: error.status}));
        }
        return of(null);
      })
    );
  }

  // Registra l'utente
  registerUser(username: any, password: any): Observable<any>{

    let body = {username, password};
    return this.http.post(`${this.baseUrl}/create`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 0){ // Se il backend è spento, manda l'alert
          alert('Il servizio non è al momento raggiungibile. Riprova più tardi');
        }
        else{
          return throwError(() => ({ message: 'Messaggio di errore', status: error.status}));
        }
        return of(null);
      })
    );
  }
}
