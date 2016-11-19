var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

class cursoCRUD{
  constructor(idCurso, nombreCurso){
    this.idCurso = idCurso;
    this.nombreCurso = nombreCurso;
  }
  insert(res){
    var newCursoMysql = {
      idCurso: this.idCurso,
      nombreCurso: this.nombreCurso
    }
    var selectQuery = "SELECT * FROM inforganizador.curso WHERE Nombre_Curso = ?;";
    connection.query(selectQuery,[newCursoMysql.nombreCurso],function(err, rows){
      if(err){
        console.log(err);
        return res.status(400).send("Error al verificar existencia del curso");
      }
      if(rows.length){
        return res.status(400).send("Este curso ya existe");
      }
      else{

        var insertQuery = "INSERT INTO inforganizador.curso (Nombre_Curso) VALUES (?)";
        connection.query(insertQuery,[newCursoMysql.nombreCurso],function(err, rows){
          if(err){
            console.log(err);
            return res.status(400).send("Error al crear el curso");
          }
          else{
            return res.status(200).send("Curso Creado con exito");
          }
        });
      }
    });
  }

  update(){
    console.log("función para realizar update de curso");
  }
  delete(){
    console.log("función para realizar delete de curso");
  }
  select(){
    console.log("función para realizar select de curso");
  }
}
module.exports = cursoCRUD;
