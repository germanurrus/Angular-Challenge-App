'use strict';

angular.
  module('core.element').
  factory('Element', ['$indexedDB',
    function ($indexedDB) {
      return {
        lastId: 0,
        getElementsFromDB: function (cb) {
          var self = this;

          $indexedDB.openStore('listElements', function(listElements){

            var findID = listElements.query().$desc('id');

            listElements.eachWhere(findID).then(function(elementsDes) {

                if(elementsDes.length != 0){

                  self.lastId = elementsDes[0].id;
                }
                elementsDes.sort(function(a, b){
                  if(a.order < b.order) return -1;
                  if(a.order > b.order) return 1;
                  return 0;
                });
                return cb(elementsDes);

            });
          });
        },
        addNewElement : function(element ,cb){
          var self = this;
          $indexedDB.openStore('listElements', function(listElements){

              self.lastId = (self.lastId + 1);
              var id = self.lastId;
              listElements.insert({"id": id , "order": element.order ,"description": element.description }).then(function (e) {

                  return cb({"id": id , "order": element.order ,"description": element.description });

              });

          });
        },
        resetData: function (cb) {

          $indexedDB.openStore('listElements', function(listElements){
            //Borro toda la DB

            listElements.clear().then(function(){
              // Para comprobar que borro devuelvo la lista de la DB

              listElements.getAll().then(function(elements) {

                return cb(elements);

              });
            });
          });
        },
        deleteElementById:function(element, cb){

          $indexedDB.openStore('listElements', function(listElements){
            listElements.delete(element.id).then(function(){

                cb(null);
                // do something
              });
          });
        },
        updateElement:function(element, cb) {

          $indexedDB.openStore('listElements', function (listElements) {

              var update = {"id":element.id ,"description":element.description ,"order": element.order };

              listElements.upsert(update).then(function(e){

                  return cb(e);
              });
          });
        }
      };
    }
  ]);
