import org.example.backendingsw.controller.Controller;
import org.example.backendingsw.model.GiocatoreRecord;
import org.example.backendingsw.persistence.dao.impljdbc.DomandaDAOJDBC;
import org.example.backendingsw.persistence.dao.impljdbc.GiocatoreDAOJDBC;
import org.example.backendingsw.persistence.dao.impljdbc.RispostaDAOJDBC;
import org.example.backendingsw.service.DomandaService;
import org.example.backendingsw.service.GiocatoreService;
import org.example.backendingsw.service.RispostaService;

// Main di prova
public class Main{
    public static void main(String[] args) {
        Controller c = new Controller(new GiocatoreService(new GiocatoreDAOJDBC()), new DomandaService(new DomandaDAOJDBC()), new RispostaService(new RispostaDAOJDBC()));

        c.updateCompletaTu(new GiocatoreRecord("Giuseppe", 1));
    }
}
