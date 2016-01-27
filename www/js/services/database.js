"use strict";

zaveApp
  .service('DatabaseService', DatabaseService);

DatabaseService.$inject = ['$http', '$rootScope'];

function DatabaseService($http, $rootScope) {

  // variables
  var database;

  // functions
  var loadDatabase, validateBaseData, saveBatch, save, get;

  loadDatabase = function() {
    database = new PouchDB(APP_NAME);
  };

  validateBaseData = function() {

    // is retailer data there?
    database.allDocs({
      // include_docs: true
      startkey: 'retailer:100',
      endkey: 'retailer:9999999'
    }).then(function(result) {

      if (!result.rows.length) {
        // no retailer data available, get it and store in local DB
        $http.get('data/retailers.json')
          .success(function(response) {

            saveBatch(response.retailers)
              .then(function(result) {
                $rootScope.$broadcast('DatabaseService:getBaseDataSuccess')
              })
              .catch(function (err) {
                console.log(err);
              });

          })
          .error(function(error) {
            console.log(error);
          });
      } else {
        $rootScope.$broadcast('DatabaseService:getBaseDataSuccess')
      }

    }).catch(function (err) {
      console.log(err);
    });

  };

  saveBatch = function(docs) {
    return database.bulkDocs(docs);
  };

  save = function(doc) {
    database.put(doc);
  };

  get = function(item, batch) {

    if (batch) {

      return database.allDocs({
        include_docs: true,
        startkey: item,
        endkey: item + ':xxxxxxxxxx'
      });

    } else {

      return database.get(item);

    }

  };

  return {
    loadDatabase: loadDatabase,
    validateBaseData: validateBaseData,
    save: save,
    get: get
  }

}
