var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

class unidadCRUD{
  constructor(idUnidad, cursoId, nombreUnidad){
    this.idUnidad = idUnidad;
    this.cursoID = cursoId;
    this.nombreUnidad = nombreUnidad;
   }
   insert(res){
     var newUnidadMysql = {
       idUnidad: this.idUnidad,
       cursoID: this.cursoID,
       nombreUnidad: this.nombreUnidad
     };
     var selectQuery = "SELECT * FROM inforganizador.unidad WHERE CursoID_curso = ? AND nombreUnidad = ?";
     connection.query(selectQuery,[newUnidadMysql.cursoID, newUnidadMysql.nombreUnidad], function(err, rows){
       if(err){
         console.log(err);
         return res.status(400).send("Error al verificar si existe la unidad");
       }
       if(rows.length){
         return res.status(400).send("La unidad a ingresar ya existe");
       }
       else{
         var insertQuery = "INSERT INTO inforganizador.unidad (CursoID_curso, nombreUnidad) VALUES (?,?)";
         connection.query(insertQuery,[newUnidadMysql.cursoID, newUnidadMysql.nombreUnidad], function(err, rows){
           if(err){
             console.log(err);
             return res.status(400).send("Error al ingresar la nueva unidad");
           }
           else{
             return res.status(200).send("Unidad ingresada correctamente");
           }
         });
       }
     });
   }


   update(res){
     var updateQuery = "UPDATE inforganizador.unidad SET nombreUnidad = ? WHERE ID_unidad = ? AND CursoID_curso = ?";
     var updateUnidadMysql = {
       nombreUnidad: this.nombreUnidad,
       idUnidad: this.idUnidad,
       cursoID: this.cursoID
     };
     console.log(updateUnidadMysql);
     connection.query(updateQuery,[updateUnidadMysql.nombreUnidad, updateUnidadMysql.idUnidad, updateUnidadMysql.cursoID], function(err, rows){
       if(err){
         console.log(err);
         return res.status(400).send("Error al actualizar los datos de la unidad");
       }
       else{
         return res.status(200).send("Unidad Actualizada con exito");
       }
     })
   }

   delete(res){
     var deleteUnidadMysql = {
       idUnidad: this.idUnidad,
       cursoID: this.cursoID
     }
     console.log(deleteUnidadMysql);
     var deleteQuery = "DELETE FROM inforganizador.unidad WHERE ID_unidad = ? AND CursoID_curso = ?";
     connection.query(deleteQuery,[deleteUnidadMysql.idUnidad, deleteUnidadMysql.cursoID], function(err, rows){
       if(err){
         return res.status(400).send("Error al eliminar la unidad");
       }
       else{
         return res.status(200).send("Unidad eliminada correctamente");
       }
     })
   }

   select(){
     console.log("función para realizar select en tabla unidad");
   }
}
module.exports = unidadCRUD;
