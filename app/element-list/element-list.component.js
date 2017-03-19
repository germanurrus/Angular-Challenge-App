/**
 * Created by gaurrus on 17/3/17.
 */
'use strict';

angular.
module('elementList').
component('elementList', {
    templateUrl: 'element-list/element-list.template.html',
    controller: ['Element','$scope',
        function ElementListController(Element, $scope) {

            var self = this;
            self.query = $scope.$parent.query;
            self.description = '';
            $scope.selected = null;
            $scope.elements = [];

            Element.getElementsFromDB(function(elements){

                $scope.elements = elements;

            });


            self.saveElement = function(description) {

                if( self.description == '')
                    return;
                var newElemenet = new Object();
                newElemenet.description = description;
                newElemenet.order = $scope.elements.length +1;

                Element.addNewElement(newElemenet,function(e){
                    newElemenet.id = e.id;
                    $scope.elements.push(newElemenet);
                    self.description = '';
                });

            };


            self.resetLista = function() {

                Element.resetData(function(elements){
                    $scope.elements = elements;
                });
            };
            /*self.printList =function(){

                Element.getElementsFromDB(function(elements){
                    console.log("FROM DB "+JSON.stringify(elements));
                });
            }*/

        }

    ]
});