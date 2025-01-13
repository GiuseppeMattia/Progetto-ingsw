import jdk.jfr.Description;
import org.example.backendingsw.model.Domanda;
import org.example.backendingsw.model.Risposta;
import org.example.backendingsw.persistence.DBManager;
import org.example.backendingsw.persistence.dao.impljdbc.DomandaDAOJDBC;
import org.example.backendingsw.persistence.dao.impljdbc.RispostaDAOJDBC;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public class Main{
    public static void main(String[] args) {
        RispostaDAOJDBC dao = new RispostaDAOJDBC();

        List<Risposta> r = dao.getAll();

        for(Risposta rs : r){
            System.out.println(rs.getDescrizione());
        }
    }
}
