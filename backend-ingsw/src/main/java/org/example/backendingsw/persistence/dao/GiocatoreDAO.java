package org.example.backendingsw.persistence.dao;

import org.example.backendingsw.model.Giocatore;

// Interfaccia DAO per l'oggetto Giocatore
public interface GiocatoreDAO {
    public Giocatore getGiocatoreByUsername(String nome);

    public void insertGiocatore(Giocatore giocatore);

    public int getScegliTuRecord(String nome);

    public int getCompletaTuRecord(String nome);

    public void updateScegliTuRecord(String username, int record);

    public void updateCompletaTuRecord(String username, int record);
}
