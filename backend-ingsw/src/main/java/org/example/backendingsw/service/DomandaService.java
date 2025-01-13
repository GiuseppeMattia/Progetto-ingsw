package org.example.backendingsw.service;

import org.example.backendingsw.model.Domanda;
import org.example.backendingsw.persistence.dao.DomandaDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomandaService implements IDomandaService {

    private DomandaDAO domandaDAO;

    public DomandaService(DomandaDAO domandaDAO) {
        this.domandaDAO = domandaDAO;
    }

    @Override
    public List<Domanda> getDomande() {
        return domandaDAO.getAll();
    }

    @Override
    public List<Domanda> getDomandeByModality(boolean modality) {
        return domandaDAO.getByModality(modality);
    }
}
