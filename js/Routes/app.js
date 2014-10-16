(function() {
	"use strict";

	angular
		.module('todomvc', ['ngRoute'])
		.config(routing);

		routing.$inject = ['$routeProvider'];

		function routing($routeProvider) {
			$routeProvider.when('/', {
				controller: 'TodosController',
				controllerAs: 'vm',
				templateUrl: 'todomvc-index.html'
			}).when('/:status', {
				controller: 'TodosController',
				controllerAs: 'vm',
				templateUrl: 'todomvc-index.html'
			}).otherwise({
				redirectTo: '/'
			});
		};

})();
