package org.example.backendingsw.service.interfaces;

import org.example.backendingsw.model.Domanda;

import java.util.List;

// Interfaccia per il Service che fa le richieste al DAO
public interface IDomandaService {
    public List<Domanda> getDomande();

    public List<Domanda> getDomandeByModality(boolean modality);
}
