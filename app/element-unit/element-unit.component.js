/**
 * Created by gaurrus on 17/3/17.
 */
'use strict';

angular.
module('elementUnit').
component('elementUnit', {
    templateUrl: 'element-unit/element-unit.template.html',
    controller: ['Element','$scope',
        function ElementUnitController(Element, $scope ) {

            var self = this;

            $scope.$watch( function() { return self.element.order; },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                    if ( newValue !== oldValue ) {

                        Element.updateElement(self.element, function(e){
                            return e;
                        });
                    }
                });

            self.changeDescription = function(element){

                Element.updateElement(element, function(e){
                    return e;
                });
            };
            self.deleteElement = function(element){

                Element.deleteElementById(element, function(e){

                    $scope.$parent.elements.splice((element.order-1),1);

                });
            };
        }

    ],
    bindings:{
        element :'=',
        orderElement:'=',
        idorder:'@'
    }
});
