import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service'
import {AuthService} from '../auth/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  constructor(private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private cookieService: CookieService) {}

  // In caso qualcuno sia già loggato e decida di andare sul path ""
  ngOnInit() {
    if(this.cookieService.get("logged") === "true"){
      this.router.navigate(["/home"]);
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Chiede all'utente se è sicuro di uscire dalla pagina dopo i cambiamenti al form
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isFormDirty()) {
      $event.returnValue = true;
    }
  }

  // Vede che i campi del form siano stati modificati
  isFormDirty(): boolean {
    return this.loginForm.dirty;
  }

  validateUser() {
    let username = this.loginForm.get('username')?.value ?? '';
    let password = this.loginForm.get('password')?.value ?? '';

    // Se l'username è vuoto, lo dice
    if (!username.trim()) {
      alert("Errore: Il campo 'username' è vuoto");
      return;
    }

    // Se la password è vuota, lo dice
    if (!password.trim()) {
      alert("Errore: Il campo 'password' è vuoto");
      return;
    }

    // Invia i vari dati al backend
    this.api.sendUser(username, password).subscribe({
      next: () => {
        this.auth.setLogged(true);
        this.cookieService.set("username", username);
        this.router.navigate(["/home"]);
        //console.log('Login effettuato con successo');
      },
      error: (error) => {
        if (error.status === 401) { // La password è sbagliata
          alert("Errore: Password errata");
        } else if (error.status === 404) { // L'utente non esiste
          alert("Errore: Utente non trovato");
        } else if (error.status === 0){
          alert('Il servizio non è al momento raggiungibile. Riprova più tardi');
        } else {
          alert("C'è stato un errore nel login")
          console.error('Errore sconosciuto: ', error.status);
        }
      }
    });
  }
}
