(function() {
  Ext.define('AAAA.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['AAAA.view.Main', 'Ext.data.proxy.LocalStorage'],
    config: {
      views: ['Main'],
      control: {
        viewport: {
          push: 'hello',
          mmm: 'aaa'
        }
      },
      routes: {
        '': 'entry'
      }
    },
    entry: function() {
      return Ext.Viewport.setActiveItem({
        xtype: 'main'
      });
    },
    hello: function() {
      return console.log('world');
    },
    ontap: function() {
      return console.log('tap');
    }
  });

}).call(this);
