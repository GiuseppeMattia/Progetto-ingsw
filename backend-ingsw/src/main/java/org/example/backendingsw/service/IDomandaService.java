package org.example.backendingsw.service;

import org.example.backendingsw.model.Domanda;

import java.util.List;

public interface IDomandaService {
    public List<Domanda> getDomande();

    public List<Domanda> getDomandeByModality(boolean modality);
}
