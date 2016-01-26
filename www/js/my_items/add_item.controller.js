'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:AddItemCtrl
 * @description
 * # AddItemCtrl
 * Controller of the zave app
 */
zaveApp.controller('AddItemCtrl', AddItemCtrl);

AddItemCtrl.$inject = ['DatabaseService', '$rootScope', '$timeout'];

function AddItemCtrl(DatabaseService, $rootScope, $timeout) {

	var vm = this;

	vm.newItem = {
		product: 'T422749',
		productSrc: 'ID',
		notifySales: true,
		notifyStock: false,
		retailer: 'mns'
	};
	vm.retailers = {};

	vm.addItem = addItem;

	$rootScope.$on('DatabaseService:getBaseDataSuccess', function () {
    init();
  });

	function init() {

    console.log('there');

		DatabaseService.get('retailer', true)
			.then(function(result) {

				console.log(result);
				vm.retailers = result.rows;
				$timeout();

			}).catch(function (err) {
				console.log(err);
			});

	}

	function addItem() {

		var item = vm.newItem;

		item["_id"] = Date.now();

		console.log(item);

		// DatabaseService.save(item);

	}

}
