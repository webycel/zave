// Ionic zave App
var APP_NAME = 'zave';
var SCRAPER_API_URL = 'http://192.168.1.4:8081';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'zave' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var zaveApp = angular.module(APP_NAME, ['ionic']);

zaveApp.$inject = ['$ionicPlatform', 'DatabaseService'];

zaveApp.run(function($ionicPlatform, DatabaseService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (!PouchDB) {
      console.log('Uh oh! PouchDB is not available!');
    } else {
      DatabaseService.loadDatabase();

      DatabaseService.validateBaseData();

      // console.log('hey');
    }

  });
});

// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//
//     .state('app', {
//       url: '/app',
//       abstract: true,
//       templateUrl: 'templates/menu.html',
//       controller: 'AppCtrl'
//     })
//
//     .state('app.search', {
//       url: '/search',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/search.html'
//         }
//       }
//     })
//
//     .state('app.browse', {
//         url: '/browse',
//         views: {
//           'menuContent': {
//             templateUrl: 'templates/browse.html'
//           }
//         }
//       })
//
//       .state('app.playlists', {
//         url: '/playlists',
//         views: {
//           'menuContent': {
//             templateUrl: 'templates/playlists.html',
//             controller: 'PlaylistsCtrl'
//           }
//         }
//       })
//
//     .state('app.retailers', {
//       url: '/retailers',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/playlist.html',
//           controller: 'RetailersCtrl'
//         }
//       }
//     });
//
//     // if none of the above states are matched, use this as the fallback
//     $urlRouterProvider.otherwise('/app/retailers');
// });
