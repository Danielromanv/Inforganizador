

app.controller('panelAdmin',['$scope','$http',function($scope, $http){
  $scope.usuarioflag = true;
  $scope.cursoflag = true;
  $scope.unidadflag = true;
  $scope.unidadformflag = true;
  $scope.cursoformflag = true;
  $scope.idcurso = '';
  $scope.idunidad = '';
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
  $scope.error = " ";
  $scope.flag = false;
  $scope.flagError = false;

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

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
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
      $scope.flag = true;
      $scope.flagError = false;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }


  $scope.eliminarUser = function(username){
    var valores = {
      usuario: username
    }

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/deleteUser',
      data: valores
    }).then(function successCallback(response){
      $scope.mensaje = response.data;
      $scope.flag = true;
      $scope.flagError = false;
      $scope.queryUsuarios();
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
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
        $scope.error = response.data;
        $scope.flagError = true;
        $scope.flag = false;
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

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
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
        $scope.flag = true;
        $scope.flagError = false;
        $scope.queryUsuarios();
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.insertarCurso = function(){
    var valores = $scope.curso;
    /** Enviar petición al servidor **/

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/insertCurso',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.flag = true;
      $scope.flagError = false;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.eliminarCurso = function(idCurso){
    var valores = {
      idCurso: idCurso
    }

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/deleteCurso',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.flag = true;
      $scope.flagError = false;
      $scope.queryCursos();
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.eliminarUnidad = function(idunidad){
    var valores = {
      idUnidad: idunidad,
      idCurso: $scope.idcurso
    }

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/deleteUnidad',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.unidadflag = true;
      $scope.flag = true;
      $scope.flagError = false;
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.queryCursos = function(){
    $http({
      method: 'GET',
      url: '/obtenerCursos'
    }).then(function successCallback(response){
      $scope.resultadosQuery = response.data;
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.queryUsuarios = function(){
    $http({
      method: 'GET',
      url: '/obtenerUsuarios'
    }).then(function successCallback(response){
      $scope.resultadosQueryUser = response.data;
    }, function errorCallback(response){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
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
      $scope.cursoflag = false;
      $scope.unidadflag = false;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.displayCursoForm = function(idCurso){
    $scope.idcurso = idCurso;
    var valores = {
      idCurso: idCurso
    };
    $http({
      method: 'POST',
      url: '/ObtenerCursoEsp',
      data: valores
    }).then(function successCallback(response, data){
      var resultado = response.data;
      $scope.curso.nombreCurso = response.data[0].Nombre_Curso;
      $scope.cursoformflag = false;
      $scope.cursoflag = false;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.displayUnidadForm = function(idUnidad){
    var valores = {
      idCurso: $scope.idcurso,
      idUnidad: idUnidad
    };
    $http({
      method: 'POST',
      url: '/ObtenerUnidadEsp',
      data: valores
    }).then(function successCallback(response, data){
      var resultado = response.data;
      $scope.unidad.nombreUnidad = response.data[0].nombreUnidad;
      $scope.idunidad = response.data[0].ID_unidad;
      $scope.unidadflag = true;
      $scope.unidadformflag = false;


    }), function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    }
  }


  $scope.insertarUnidad = function(){
      var valores = {
        idCurso: $scope.idcurso,
        nombreUnidad: $scope.unidad.nombreUnidad
      }

      var confirmacion = window.confirm("¿Estas Seguro?");
      if(confirmacion == false){
        return false;
      }

      $http({
        method: 'POST',
        url: '/insertUnidad',
        data: valores
      }).then(function successCallback(response, data){
        $scope.mensaje = response.data;
        $scope.unidadflag = true;
        $scope.flag = true;
        $scope.flagError = false;
      }, function errorCallback(response, data){
        $scope.error = response.data;
        $scope.flagError = true;
        $scope.flag = false;
      })
  }

  $scope.modificarCurso = function(){
    var valores = {
      idCurso: $scope.idcurso,
      nombreCurso: $scope.curso.nombreCurso
    };

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/updateCurso',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.cursoformflag = true;
      $scope.cursoflag = true;
      $scope.flag = true;
      $scope.flagError = false;
      $scope.queryCursos();
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
    })
  }

  $scope.modificarUnidad = function(){
    var valores = {
      idCurso: $scope.idcurso,
      idUnidad: $scope.idunidad,
      nombreUnidad: $scope.unidad.nombreUnidad
    };

    var confirmacion = window.confirm("¿Estas Seguro?");
    if(confirmacion == false){
      return false;
    }

    $http({
      method: 'POST',
      url: '/updateUnidad',
      data: valores
    }).then(function successCallback(response, data){
      $scope.mensaje = response.data;
      $scope.displayUnidad($scope.idcurso);
      $scope.unidadformflag = true;
      $scope.flag = true;
      $scope.flagError = false;
    }, function errorCallback(response, data){
      $scope.error = response.data;
      $scope.flagError = true;
      $scope.flag = false;
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
