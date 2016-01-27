"use strict";

zaveApp
  .service('ItemsService', ItemsService);

ItemsService.$inject = ['$http', '$rootScope'];

function ItemsService($http, $rootScope) {

  // variables
  var database;

  // functions
  var loadDatabase, validateBaseData, saveBatch, save, get;

  return {

  }

}
