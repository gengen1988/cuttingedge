(function() {
  Ext.define('AAAA.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['AAAA.view.Main'],
    config: {
      views: ['Main'],
      routes: {
        '': 'entry'
      }
    },
    entry: function() {
      return Ext.Viewport.setActiveItem({
        xtype: 'main'
      });
    }
  });

}).call(this);
