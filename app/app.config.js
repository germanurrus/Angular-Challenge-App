'use strict';

angular.
  module('challengeApp').
  config(['$locationProvider' ,'$routeProvider','$indexedDBProvider',
    function config($locationProvider, $routeProvider,$indexedDBProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/elementList', {
          template: '<element-list></element-list>'
        }).
        otherwise('/elementList');

      /*$indexedDBProvider
          .connection('myIndexedDB')
          .upgradeDatabase(1, function(event, db, tx){
            var objStore = db.createObjectStore('listElements', {keyPath: 'ssn'});
            objStore.createIndex('name_idx', 'name', {unique: false});
            objStore.createIndex('age_idx', 'age', {unique: false});

            console.lof(JSON.stringify(objStore));
          });*/
    }
  ]);
