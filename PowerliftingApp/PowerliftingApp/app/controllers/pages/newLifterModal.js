angular.module('AceApp').controller('NewLifterModalCtrl',
    function ($scope, $uibModalInstance) {
        $scope.formSubmitted = false;//indicates whether user has tried submitting for or not
        $scope.updateFormScope = function () {
            $scope.formScope = this;//get a reference to form object
        };
        //check if a specific field has error
        $scope.hasError = function (field) {
            var myForm = $scope.formScope.form;
            var hasError = (myForm[field].$dirty || $scope.formSubmitted) && myForm[field].$invalid;
            return hasError;
        };

        //check if form has an invalid field
        $scope.isValidForm = function () {
            $scope.formSubmitted = true;
            return !($scope.formScope.form.$invalid);
        };
        $scope.ok = function () {
            if ($scope.isValidForm()) {
                $uibModalInstance.close($scope.lifter);
            }
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });