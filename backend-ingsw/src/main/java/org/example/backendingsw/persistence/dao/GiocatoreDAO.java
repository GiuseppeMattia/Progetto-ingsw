package org.example.backendingsw.persistence.dao;

import org.example.backendingsw.model.Giocatore;


public interface GiocatoreDAO {
    public Giocatore getGiocatoreByUsername(String nome);

    public void insertGiocatore(Giocatore giocatore);
}
