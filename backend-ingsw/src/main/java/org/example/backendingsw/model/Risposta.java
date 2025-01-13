package org.example.backendingsw.model;

public class Risposta {
    private int id;
    private String descrizione;
    private boolean modalitasceglitu;

    public Risposta(int id, String descrizione, boolean modalitasceglitu) {
        this.id = id;
        this.descrizione = descrizione;
        this.modalitasceglitu = modalitasceglitu;
    }

    public boolean isModalitasceglitu() {
        return modalitasceglitu;
    }

    public void setModalitasceglitu(boolean modalitasceglitu) {
        this.modalitasceglitu = modalitasceglitu;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
