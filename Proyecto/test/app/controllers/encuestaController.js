/**
 * Created by Felipe on 11-09-2016.
 */

app.controller('encuestaController', ['$scope',function($scope){
    $scope.resultado = 0;
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
    $scope.verificar = function () {
        var alert = "No repetir números por favor c:";
        var ECcounter = 0;
        var EAcounter = 0;
        var ORcounter = 0;
        var CAcounter = 0;
        var preguntas = $scope.preguntas;
        for(i= 0; i<$scope.preguntas.length;i++){
            if(preguntas[i].resp.EA == preguntas[i].resp.EC){
                window.alert(alert);
                return false;
            }
            else if(preguntas[i].resp.EA == preguntas[i].resp.CA){
                window.alert(alert);
                return false;
            }
            else if(preguntas[i].resp.EA == preguntas[i].resp.OR){
                window.alert(alert);
                return false;
            }
            else if(preguntas[i].resp.EC == preguntas[i].resp.CA){
                window.alert(alert);
                return false;
            }
            else if(preguntas[i].resp.EC == preguntas[i].resp.OR){
                window.alert(alert);
                return false;
            }
            else if(preguntas[i].resp.CA == preguntas[i].resp.OR){
                window.alert(alert);
                return false;
            }
            else{
                EAcounter += preguntas[i].resp.EA;
                ORcounter += preguntas[i].resp.OR;
                CAcounter += preguntas[i].resp.CA;
                ECcounter += preguntas[i].resp.EC;


            }
        }

        window.alert("EA COUNTER = "+ EAcounter);
        window.alert("OR COUNTER = "+ ORcounter);
        window.alert("CA COUNTER = "+ CAcounter);
        window.alert("EC COUNTER = "+ ECcounter);

        var first = CAcounter - ECcounter;
        var second = EAcounter - ORcounter;

        window.alert("first = " + first);
        window.alert("second = " + second);



        if(first <= 3 && second <= 5){
            $scope.resultado = 1;
        }
        else if(first <= 3 && second >= 6){
            $scope.resultado = 2;
        }
        else if(first > 3 && second >=6){
            $scope.resultado = 3;
        }
        else if(first > 3 && second <= 5){
            $scope.resultado = 4;
        }
        window.alert("Ya asigné el valor al scope c: "+ $scope.resultado);
    }
}]);
