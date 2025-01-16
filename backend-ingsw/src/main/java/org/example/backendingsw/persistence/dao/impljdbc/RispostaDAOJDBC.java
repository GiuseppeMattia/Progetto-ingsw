package org.example.backendingsw.persistence.dao.impljdbc;

import org.example.backendingsw.model.Domanda;
import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.persistence.DBManager;
import org.example.backendingsw.persistence.dao.RispostaDAO;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

// DAO per trasformare le tabelle "risposta" del database in oggetti Risposta
@Component
public class RispostaDAOJDBC implements RispostaDAO {
    private Connection connection;

    public RispostaDAOJDBC() {
        this.connection = DBManager.getInstance().getConnection();
    }


    @Override
    public List<Risposta> getAll() {
        String query = "SELECT * FROM risposta";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            List<Risposta> risposte = new ArrayList<>();
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                Risposta r = new Risposta(resultSet.getInt("id"), resultSet.getString("descrizione"), resultSet.getBoolean("modalitasceglitu"));
                risposte.add(r);
//                FileOutputStream fos = new FileOutputStream("dalla.mp3");
//                fos.write(d.getAudio());
//                fos.close();
            }
            return risposte;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Risposta> getByModality(boolean modality) {
        String query = "SELECT * FROM risposta WHERE modalitasceglitu = ?";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setBoolean(1, modality);
            List<Risposta> risposte = new ArrayList<>();
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                Risposta r = new Risposta(resultSet.getInt("id"), resultSet.getString("descrizione"), resultSet.getBoolean("modalitasceglitu"));
                risposte.add(r);
            }
            return risposte;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Risposta getById(int id) {
        String query = "SELECT * FROM risposta, domanda WHERE domanda.rispostacorretta = ? AND domanda.rispostacorretta = risposta.id";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if(resultSet.next()){
                return new Risposta(resultSet.getInt("id"), resultSet.getString("descrizione"), resultSet.getBoolean("modalitasceglitu"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
