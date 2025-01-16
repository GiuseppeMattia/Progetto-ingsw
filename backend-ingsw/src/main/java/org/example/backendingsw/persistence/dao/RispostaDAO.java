package org.example.backendingsw.persistence.dao;

import org.example.backendingsw.model.Risposta;

import java.util.List;

// Interfaccia DAO per l'oggetto Risposta
public interface RispostaDAO {
    public List<Risposta> getAll();

    public List<Risposta> getByModality(boolean modality);

    public Risposta getById(int id);
}
