package org.example.backendingsw.persistence;

import org.example.backendingsw.persistence.dao.GiocatoreDAO;
import org.example.backendingsw.persistence.dao.impljdbc.GiocatoreDAOJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {

    private static DBManager instance = null;
    private GiocatoreDAO giocatoreDAO = null;
    private Connection connection = null;

    private DBManager() {}

    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    public Connection getConnection() {
        if(this.connection == null){
            try{
                connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/ingsw", "postgres", "rullo");
            }
            catch (SQLException e){
                throw new RuntimeException(e);
            }
        }

        return connection;
    }

    public GiocatoreDAO getGiocatoreDAO() {
        if(giocatoreDAO == null){
            giocatoreDAO = new GiocatoreDAOJDBC();
        }
        return giocatoreDAO;
    }
}
