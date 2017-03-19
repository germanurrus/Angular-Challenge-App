
'use strict';

angular.
module('challengeApp').
config(['$indexedDBProvider',
    function config($indexedDBProvider) {


        $indexedDBProvider
            .connection('myIndexedDB')
            .upgradeDatabase(1, function(event, db, tx){


                var objStore = db.createObjectStore('listElements', {keyPath: 'id'});
                objStore.createIndex('descrip_idx', 'description', {unique: false});
                objStore.createIndex('order_idx', 'order', {unique: false});


                console.log(JSON.stringify(objStore));
            });
    }
]);
