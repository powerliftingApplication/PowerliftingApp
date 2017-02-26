/**
 * @name AceApp
 * @description
 * # AceApp
 *
 * Main module of the application.
 */
var app = angular
  .module('AceApp', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
	//'angular-loading-bar',
	'oc.lazyLoad',
	'ui.bootstrap',
	'ui.router',
	'ace.directives',
	'ngStorage'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider/**, cfpLoadingBarProvider*/) {
      //cfpLoadingBarProvider.includeSpinner = true;

      $urlRouterProvider.otherwise('/dashboard');

      $stateProvider
              .state('dashboard',
              {
                  url: '/dashboard',
                  title: 'Dashboard',
                  icon: 'fa fa-tachometer',

                  templateUrl: 'app/views/pages/dashboard.html',
                  controller: 'DashboardCtrl',

                  resolve: {
                      lazyLoad: [
                          '$ocLazyLoad', function ($ocLazyLoad) {
                              return $ocLazyLoad.load([
                                  {
                                      name: 'angular-flot',
                                      serie: true,
                                      files: [
                                          'components/Flot/jquery.flot.js',
                                          'components/Flot/jquery.flot.pie.js',
                                          'components/Flot/jquery.flot.resize.js',
                                          'components/angular-flot/angular-flot.js'
                                      ]
                                  },
                                  {
                                      name: 'easypiechart',
                                      files: ['components/_mod/easypiechart/angular.easypiechart.js']
                                  },
                                  {
                                      name: 'AceApp',
                                      files: ['app/controllers/pages/dashboard.js']
                                  }
                              ]);
                          }
                      ]
                  }
              })
        .state('flights',
        {
            'abstract': true,
            title: 'Flights',
            template: '<ui-view/>',
            icon: 'fa fa-pencil-square-o'
        })
        .state('flights.prioritization',
        {
            url: '/flights-prioritization',
            title: 'Prioritize Flights',

            templateUrl: 'app/views/pages/flightManager.html',
            controller: 'FlightManagerCtrl',
            resolve: {
                lazyLoad: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'ui.tree',
                            files: ['components/angular-ui-tree/angular-ui-tree.js']
                        },
                            {
                                name: 'AceApp',
                                files: ['app/controllers/pages/flightManager.js']
                            },
                            {
                              name: 'AceApp',
                              files: ['app/resources/flightManagerResource.js']
                            }
                        ]);
                    }
                ]
            }
        })
      //.state('profile',
      //{
      //    'abstract': true,
      //    //url: '/form',
      //    title: 'Profiles',
      //    template: '<ui-view/>',
      //    icon: 'fa fa-pencil-square-o'
      //})
      //.state('profile.powerlifting',
      //{
      //    url: '/profile-powerlifting',
      //    title: 'Powerlifting Profile',

      //    templateUrl: 'app/views/pages/powerliftingProfile.html',
      //    controller: 'PowerliftingProfileCtrl',
      //    resolve: {
      //        lazyLoad: [
      //            '$ocLazyLoad', function ($ocLazyLoad) {
      //                return $ocLazyLoad.load([{
      //                    name: 'angular-flot',
      //                    serie: true,
      //                    files: [
      //                        'components/Flot/jquery.flot.js',
      //                        'components/Flot/jquery.flot.pie.js',
      //                        'components/Flot/jquery.flot.resize.js',
      //                        'components/angular-flot/angular-flot.js'
      //                    ]
      //                },
      //                    {
      //                        name: 'sparkline',
      //                        files: ['components/jquery.sparkline/index.js']
      //                    },
      //                    {
      //                        name: 'AceApp',
      //                        files: ['app/controllers/pages/powerliftingProfile.js']
      //                    }
      //                ]);
      //            }
      //        ]
      //    }
      //})
      ;
  })
  .run(function ($rootScope) {

  });
