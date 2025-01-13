package org.example.backendingsw.service;

import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.persistence.dao.RispostaDAO;

import java.util.List;

public interface IRispostaService {
    public List<Risposta> getRisposte();
}
