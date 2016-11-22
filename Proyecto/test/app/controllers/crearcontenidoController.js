app.controller('crearcontenido',['$scope',function($scope){
  guardar = function(){
    alert("help");
    var cookieValue = document.getElementById('packery');
    var tosave = cookieValue.InnerHTML;
    console.log(tosave);
  }
}]);
