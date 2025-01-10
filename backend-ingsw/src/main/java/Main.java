import jdk.jfr.Description;
import org.example.backendingsw.persistence.DBManager;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Main{
    public static void main(String[] args) {
        Connection connection = DBManager.getInstance().getConnection();
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery("select * from giocatore");
            if (rs.next()){
                System.out.println(rs.getString(1));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        }
}
