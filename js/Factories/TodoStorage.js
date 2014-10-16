(function() {
	'use strict';

	angular
		.module('todomvc')
		.factory('todoStorage', todoStorage);
		todoStorage.$inject = [];

		function todoStorage() {
			var STORAGE_ID = 'todos-angularjs';

			var service = {
				STORAGE_ID: STORAGE_ID,
				get: get,
				put: put
			};
			return service;

			function get() {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			};

			function put(todos) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			};

		};
})();
