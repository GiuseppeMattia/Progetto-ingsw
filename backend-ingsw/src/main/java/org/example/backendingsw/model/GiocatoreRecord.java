package org.example.backendingsw.model;

// Oggetto temporaneo che salva l'username e il record da aggiornare
public class GiocatoreRecord {
    private String username;
    private int record;

    public GiocatoreRecord(String username, int record) {
        this.username = username;
        this.record = record;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRecord() {
        return record;
    }

    public void setRecord(int record) {
        this.record = record;
    }
}
