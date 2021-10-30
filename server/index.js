import app from "./app";
import "./config/database"

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});
