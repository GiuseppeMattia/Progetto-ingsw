package org.example.backendingsw.persistence.dao.impljdbc;

import org.example.backendingsw.model.Giocatore;
import org.example.backendingsw.persistence.DBManager;
import org.example.backendingsw.persistence.dao.GiocatoreDAO;
import org.postgresql.core.ConnectionFactory;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Component
public class GiocatoreDAOJDBC implements GiocatoreDAO {

    private Connection connection;

    public GiocatoreDAOJDBC() {
        this.connection = DBManager.getInstance().getConnection();
    }


    @Override
    public Giocatore getGiocatoreByUsername(String nome) {
        String query = "SELECT * FROM giocatore WHERE username = ?";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, nome);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return new Giocatore(resultSet.getString("username"), resultSet.getString("password"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void insertGiocatore(Giocatore giocatore) {
        String query = "INSERT INTO giocatore (username, password, recordsceglitu, recordcompletatu) VALUES (?, ?, 0, 0) ";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, giocatore.getUsername());
            statement.setString(2, giocatore.getPassword());
            statement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int getScegliTuRecord(String nome) {
        String query = "SELECT recordsceglitu FROM giocatore WHERE username = ?";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, nome);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("recordsceglitu");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int getCompletaTuRecord(String nome) {
        String query = "SELECT recordcompletatu FROM giocatore WHERE username = ?";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, nome);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("recordcompletatu");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }


}
