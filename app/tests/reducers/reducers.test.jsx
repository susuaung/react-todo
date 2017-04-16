var expect = require('expect');
var df = require('deep-freeze-strict');
var uuid = require('node-uuid');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''),df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todoReducer', () => {
    it('should add new todo', () => {
      var action =  {
        type: 'ADD_TODO',
        todo: {
          id: 'abc1123',
          text: 'Walk the dog',
          completed: false,
          createdAt: 898293
        }
      };

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should toggle todo', () => {
      var todos = [{
        id: uuid(),
        text: 'Go to Yanje',
        completed: false,
        createdAt: 123
      }];

      var action = {
        type: 'TOGGLE_TODO',
        id: todos[0].id
      }

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toEqual(true);
      expect(res[0].completedAt).toBeA('number');
    });

    it('should add existing todos', () => {
      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      var action = {
        type: 'ADD_TODOS',
        todos
      };

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
