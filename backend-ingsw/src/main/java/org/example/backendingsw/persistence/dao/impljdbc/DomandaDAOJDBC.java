package org.example.backendingsw.persistence.dao.impljdbc;

import org.example.backendingsw.model.Domanda;
import org.example.backendingsw.persistence.DBManager;
import org.example.backendingsw.persistence.dao.DomandaDAO;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Component
public class DomandaDAOJDBC implements DomandaDAO {

    private Connection connection;

    public DomandaDAOJDBC() {
        this.connection = DBManager.getInstance().getConnection();
    }

    @Override
    public List<Domanda> getAll() {

        String query = "SELECT * FROM domanda";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            List<Domanda> domande = new ArrayList<>();
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                Domanda d = new Domanda(resultSet.getInt("id"), resultSet.getString("descrizione"), resultSet.getBoolean("modalitasceglitu"), resultSet.getInt("rispostacorretta"), resultSet.getBytes("audio"));
                domande.add(d);
//                FileOutputStream fos = new FileOutputStream("dalla.mp3");
//                fos.write(d.getAudio());
//                fos.close();
            }
            return domande;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Domanda> getByModality(boolean modality) {
        String query = "SELECT * FROM domanda WHERE modalitasceglitu = ?";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setBoolean(1, modality);
            List<Domanda> domande = new ArrayList<>();
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                Domanda d = new Domanda(resultSet.getInt("id"), resultSet.getString("descrizione"), resultSet.getBoolean("modalitasceglitu"), resultSet.getInt("rispostacorretta"), resultSet.getBytes("audio"));
                domande.add(d);
            }
            return domande;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
