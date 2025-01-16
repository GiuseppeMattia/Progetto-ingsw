package org.example.backendingsw.persistence.dao;

import org.example.backendingsw.model.Domanda;

import java.util.List;

// Interfaccia DAO per l'oggetto Domanda
public interface DomandaDAO {
    public List<Domanda> getAll();

    public List<Domanda> getByModality(boolean modality);
}
