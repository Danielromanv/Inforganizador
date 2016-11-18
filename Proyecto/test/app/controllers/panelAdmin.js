

app.controller('panelAdmin',['$scope','$http',function($scope, $http){
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
  $scope.mensaje = '';
  $scope.insertar = function (){
    var email = new RegExp(/[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(sansano.usm.cl|usm.cl|alumnos.usm.cl)/);
    if(email.test($scope.usuario.email) == false){
      window.alert("Ingresa un email válido");
      return false;
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

}]);


  /*if($scope.usuario.tipo_usuario != '0' || $scope.usuario.tipo_usuario != '1' || $scope.usuario.tipo_usuario != '2'){
    window.alert("Ingresa un tipo de usuario válido");
    return false;
  }*/
  //formulario.submit();
