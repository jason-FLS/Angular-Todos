(function() {
	'use strict';

	angular
		.module('todomvc')
		.directive('todoFocus', todoFocus);

	todoFocus.$inject = ['$timeout'];

	function todoFocus($timeout) {

		var directive = {
			link: link,
			restrict: 'A'
		};
		return directive;

		function link (scope, element, attr) {
			scope.$watch(attr.todoFocus, function (newVal) {
				if(newVal) {
					$timeout(function() {
						element[0].focus();
					}, 0, false);
				}
			});
		};
	}
})();