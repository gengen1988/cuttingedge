(function() {
  Ext.define('Focus.controller.Main', {
    extend: 'ETFramework.app.Controller',
    requires: ['ETFramework.util.Uuid'],
    config: {
      views: ['Main'],
      control: {
        viewport: {
          additem: 'handleAddItem',
          clearall: 'handleClearAll'
        }
      }
    },
    launch: function() {
      return this.showView('main');
    },
    handleAddItem: function() {
      var store;
      store = Ext.StoreMgr.lookup('aaaa');
      Ext.Viewport.setMasked({
        xtype: 'loadmask'
      });
      store.add({
        title: uuid.v4()
      });
      return setTimeout(function() {
        store.sync();
        return Ext.Viewport.setMasked(false);
      }, 1000);
    },
    handleClearAll: function() {
      var store;
      store = Ext.StoreMgr.lookup('aaaa');
      Ext.Viewport.setMasked({
        xtype: 'loadmask'
      });
      store.removeAll();
      return setTimeout(function() {
        store.sync();
        return Ext.Viewport.setMasked(false);
      }, 1000);
    }
  });

}).call(this);
