package org.example.backendingsw.controller;

import org.example.backendingsw.model.Domanda;
import org.example.backendingsw.model.Giocatore;
import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.service.IDomandaService;
import org.example.backendingsw.service.IGiocatoreService;
import org.example.backendingsw.service.IRispostaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    private IGiocatoreService iGiocatoreService;
    private IDomandaService iDomandaService;
    private IRispostaService iRispostaService;

    public Controller(IGiocatoreService iGiocatoreService, IDomandaService iDomandaService, IRispostaService iRispostaService) {
        this.iGiocatoreService = iGiocatoreService;
        this.iDomandaService = iDomandaService;
        this.iRispostaService = iRispostaService;
    }

    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from the backend!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, String>> receiveUsernameAndPassword(@RequestBody Giocatore giocatore) {

        Map<String, String> response = new HashMap<>();

        Giocatore g = iGiocatoreService.findPlayerByUsername(giocatore.getUsername());
        if(g == null) {
            System.out.println("Utente con nome " + giocatore.getUsername() + " non trovato");
            response.put("message", "Utente non trovato");
            return ResponseEntity.status(404).body(response);
        }
        else{
            if(g.getPassword().equals(giocatore.getPassword())) {
                System.out.println("Utente " + g.getUsername() + " loggato");
                response.put("message", "Utente loggato correttamente");
                return ResponseEntity.ok(response);
            }
            else{
                System.out.println("Inserita password errata per l'utente " + giocatore.getUsername());
                response.put("message", "Password errata");
                return ResponseEntity.status(401).body(response);
            }
        }

    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody Giocatore giocatore) {
        Map<String, String> response = new HashMap<>();

        Giocatore g = iGiocatoreService.findPlayerByUsername(giocatore.getUsername());

        if(g != null){
            System.out.println("Utente con nome " + giocatore.getUsername() + " già esistente");
            response.put("message", "Utente già esistente");
            return ResponseEntity.status(409).body(response);
        }
        iGiocatoreService.addPlayer(giocatore.getUsername(), giocatore.getPassword());
        System.out.println("Utente " + giocatore.getUsername() + " aggiunto");

        response.put("message", "Utente aggiunto correttamente");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/sceglitu")
    public ResponseEntity<String> sendScegliTu(@RequestBody String username) {
        int record = iGiocatoreService.getScegliTuRecord(username);

        System.out.println("Record dell'utente " + username + " in modalità Scegli Tu: " + record);

        return ResponseEntity.ok(String.valueOf(record));
    }

    @PostMapping("/completatu")
    public ResponseEntity<String> sendCompletaTu(@RequestBody String username) {
        int record = iGiocatoreService.getCompletaTuRecord(username);

        System.out.println("Record dell'utente " + username + " in modalità Completa Tu: " + record);

        return ResponseEntity.ok(String.valueOf(record));
    }

    @GetMapping("/questions")
    public ResponseEntity<List<Domanda>> getQuestions() {
        List<Domanda> domande = iDomandaService.getDomande();

        if(domande == null){
            System.out.println("Il database non ha domande");
            return ResponseEntity.status(404).body(domande);
        }
        return ResponseEntity.ok(domande);
    }

    @PostMapping("/questionsbymodality")
    public ResponseEntity<List<Domanda>> getQuestionsByModality(@RequestBody boolean modality){
        List<Domanda> domande = iDomandaService.getDomandeByModality(modality);

        if(domande == null){
            String modalita = (modality) ? "Scegli Tu!" : "Completa Tu!";

            System.out.println("Nessuna domanda della modalià" + modalita);

            return ResponseEntity.status(404).body(domande);
        }

        return ResponseEntity.ok(domande);
    }

    @GetMapping("/answers")
    public ResponseEntity<List<Risposta>> getAnswers() {
        List<Risposta> risposte = iRispostaService.getRisposte();

        if(risposte == null){
            System.out.println("Il database non ha risposte");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(risposte);
    }
}
