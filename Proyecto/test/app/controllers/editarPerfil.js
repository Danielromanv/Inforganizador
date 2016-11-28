app.controller('editarPerfil',['$scope', '$http', function($scope, $http){
  $scope.usuario = {
    usuario:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    exusuario:''
  };

  $scope.exusuario = " ";

  $scope.mensaje = " ";
  $scope.error = " ";

  $scope.flag = false;
  $scope.flagError = false;





  $scope.ObtenerUserLoggeado = function(){
    $http({
      method: 'GET',
      url: '/ObtenerUserLoggeado'
    }).then(function successCallback(response, data){
      $scope.usuario.usuario = response.data[0].Username;
      $scope.usuario.password = response.data[0].Password;
      $scope.usuario.nombre = response.data[0].Nombre;
      $scope.usuario.apellido = response.data[0].Apellido;
      $scope.usuario.email = response.data[0].Email;
      $scope.usuario.exusuario = response.data[0].Username;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  };

  $scope.editarPerfil = function(){
    var email = new RegExp(/[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(sansano.usm.cl|usm.cl|alumnos.usm.cl)/);
    if(email.test($scope.usuario.email) == false){
      window.alert("Ingresa un email válido");
      return false;
    }
    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }
    var valores = $scope.usuario;
    $http({
      method: 'POST',
      url: '/updatePerfil',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.flag = true;
      $scope.flagError = false;
      //window.alert("Perfil editado, nesitamos que te loggees nuevamente c:");
      //window.location.href = '/logout';
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false
    })
  };

  $scope.ObtenerUserLoggeado();

}]);
