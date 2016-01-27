'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:AddItemCtrl
 * @description
 * # AddItemCtrl
 * Controller of the zave app
 */
zaveApp.controller('AddItemCtrl', AddItemCtrl);

AddItemCtrl.$inject = ['DatabaseService', '$rootScope', '$timeout', '$http', '$ionicScrollDelegate'];

function AddItemCtrl(DatabaseService, $rootScope, $timeout, $http, $ionicScrollDelegate) {

	var vm = this;

	vm.newItem = {
		product: 'http://www.marksandspencer.com/floral-midi-dress/p/p22452703',
		productSrc: 'URL',
		notifySales: true,
		notifyStock: false,
		retailer: null,
	};
	vm.retailers = {};
	vm.step = 1;
	vm.product = null;

	vm.searchItem = searchItem;
	vm.addItem = addItem;

	$rootScope.$on('DatabaseService:getBaseDataSuccess', function () {
    init();
  });

	function init() {

		DatabaseService.get('retailer', true)
			.then(function(result) {

				$timeout(function() {
					vm.retailers = result.rows;
					vm.newItem.retailer = vm.retailers[0];
					vm.searchItem();
				});

			}).catch(function (err) {
				console.log(err);
			});

	}

	function searchItem() {

		var item = vm.newItem,
				getParams = {
					product: item.product,
					src: item.productSrc,
					retailer: vm.newItem.retailer.doc.name_code
				};


		$http.get(SCRAPER_API_URL + '/product', { params: getParams })
			.success(function(response) {

				$timeout(function() {
					vm.productDetails = response;
					vm.productDetails.retailer = item.retailer;
					vm.newItem.selectedColour = vm.productDetails.colours[0] || null;
					vm.step = 2;

					$ionicScrollDelegate.scrollTop();
				});
			})
			.catch(function(error) {
				console.log(error);
			});

	}

	function addItem() {

		var userProduct = {
			notifySales: vm.newItem.notifySales,
			notifyStock: vm.newItem.notifyStock,
			selectedColour: vm.newItem.selectedColour,
			selectedSize: vm.newItem.selectedSize
		};

		vm.productDetails["_id"] = 'product:' + vm.productDetails.productID;
		vm.productDetails.productSrc = {
			src: vm.newItem.product,
			product: vm.newItem.productSrc
		};

		angular.extend(userProduct, vm.productDetails);

		DatabaseService.save(userProduct);

	}

}
