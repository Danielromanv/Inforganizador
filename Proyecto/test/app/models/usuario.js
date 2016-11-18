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
  insert(res){
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
    console.log(newUserMysql.usuario);
    connection.query(selectQuery,[newUserMysql.usuario],function(err, rows){
        //console.log("above row object");
        if (err){
            console.log("error sql " + err);
            return res.status(400).send("Error al verificar si existe el usuario, intenta más tarde");
        }

        if (rows.length) {
            //return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
            //return done(null);
            return res.status(400).send("El username está en uso, intenta con otro");
        }
        else {
            console.log();("insertion queryyy");
            var insertQuery = "INSERT INTO inforganizador.user ( Username, Password, Nombre, Apellido, Email, Tipo_aprendizaje, Tipo_usuario ) values (?,?,?,?,?,?,?);";
            connection.query(insertQuery,[newUserMysql.usuario, newUserMysql.password, newUserMysql.nombre, newUserMysql.apellido, newUserMysql.email, 0, newUserMysql.tipo_usuario],function(err,rows){
              if(err){
                console.log("error en la query!: " + err);
                return res.status(400).send("Error al crear un nuevo usuario, intenta más tarde");
              }
              else{
                //return done(null);
                  return res.status(200).send("Usuario ingresado con exito");
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
