/**
 * Created by Felipe on 11-09-2016.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

var filas = new Array;

connection.query("select * from inforganizador.pregunta_encuesta",function (err,rows) {
   if(err){
       console.log("falló la consulta sql :(");
   }
   for(var i = 0; i < rows.length; i++){
       filas[i] = rows[i];
       console.log(rows[i]);
   }
});

angular.module('myApp',[]).controller('namesCtrl',function ($scope) {
    for(var i = 0; i < rows.length; i++){
        $scope.preguntas =[{texto:filas[i].Texto, pregunta1:filas[i].Opcion_1, pregunta2:filas[i].Opcion_2,pregunta3:filas[i].Opcion_3,pregunta4:filas[i].Opcion_4}]
    }



})