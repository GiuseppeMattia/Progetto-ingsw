package org.example.backendingsw.service;

import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.persistence.dao.RispostaDAO;
import org.example.backendingsw.service.interfaces.IRispostaService;
import org.springframework.stereotype.Service;

import java.util.List;


// Service che fa le richieste al DAO
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

    @Override
    public List<Risposta> getRisposteByModality(boolean modality) {
        return rispostaDAO.getByModality(modality);
    }

    @Override
    public Risposta getRispostaById(int id) {
        return rispostaDAO.getById(id);
    }
}
