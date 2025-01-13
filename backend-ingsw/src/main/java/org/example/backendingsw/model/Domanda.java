package org.example.backendingsw.model;

public class Domanda {
    private int id;
    private String descrizione;
    private boolean modalitasceglitu;
    private int rispostacorretta;
    private byte[] audio;

    public Domanda(int id, String descrizione, boolean modalitasceglitu, int rispostacorretta, byte[] audio) {
        this.id = id;
        this.descrizione = descrizione;
        this.modalitasceglitu = modalitasceglitu;
        this.rispostacorretta = rispostacorretta;
        this.audio = audio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public boolean isModalitasceglitu() {
        return modalitasceglitu;
    }

    public void setModalitasceglitu(boolean modalitasceglitu) {
        this.modalitasceglitu = modalitasceglitu;
    }

    public int getRispostacorretta() {
        return rispostacorretta;
    }

    public void setRispostacorretta(int rispostacorretta) {
        this.rispostacorretta = rispostacorretta;
    }

    public byte[] getAudio() {
        return audio;
    }

    public void setAudio(byte[] audio) {
        this.audio = audio;
    }
}
