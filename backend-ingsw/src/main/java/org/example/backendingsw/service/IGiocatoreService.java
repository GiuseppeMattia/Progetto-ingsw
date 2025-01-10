package org.example.backendingsw.service;

import org.example.backendingsw.model.Giocatore;

public interface IGiocatoreService {
    public void addPlayer(String username, String password);

    public Giocatore findPlayerByUsername(String username);
}
