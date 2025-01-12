import {Component, HostListener} from '@angular/core';
import {Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../api.service'
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

export class LoginComponent{
  constructor(private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private cookieService: CookieService) {}

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
      next: (response) => {
        this.auth.setLogged(true);
        this.cookieService.set("username", username);
        this.router.navigate(["/home"]);
        console.log('Login effettuato con successo');
      },
      error: (error) => {
        if (error.status === 401) { // La password è sbagliata
          alert("Errore: Password errata");
        } else if (error.status === 404) { // L'utente non esiste
          alert("Errore: Utente non trovato");
        } else {
          console.error('Errore sconosciuto: ', error.status);
        }
      }
    });
  }
}
