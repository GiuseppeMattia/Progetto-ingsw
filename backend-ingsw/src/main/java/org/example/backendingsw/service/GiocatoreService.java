package org.example.backendingsw.service;

import org.example.backendingsw.model.Giocatore;
import org.example.backendingsw.persistence.dao.GiocatoreDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiocatoreService implements IGiocatoreService{


    private GiocatoreDAO giocatoreDAO;

    public GiocatoreService(GiocatoreDAO giocatoreDAO) {
        this.giocatoreDAO = giocatoreDAO;
    }

    @Override
    public void addPlayer(String username, String password) {
        giocatoreDAO.insertGiocatore(new Giocatore(username, password));
    }

    @Override
    public Giocatore findPlayerByUsername(String username) {
        return giocatoreDAO.getGiocatoreByUsername(username);
    }

    @Override
    public int getScegliTuRecord(String username) {
        return giocatoreDAO.getScegliTuRecord(username);
    }

    @Override
    public int getCompletaTuRecord(String username) {
        return giocatoreDAO.getCompletaTuRecord(username);
    }
}
