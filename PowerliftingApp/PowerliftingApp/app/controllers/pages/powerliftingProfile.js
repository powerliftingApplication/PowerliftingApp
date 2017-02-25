angular.module('AceApp').controller('PowerliftingProfileCtrl', function($scope, $http, $timeout, $rootScope) {
    $scope.message = "hello!";

    //data for second flot chart
    var d1 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d1.push([i, Math.sin(i)]);
    }
    var d2 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d2.push([i, Math.cos(i)]);
    }
    var d3 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.2) {
        d3.push([i, Math.tan(i)]);
    }
    $scope.saleschart = {
        'data': [
            { label: "Domains", data: d1 },
            { label: "Hosting", data: d2 },
            { label: "Services", data: d3 }
        ],
        'options': {
            hoverable: true,
            shadowSize: 0,
            series: {
                lines: { show: true },
                points: { show: true }
            },
            xaxis: {
                tickLength: 0
            },
            yaxis: {
                ticks: 10,
                min: -2,
                max: 2,
                tickDecimals: 3
            },
            grid: {
                backgroundColor: { colors: ["#fff", "#fff"] },
                borderWidth: 1,
                borderColor: '#555'
            }
        }
    }
});