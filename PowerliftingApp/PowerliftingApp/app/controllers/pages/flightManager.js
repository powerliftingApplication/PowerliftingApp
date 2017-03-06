angular.module('AceApp').controller('FlightManagerCtrl',
    function ($scope, $uibModal, flightManagerResource) {
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

        $scope.addNewFlight = function() {
            // wrapper method in case there needs to be checks before opening modal. 
            $scope.openNewFlightModal();
        };

        $scope.openNewFlightModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/views/pages/newFlightModal.html',
                scope: $scope,
                controller: 'FormModalCtrl'
            });

            modalInstance.result.then(function(formObject) {
                $scope.pushNewFlight(formObject);
            });
        };

        $scope.pushNewFlight = function(flight) {
            $scope.data.push({
                flightName: flight.flightName,
                flightType: flight.flightType,
                lifters: []
            });
        };

        $scope.addNewLifter = function (parentNode) {
            // wrapper method in case there needs to be checks before opening modal. 
            $scope.openNewLifterModal(parentNode);
        };

        $scope.openNewLifterModal = function (parentNode) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/views/pages/newLifterModal.html',
                scope: $scope,
                controller: 'FormModalCtrl'
            });

            modalInstance.result.then(function (formObject) {
                $scope.pushNewLifter(formObject, parentNode);
            });
        }

        $scope.pushNewLifter = function (lifter, parentNode) {
            var nodeData = parentNode.$modelValue;
            nodeData.lifters.push({
                firstName: lifter.firstName,
                firstAttempt: lifter.firstAttempt,
                gender: lifter.gender,
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