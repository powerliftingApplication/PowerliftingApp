angular.module('AceApp').controller('FlightManagerCtrl',
    function ($scope, $uibModal, flightManagerResource, $http, $timeout, $rootScope) {
        $scope.data = [];

        $scope.getFlights = function () {
            var response = flightManagerResource.query();
            response.$promise.then(
                function (success) {
                    console.log(success);
                    success.forEach(function (flight) {
                        $scope.data.push(flight);
                    });
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        $scope.init = function () {
            $scope.getFlights();
        }

        $scope.init();

        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function () {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };

        $scope.newSubItem = function (parentNode) {
            $scope.openModal(parentNode);
        };

        $scope.openModal = function (parentNode) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/views/pages/newLifterModal.html',
                scope: $scope,
                controller: function ($scope, $uibModalInstance) {
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
                }
            });

            modalInstance.result.then(function (lifter) {
                $scope.pushNewSubItem(lifter, parentNode);
            });
        }

        $scope.pushNewSubItem = function (lifter, parentNode) {
            var nodeData = parentNode.$modelValue;
            nodeData.lifters.push({
                id: nodeData.id * 10 + nodeData.lifters.length,
                firstName: lifter.firstName,
                firstAttempt: lifter.firstAttempt,
                weightClass: lifter.weightClass
            });
        };

        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        //$scope.data = [
        //    {
        //    'id': 1,
        //    'flightName': 'Flight A',
        //    'lifters': [
        //      {
        //          'id': 11,
        //          'firstName': 'John Doe',
        //          'weightClass': '181',
        //          'firstAttempt': '450'
        //      },
        //      {
        //          'id': 12,
        //          'firstName': 'John Doe 2',
        //          'weightClass': '181',
        //          'firstAttempt': '470'
        //      }
        //    ]
        //}, {
        //    'id': 2,
        //    'flightName': 'Flight B',
        //    'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        //    'lifters': [
        //      {
        //          'id': 21,
        //          'firstName': 'John Doe 3',
        //          'weightClass': '220',
        //          'firstAttempt': '470'
        //      },
        //      {
        //          'id': 22,
        //          'firstName': 'John Doe 4',
        //          'weightClass': '242',
        //          'firstAttempt': '700'
        //      }
        //    ]
        //}, {
        //    'id': 3,
        //    'flightName': 'Flight C',
        //    'lifters': [
        //      {
        //          'id': 31,
        //          'firstName': 'John Doe 5',
        //          'weightClass': 'SHW',
        //          'firstAttempt': '700'
        //      }
        //    ]
        //}];
    });