(function() {
  Ext.define('Bootplate.controller.Controller', {
    extend: 'Ext.app.Controller',
    requires: ['Bootplate.view.Main'],
    config: {
      routes: {
        '': 'entry'
      },
      refs: {
        aaa: 'aaa'
      }
    },
    launch: function() {
      var view;
      view = Ext.create('Bootplate.view.Main');
      this.showView(view);
      return ETFramework.Backend.request({
        bo: '1',
        callback: function() {
          return store.load;
        }
      });
    },
    entry: function() {
      return console.log('hello');
    }
  });

}).call(this);
