(function() {
	'use strict';

	angular
		.module('todomvc')
		.directive('todoEscape', todoEscape);

	todoEscape.$inject = [];

	function todoEscape() {
		var ESCAPE_KEY = 27;

		var directive = {
			link: link,
			// templateUrl: '/template/is/located/here.html',
            // template : undefined,
            restrict: 'A'
		};
		return directive;

		function link (scope, element, attrs) {
			element.bind('keydown', function (event) {
				if(event.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.todoEscape);
				}
			});
		};
	}
})();