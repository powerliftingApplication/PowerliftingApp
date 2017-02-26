"use strict";

var serviceId = 'flightManagerResource';
angular.module('AceApp').service(serviceId, ['$resource', flightManagerResource]);

function flightManagerResource($resource) {
    return $resource('http://iqattest2.mi.corp.rockfin.com:90/api/Flights/GetFlights', null, {
        'get': {
            //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
        },
        'save': {
            method: 'POST',
            isArray: true
        }
    });

}