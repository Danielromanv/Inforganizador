/**
 * Created by Felipe on 11-09-2016.
 */
app2.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '\
    <a href="#1" class = "btn btn-default" style= "margin-left:45%">Empezar</a>\
',
    }).when('/1',{
      template: '<h2>{{ preguntas[0].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[0].respuesta1 }} <input type="number" ng-model="preguntas[0].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[0].respuesta2 }} <input type="number" ng-model="preguntas[0].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[0].respuesta3 }} <input type="number" ng-model="preguntas[0].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[0].respuesta4 }} <input type="number" ng-model="preguntas[0].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(1)">Siguiente</button>',
    }).when('/2',{
      template: '<h2>{{ preguntas[1].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[1].respuesta1 }} <input type="number" ng-model="preguntas[1].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[1].respuesta2 }} <input type="number" ng-model="preguntas[1].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[1].respuesta3 }} <input type="number" ng-model="preguntas[1].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[1].respuesta4 }} <input type="number" ng-model="preguntas[1].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(2)">Siguiente</button>',
    }).when('/3',{
      template: '<h2>{{ preguntas[2].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[2].respuesta1 }} <input type="number" ng-model="preguntas[2].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[2].respuesta2 }} <input type="number" ng-model="preguntas[2].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[2].respuesta3 }} <input type="number" ng-model="preguntas[2].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[2].respuesta4 }} <input type="number" ng-model="preguntas[2].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(3)">Siguiente</button>',
    }).when('/4',{
      template: '<h2>{{ preguntas[3].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[3].respuesta1 }} <input type="number" ng-model="preguntas[3].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[3].respuesta2 }} <input type="number" ng-model="preguntas[3].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[3].respuesta3 }} <input type="number" ng-model="preguntas[3].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[3].respuesta4 }} <input type="number" ng-model="preguntas[3].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(4)">Siguiente</button>',
    }).when('/5',{
      template: '<h2>{{ preguntas[4].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[4].respuesta1 }} <input type="number" ng-model="preguntas[4].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[4].respuesta2 }} <input type="number" ng-model="preguntas[4].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[4].respuesta3 }} <input type="number" ng-model="preguntas[4].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[4].respuesta4 }} <input type="number" ng-model="preguntas[4].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(5)">Siguiente</button>',
    }).when('/6',{
      template: '<h2>{{ preguntas[5].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[5].respuesta1 }} <input type="number" ng-model="preguntas[5].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[5].respuesta2 }} <input type="number" ng-model="preguntas[5].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[5].respuesta3 }} <input type="number" ng-model="preguntas[5].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[5].respuesta4 }} <input type="number" ng-model="preguntas[5].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(6)">Siguiente</button>',
    }).when('/7',{
      template: '<h2>{{ preguntas[6].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[6].respuesta1 }} <input type="number" ng-model="preguntas[6].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[6].respuesta2 }} <input type="number" ng-model="preguntas[6].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[6].respuesta3 }} <input type="number" ng-model="preguntas[6].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[6].respuesta4 }} <input type="number" ng-model="preguntas[6].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(7)">Siguiente</button>',
    }).when('/8',{
      template: '<h2>{{ preguntas[7].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[7].respuesta1 }} <input type="number" ng-model="preguntas[7].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[7].respuesta2 }} <input type="number" ng-model="preguntas[7].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[7].respuesta3 }} <input type="number" ng-model="preguntas[7].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[7].respuesta4 }} <input type="number" ng-model="preguntas[7].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(8)">Siguiente</button>',
    }).when('/9',{
      template: '<h2>{{ preguntas[8].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[8].respuesta1 }} <input type="number" ng-model="preguntas[8].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[8].respuesta2 }} <input type="number" ng-model="preguntas[8].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[8].respuesta3 }} <input type="number" ng-model="preguntas[8].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[8].respuesta4 }} <input type="number" ng-model="preguntas[8].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(9)">Siguiente</button>',
    }).when('/10',{
      template: '<h2>{{ preguntas[9].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[9].respuesta1 }} <input type="number" ng-model="preguntas[9].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[9].respuesta2 }} <input type="number" ng-model="preguntas[9].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[9].respuesta3 }} <input type="number" ng-model="preguntas[9].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[9].respuesta4 }} <input type="number" ng-model="preguntas[9].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(10)">Siguiente</button>',
    }).when('/11',{
      template: '<h2>{{ preguntas[10].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[10].respuesta1 }} <input type="number" ng-model="preguntas[10].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[10].respuesta2 }} <input type="number" ng-model="preguntas[10].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[10].respuesta3 }} <input type="number" ng-model="preguntas[10].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[10].respuesta4 }} <input type="number" ng-model="preguntas[10].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(11)">Siguiente</button>',
    }).when('/12',{
      template: '<h2>{{ preguntas[11].pregunta }}</h2>  <br>\
               <h5>{{ preguntas[11].respuesta1 }} <input type="number" ng-model="preguntas[11].resp.EC" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[11].respuesta2 }} <input type="number" ng-model="preguntas[11].resp.OR" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[11].respuesta3 }} <input type="number" ng-model="preguntas[11].resp.CA" min="1" max="4" required="required"></h5> <br>\
               <h5>{{ preguntas[11].respuesta4 }} <input type="number" ng-model="preguntas[11].resp.EA" min="1" max="4" required="required"></h5> <br>\
               <button class = "btn btn-default" type="submit" ng-click="verificar(12)">Siguiente</button>',
    }).when('/13',{
      template: '<form action="/encuesta" method="post" name="formulario">\
      <h4> Todo correcto<br>\
      <button class = "btn btn-default" type="submit" ng-click="verificar(13)">Enviar!</button>\
      <input type="hidden" value = {{resultado}} name="result">',
    })

});
app2.controller('encuestaController', ['$scope','$location',function($scope,$location){
    $scope.resultado = 0;
    $scope.EAc = 0;
    $scope.ORc = 0;
    $scope.CAc = 0;
    $scope.ECc = 0;
    $scope.preguntas = [{
            pregunta:'Cuando aprendo...',
            respuesta1:'Me gusta vivir sensaciones',
            respuesta2:'Me gusta pensar sobre ideas',
            respuesta3:'Me gusta estar haciendo cosas',
            respuesta4:'Me gusta observar y escuchar',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Aprendo mejor cuando',
            respuesta1:'Escucho y observo cuidadosamente',
            respuesta2:'Confio en el pensamiento lógico',
            respuesta3:'Confio en mi intuición y sentimientos',
            respuesta4:'Trabajo duro para lograr hacer las cosas',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando estoy aprendiendo',
            respuesta1:'Tiendo a usar el razonamiento',
            respuesta2:'Soy responsable con lo que hago',
            respuesta3:'Soy callado y reservado',
            respuesta4:'Tengo fuertes sensaciones y reacciones',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Yo aprendo...',
            respuesta1:'Sintiendo',
            respuesta2:'Haciendo',
            respuesta3:'Observando',
            respuesta4:'Pensando',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando aprendo...',
            respuesta1:'Estoy abierto a nuevas experiencias',
            respuesta2:'Observo todos los aspectos del asunto',
            respuesta3:'Me gusta analizar las cosas, descomponerlas en sus partes',
            respuesta4:'Me gusta probar e intentar hacer las cosas',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando estoy aprendiendo...',
            respuesta1:'Soy una persona observadora',
            respuesta2:'Soy una persona activa',
            respuesta3:'Soy una persona intuitiva',
            respuesta4:'Soy una persona lógica',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Yo aprendo mejor de...',
            respuesta1:'La observación',
            respuesta2:'La relación con otras personas',
            respuesta3:'Las teorías racionales',
            respuesta4:'La oportunidad de probar y practicar',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando aprendo...',
            respuesta1:'Me gusta ver los resultados de mi trabajo',
            respuesta2:'Me gustan las ideas y teorías',
            respuesta3:'Me tomo mi tiempo antes de actuar',
            respuesta4:'Me siento personalmente involucrado en las cosas',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Aprendo mejor cuando...',
            respuesta1:'Confio en mis observaciones',
            respuesta2:'Confio en mis sentimientos',
            respuesta3:'Puedo probar por mi cuenta',
            respuesta4:'Confio en mis ideas',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando estoy aprendiendo...',
            respuesta1:'Soy una persona reservada',
            respuesta2:'Soy una persona receptiva',
            respuesta3:'Soy una persona responsable',
            respuesta4:'Soy una persona racional',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Cuando aprendo...',
            respuesta1:'Me involucro',
            respuesta2:'Me gusta observar',
            respuesta3:'Evaluo las cosas',
            respuesta4:'Me gusta ser activo',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        },
        {
            pregunta:'Aprendo mejor cuando...',
            respuesta1:'Analizo ideas',
            respuesta2:'Soy receptivo y abierto',
            respuesta3:'Soy cuidadoso',
            respuesta4:'Soy práctico',
            resp: {
                EC: 0,
                OR: 0,
                CA: 0,
                EA: 0
            }
        }
    ];
    $scope.verificar = function (a) {
        var alert = "No repetir números por favor c:";
        var alert2 = "Insertar números válidos (entre 1 y 4)";
        var preguntas = $scope.preguntas;
        if(a == 13){
          var CAc = $scope.CAc;
          var ECc = $scope.ECc;
          var EAc = $scope.EAc;
          var ORc = $scope.ORc;
          var first =  CAc - ECc;
          var second = EAc - ORc;
          if(first <= 3 && second <= 5){
              $scope.resultado = 1;
              return true;
          }
          else if(first <= 3 && second >= 6){
              $scope.resultado = 2;
              return true;
          }
          else if(first > 3 && second >=6){
              $scope.resultado = 3;
              return true;
          }
          else if(first > 3 && second <= 5){
              $scope.resultado = 4;
              return true;
          }
        }
        if((typeof preguntas[a-1].resp.CA =='undefined')||(typeof preguntas[a-1].resp.EA =='undefined')||(typeof preguntas[a-1].resp.EC =='undefined')||(typeof preguntas[a-1].resp.OR =='undefined')){
            window.alert(alert2);
            return false;
        }
        else if(preguntas[a-1].resp.EA == preguntas[a-1].resp.EC){
            window.alert(alert);
            return false;
        }
        else if(preguntas[a-1].resp.EA == preguntas[a-1].resp.CA){
            window.alert(alert);
            return false;
        }
        else if(preguntas[a-1].resp.EA == preguntas[a-1].resp.OR){
            window.alert(alert);
            return false;
        }
        else if(preguntas[a-1].resp.EC == preguntas[a-1].resp.CA){
            window.alert(alert);
            return false;
        }
        else if(preguntas[a-1].resp.EC == preguntas[a-1].resp.OR){
            window.alert(alert);
            return false;
        }
        else if(preguntas[a-1].resp.CA == preguntas[a-1].resp.OR){
            window.alert(alert);
            return false;
        }
      if (a <= 12){
        $scope.EAc += preguntas[a-1].resp.EA;
        $scope.ORc += preguntas[a-1].resp.OR;
        $scope.CAc += preguntas[a-1].resp.CA;
        $scope.ECc += preguntas[a-1].resp.EC;
        $location.url('/'+(a+1));
      }
    }
}]);
