package org.example.backendingsw.model;

public class Giocatore {
    private String username;
    private String password;
    private int recordScegliTu;
    private int recordCompletaTu;

    public Giocatore(String username, String password) {
        this.username = username;
        this.password = password;
        recordScegliTu = 0;
        recordCompletaTu = 0;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRecordScegliTu() {
        return recordScegliTu;
    }

    public void setRecordScegliTu(int recordScegliTu) {
        this.recordScegliTu = recordScegliTu;
    }

    public int getRecordCompletaTu() {
        return recordCompletaTu;
    }

    public void setRecordCompletaTu(int recordCompletaTu) {
        this.recordCompletaTu = recordCompletaTu;
    }

}
