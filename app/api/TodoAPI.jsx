var $ = require('jquery');
module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodo = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(stringTodo);
    } catch (e) {

    }

    return $.isArray(todos) ? todos : [];
  },
  filterTodos: function (todos, showCompleted, searchText) {
     var filteredTodos = todos;

     // Filter by showCompleted
     filteredTodos = filteredTodos.filter((todo) => {
       return !todo.completed || showCompleted;
     });

     // Filter by searchText
     if ( searchText.length > 0 ) {
       filteredTodos = filteredTodos.filter((todo) => {
         var text = todo.text.toLowerCase();
         return text.indexOf(searchText) > -1;
       });
     }

     // Sort todos with non-completed first
     filteredTodos.sort((a, b) => {
       if (!a.completed && b.completed) {
         return -1;
       } else if (a.completed && !b.completed) {
         return 1;
       } else {
         return 0;
       }
     });

     return filteredTodos;
   }
};