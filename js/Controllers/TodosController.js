(function() {
	'use strict';

	angular.module('todomvc')
	.controller('TodosController', TodosController);
	TodosController.$inject = ['todoStorage', '$scope', '$filter' , '$routeParams'];

	function TodosController(todoStorage, $scope, $filter, $routeParams) {
		var vm = this;
		var todos;
		vm.newTodoText = '';
		vm.editedTodo = null;
		var todos = vm.todos = todoStorage.get();

		$scope.$watch('vm.todos', function (newValue, oldValue) {
			$scope.vm.remainingCount = $filter('filter')(vm.todos, { completed: false }).length;
			$scope.vm.completedCount = vm.todos.length - $scope.vm.remainingCount;
			$scope.vm.allChecked = !vm.remainingCount;
			if(newValue !== oldValue) {
				todoStorage.put(vm.todos);
			}
		}, true);

		$scope.$on('$routeChangeSuccess', function() {
			var status = $scope.vm.status = $routeParams.status || '';
			
			$scope.vm.statusFilter = (status === 'active') ? 
				{ completed: false } : (status === 'completed') ? 
				{ completed: true } : null;
		});

		vm.addTodo = function() {
			var newTodoText = vm.newTodoText.trim();
			if (!newTodoText.length) {
				return;
			}

			vm.todos.push({
				body: newTodoText,
				completed: false,
			});

			vm.newTodoText = '';
		};

		vm.editTodo = function(todo) {
			vm.editedTodo = todo;
			vm.originalTodo = angular.extend({}, todo);
		};

		vm.doneEditing = function(todo) {
			vm.editedTodo = null;
			todo.body = todo.body.trim();

			if(!todo.body){
				vm.destroy(todo);
			}
		};

		vm.revertEditing = function(todo) {
			vm.todos[vm.todos.indexOf(todo)] = vm.originalTodo;
			vm.doneEditing(vm.originalTodo);
		};

		vm.destroy = function() {
			vm.todos.splice(vm.todos.indexOf(vm.todo), 1);
		};

		vm.clearCompletedTodos = function() {
			vm.todos = todos = vm.todos.filter(function (val){
				return !val.completed;
			});
		};

		vm.markAll = function(completed) {
			todos.forEach(function (todo){
				todo.completed = !todo.completed;
			});
		};
	}

})();
