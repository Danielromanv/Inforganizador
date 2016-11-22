/**
 * Created by javie_000 on 22/11/2016.
 */
app3.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData;
    $scope.submitButtonDisabled = false;
    $scope.submitted = false;
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data){
                console.log(data);
                if (data.success) {
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Falló :( Por favor rellena los campos.';
            $scope.result='bg-danger';
        }
    }
});