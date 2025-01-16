package org.example.backendingsw.service.interfaces;

import org.example.backendingsw.model.Giocatore;

// Interfaccia per il Service che fa le richieste al DAO
public interface IGiocatoreService {
    public void addPlayer(String username, String password);

    public Giocatore findPlayerByUsername(String username);

    public int getScegliTuRecord(String username);

    public int getCompletaTuRecord(String username);

    public void updateScegliTuRecord(String username, int record);

    public void updateCompletaTuRecord(String username, int record);
}
