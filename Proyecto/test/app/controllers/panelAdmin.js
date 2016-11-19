
app.controller('panelAdmin',['$scope',function($scope){
  $scope.usuario = {
    usuario:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    tipo_usuario:''
  }
  $scope.insertar = function (){
    var email = new RegExp(/[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(sansano.usm.cl|usm.cl|alumnos.usm.cl)/);
    if(email.test($scope.usuario.email) == false){
      window.alert("Ingresa un email válido");
      return false;
    }
    /*if($scope.usuario.tipo_usuario != '0' || $scope.usuario.tipo_usuario != '1' || $scope.usuario.tipo_usuario != '2'){
      window.alert("Ingresa un tipo de usuario válido");
      return false;
    }*/
    formulario.submit();
  }
  }]);
