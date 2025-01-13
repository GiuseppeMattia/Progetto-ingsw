package org.example.backendingsw.service;

import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.persistence.dao.RispostaDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RispostaService implements IRispostaService {

    private RispostaDAO rispostaDAO;

    public RispostaService(RispostaDAO rispostaDAO) {
        this.rispostaDAO = rispostaDAO;
    }

    @Override
    public List<Risposta> getRisposte() {
        return rispostaDAO.getAll();
    }
}
