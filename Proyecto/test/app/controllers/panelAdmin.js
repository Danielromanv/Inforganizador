

app.controller('panelAdmin',['$scope','$http',function($scope, $http){
  $scope.unidadflag = true;
  $scope.idcurso = '';
  $scope.resultadosQuery = {

  }

  $scope.resultadosQueryUser = {

  }

  $scope.usuario = {
    usuario:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    tipo_usuario:''
  }

  $scope.curso = {
    nombreCurso:''
  }

  $scope.unidad = {
    nombreUnidad:''
  }

  $scope.mensaje = '';

  $scope.insertar = function (){
    var email = new RegExp(/[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(sansano.usm.cl|usm.cl|alumnos.usm.cl)/);
    if(email.test($scope.usuario.email) == false){
      window.alert("Ingresa un email válido");
      return false;
    }
    if($scope.usuario.tipo_usuario ==="Alumno"){
      $scope.usuario.tipo_usuario = 0;
    }
    else if($scope.usuario.tipo_usuario ==="Profesor"){
      $scope.usuario.tipo_usuario = 1;
    }
    else if($scope.usuario.tipo_usuario ==="Administrador"){
      $scope.usuario.tipo_usuario = 2;
    }
    else{
      window.alert("Por favor, selecciona un tipo de usuario");
      return false
    }
    var valores = $scope.usuario;
    /** Enviar Petición al servidor **/

    $http({
      method: 'POST',
      url: '/insertUser',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
    }, function errorCallback(response, data){
      $scope.mensaje = response.data;
    })
  }


  $scope.eliminarUser = function(username){
    var valores = {
      usuario: username
    }
    $http({
      method: 'POST',
      url: '/deleteUser',
      data: valores
    }).then(function successCallback(response){
      $scope.mensaje = response.data;
      $scope.$apply();
    }, function errorCallback(response){
      $scope.mensaje = response.data;
    })
  }

  $scope.insertarCurso = function(){
    var valores = $scope.curso;
    /** Enviar petición al servidor **/
    $http({
      method: 'POST',
      url: '/insertCurso',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
    }, function errorCallback(response, data){
      $scope.mensaje = response.data;
    })
  }

  $scope.queryCursos = function(){
    $http({
      method: 'GET',
      url: '/obtenerCursos'
    }).then(function successCallback(response){
      $scope.resultadosQuery = response.data;
    }, function errorCallback(response){
      $scope.mensaje = response.data;
    })
  }

  $scope.queryUsuarios = function(){
    $http({
      method: 'GET',
      url: '/obtenerUsuarios'
    }).then(function successCallback(response){
      $scope.resultadosQueryUser = response.data;
    }, function errorCallback(response){
      $scope.mensaje = response.data;
    })
  }

  $scope.displayUnidad = function (idCurso) {
    $scope.idcurso = idCurso;
    $scope.unidadflag = false;
  }

  $scope.insertarUnidad = function(){
      var valores = {
        idCurso: $scope.idcurso,
        nombreUnidad: $scope.unidad.nombreUnidad
      }
      $http({
        method: 'POST',
        url: '/insertUnidad',
        data: valores
      }).then(function successCallback(response, data){
        $scope.mensaje = response.data;
        $scope.unidadflag = true;
      }, function errorCallback(response, data){
        $scope.mensaje = response.data;
      })
  }

  $scope.queryCursos();
  $scope.queryUsuarios();
}]);


  /*if($scope.usuario.tipo_usuario != '0' || $scope.usuario.tipo_usuario != '1' || $scope.usuario.tipo_usuario != '2'){
    window.alert("Ingresa un tipo de usuario válido");
    return false;
  }*/
  //formulario.submit();
