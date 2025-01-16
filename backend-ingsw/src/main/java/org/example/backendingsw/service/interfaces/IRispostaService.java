package org.example.backendingsw.service.interfaces;

import org.example.backendingsw.model.Risposta;

import java.util.List;

// Interfaccia per il Service che fa le richieste al DAO
public interface IRispostaService {
    public List<Risposta> getRisposte();

    public List<Risposta> getRisposteByModality(boolean modality);

    public Risposta getRispostaById(int id);
}
