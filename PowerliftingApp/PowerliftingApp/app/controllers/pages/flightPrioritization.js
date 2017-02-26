angular.module('AceApp').controller('FlightPrioritizationCtrl',
    function ($scope, $uibModal, $http, $timeout, $rootScope) {
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
                templateUrl: 'modalContent.html',
                scope: $scope,
                controller: function ($scope, $uibModalInstance) {
                    $scope.ok = function () {
                        $uibModalInstance.close($scope.lifter);
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
                //size: 'lg',
            });

            modalInstance.result.then(function (lifter) {
                $scope.pushNewSubItem(lifter, parentNode);
            });
        }

        $scope.pushNewSubItem = function(lifter, parentNode)
        {
            var nodeData = parentNode.$modelValue;
            nodeData.lifters.push({
                id: nodeData.id * 10 + nodeData.lifters.length,
                name: lifter.name,
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

        $scope.data = [
            {
            'id': 1,
            'name': 'Flight A',
            'lifters': [
              {
                  'id': 11,
                  'name': 'John Doe',
                  'weightClass': '181',
                  'firstAttempt': '450'
              },
              {
                  'id': 12,
                  'name': 'John Doe 2',
                  'weightClass': '181',
                  'firstAttempt': '470'
              }
            ]
        }, {
            'id': 2,
            'name': 'Flight B',
            'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
            'lifters': [
              {
                  'id': 21,
                  'name': 'John Doe 3',
                  'weightClass': '220',
                  'firstAttempt': '470'
              },
              {
                  'id': 22,
                  'name': 'John Doe 4',
                  'weightClass': '242',
                  'firstAttempt': '700'
              }
            ]
        }, {
            'id': 3,
            'name': 'Flight C',
            'lifters': [
              {
                  'id': 31,
                  'name': 'John Doe 5',
                  'weightClass': 'SHW',
                  'firstAttempt': '700'
              }
            ]
        }];
    });