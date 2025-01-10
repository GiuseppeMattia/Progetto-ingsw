package org.example.backendingsw.controller;

import org.example.backendingsw.model.Giocatore;
import org.example.backendingsw.service.IGiocatoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    private IGiocatoreService iGiocatoreService;

    public Controller(IGiocatoreService iGiocatoreService) {
        this.iGiocatoreService = iGiocatoreService;
    }

    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from the backend!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/data")
    public ResponseEntity<String> receiveData(@RequestBody String data) {
        System.out.println(data);
        return ResponseEntity.ok("Data received: " + data);
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, String>> receiveUsernameAndPassword(@RequestBody Giocatore giocatore) {
        System.out.println("Username Login: " + giocatore.getUsername());
        System.out.println("Password Login: " + giocatore.getPassword());

        Map<String, String> response = new HashMap<>();

        Giocatore g = iGiocatoreService.findPlayerByUsername(giocatore.getUsername());
        if(g == null) {
            response.put("message", "Utente non trovato");
            return ResponseEntity.status(404).body(response);
        }
        else{
            if(g.getPassword().equals(giocatore.getPassword())) {
                response.put("message", "Utente loggato correttamente");
                return ResponseEntity.ok(response);
            }
            else{
                response.put("message", "Password errata");
                return ResponseEntity.status(401).body(response);
            }
        }

    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody Giocatore giocatore) {
        System.out.println("Username Login: " + giocatore.getUsername());
        System.out.println("Password Login: " + giocatore.getPassword());

        Map<String, String> response = new HashMap<>();

        Giocatore g = iGiocatoreService.findPlayerByUsername(giocatore.getUsername());

        if(g != null){
            response.put("message", "Utente già esistente");
            return ResponseEntity.status(409).body(response);
        }

        iGiocatoreService.addPlayer(giocatore.getUsername(), giocatore.getPassword());

        response.put("message", "Utente aggiunto correttamente");
        return ResponseEntity.ok(response);
    }
}
