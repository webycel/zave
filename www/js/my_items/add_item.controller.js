'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:AddItemCtrl
 * @description
 * # AddItemCtrl
 * Controller of the retailered app
 */
retaileredApp.controller('AddItemCtrl', AddItemCtrl);

AddItemCtrl.$inject = ['$localStorage'];

function AddItemCtrl($localStorage) {

	var vm = this;

	vm.newItem = {
		product: '123',
		productSrc: 'ID',
		notifySales: true,
		notifyStock: false,
		retailer: 'mns'
	};

	vm.addItem = addItem;

	function addItem() {
		retaileredDatabase.createDocument(vm.newItem).then(function(result) {
        // The document was saved
				console.log(result);
    }, function(error) {
        // There was an error saving the document
    });

	}

}
