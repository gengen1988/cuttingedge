(function() {
  Ext.define('Focus.profile.Main', {
    extend: 'Ext.app.Profile',
    config: {
      controllers: ['Focus.controller.Main']
    },
    isActive: function() {
      return true;
    }
  });

}).call(this);
