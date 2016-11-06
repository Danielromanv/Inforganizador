var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});


class usuarioCRUD{
  constructor(usuario, password, nombre, apellido, email, tipo_usuario){
    this.usuario = usuario;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.tipo_usuario = tipo_usuario;
    //this.conexionDB = require('./config/database');
  }
  insert(){
    var selectQuery = "SELECT * FROM inforganizador.user WHERE Username = '"+ this.usuario +"'";
    console.log("soy una query   " + selectQuery);
    connection.query(selectQuery,function(rows,err){
        console.log(err);
        console.log(rows);
        //console.log("above row object");
        
        if (err)
            console.log(err);
            console.log("hola");
            return false;
            console.log("hahaha");
            //return done(err);
        if (rows.length) {
            //return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
            console.log("Me di cuenta de que la query arrojó resultados c:");
            //return done(null);
            return false;
        }
        else {
            console.log();("insertion queryyy");
            var insertQuery = "INSERT INTO inforganizador.user ( Username, Password, Nombre, Apellido, Email, Tipo_aprendizaje, Tipo_usuario ) values ('" + this.usuario +"','" + this.password +"','"+ this.nombre +"','"+ this.apellido +"','"+ this.email + "', 0, "+ this.tipo_usuario +")";
            connection.query(insertQuery,function(err,rows){
              if(err){
                console.log("error en la query!: " + err);
              }
              else{
                //return done(null);
                  return true;
              }
            });
        }
    });
    //console.log("voy a salir, adiox");
    //return false;
  }
}
module.exports = usuarioCRUD;
