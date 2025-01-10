import {Component, HostListener} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router,
              private api: ApiService) {}

  registerForm = new FormGroup({
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
    return this.registerForm.dirty;
  }

  checkPassword(password: string): boolean{
    // 6 caratteri, un numero e un carattere speciale
    let regex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[.*?!,\\]).{6,}/;
    return regex.test(password);
  }

  validateUser() {
    let username = this.registerForm.get('username')?.value ?? '';
    let password = this.registerForm.get('password')?.value ?? '';

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

    // Controlla la password con una regex
    if(!this.checkPassword(password)){
      alert("La password deve avere almeno un numero, almeno una lettera, almeno un carattere tra " +
        "[.*?!,\\\\] e deve essere lunga almeno 6 caratteri");
      return;
    }

    // Invia i vari dati al backend
    this.api.registerUser(username, password).subscribe({
      next: (response) => {
        console.log('Registrazione effettuata con successo:', response);
      },
      error: (error) => {
        if (error.status === 409) { // L'utente esiste già
          alert("Errore: Username già scelto");
        } else {
          console.error('Errore sconosciuto: ', error.status);
        }
      }
    });

    alert("Registrazione avvenuta con successo!");
    this.router.navigate(["/login"]);
  }
}
