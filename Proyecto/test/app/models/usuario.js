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
    var newUserMysql = {
      usuario: this.usuario,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      tipo_usuario: this.tipo_usuario
    };
    var selectQuery = "SELECT * FROM inforganizador.user WHERE Username = ?";
    //console.log("soy una query   " + selectQuery);
    connection.query(selectQuery,[newUserMysql.usuario],function(rows,err){
        //console.log("above row object");

        if (err)
            console.log(err);
            console.log("hola");
            return false;
            //return done(err);
        if (rows.length) {
            //return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
            console.log("Me di cuenta de que la query arrojó resultados c:");
            //return done(null);
            return false;
        }
        else {
            console.log();("insertion queryyy");
            var insertQuery = "INSERT INTO inforganizador.user ( Username, Password, Nombre, Apellido, Email, Tipo_aprendizaje, Tipo_usuario ) values (?,?,?,?,?,?,?)";
            connection.query(insertQuery,[newUserMysql.nombre, newUserMysql.password, newUserMysql.nombre, newUserMysql.apellido, newUserMysql.email, newUserMysql.tipo_usuario],function(err,rows){
              if(err){
                console.log("error en la query!: " + err);
                return false;
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

  update(){
    //var selectQuery = "SELECT * FROM inforganizador.user WHERE Username = '"+ this.usuario +"'";
    //var updateQuery = "UPDATE inforganizador.user SET Username ";
    console.log("Función para realizar update de usuario");
  }

  delete(){
    console.log("Función para realizar un delete de usuario");
  }

  select(){
    console.log("Función para realizar select de la tabla de usuarios");
  }
}
module.exports = usuarioCRUD;
