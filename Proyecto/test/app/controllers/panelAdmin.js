

app.controller('panelAdmin',['$scope','$http',function($scope, $http){
  $scope.usuarioflag = true;
  $scope.unidadflag = true;
  $scope.idcurso = '';
  $scope.userUsername = '';
  this.resultadosQueryUser2;
  $scope.resultadosQuery = {

  }

  $scope.resultadosQueryUser = {

  }

  $scope.resultadosQueryUnidad = {

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
      $scope.queryUsuarios();
    }, function errorCallback(response){
      $scope.mensaje = response.data;
    })
  }

  $scope.modificarUser = function(username){
    var user = username;
    var valores = {
      usuario: user
    };
    $http({
      method: 'POST',
      url: '/obtenerUsuariosEsp',
      data: valores
    }).then(function successCallback(response, data){
        resultadosQueryUser2 = response.data;
        $scope.userUsername = response.data[0].Username;
        $scope.usuario.usuario = response.data[0].Username;
        $scope.usuario.nombre = response.data[0].Nombre;
        $scope.usuario.apellido = response.data[0].Apellido;
        $scope.usuario.email = response.data[0].Email;
        $scope.usuario.tipo_usuario = response.data[0].Tipo_usuario;
        $scope.usuarioflag = false;
    }, function errorCallback(response, data){
        $scope.mensaje = response.data;
    })
  }

  $scope.envModificarUser = function(){
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
    var valores = {
        usuario: $scope.usuario.usuario,
        nombre:$scope.usuario.nombre,
        apellido:$scope.usuario.apellido,
        email:$scope.usuario.email,
        tipo_usuario:$scope.usuario.tipo_usuario,
        exusuario: $scope.userUsername
      };
    $http({
      method: 'POST',
      url: '/updateUsuarios',
      data: valores
    }).then(function successCallback(response, data){
        $scope.mensaje = response.data;
        $scope.usuarioflag = true;
        $scope.queryUsuarios();
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

  $scope.eliminarCurso = function(idCurso){
    var valores = {
      idCurso: idCurso
    }
    $http({
      method: 'POST',
      url: '/deleteCurso',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.queryCursos();
    }, function errorCallback(response){
      $scope.mensaje = response.data;
    })
  }

  $scope.eliminarUnidad = function(idunidad){
    var valores = {
      idUnidad: idunidad,
      idCurso: $scope.idcurso
    }
    $http({
      method: 'POST',
      url: '/deleteUnidad',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.unidadflag = true;
    }, function errorCallback(response){
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
    var valores = {
      idCurso: idCurso
    };
    $http({
      method: 'POST',
      url: '/obtenerUnidad',
      data: valores
    }).then(function successCallback(response, data){
      $scope.resultadosQueryUnidad = response.data;
      $scope.mensaje = "";
      $scope.unidadflag = false;
    }, function errorCallback(response, data){
      $scope.mensaje = response.data;
    })
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
