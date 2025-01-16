package org.example.backendingsw.service;

import org.example.backendingsw.model.Giocatore;
import org.example.backendingsw.persistence.dao.GiocatoreDAO;
import org.example.backendingsw.service.interfaces.IGiocatoreService;
import org.springframework.stereotype.Service;

// Service che fa le richieste al DAO
@Service
public class GiocatoreService implements IGiocatoreService {


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

    @Override
    public void updateScegliTuRecord(String username, int record) {
        giocatoreDAO.updateScegliTuRecord(username, record);
    }

    @Override
    public void updateCompletaTuRecord(String username, int record) {
        giocatoreDAO.updateCompletaTuRecord(username, record);
    }

}
