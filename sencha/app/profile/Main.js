(function() {
  Ext.define('AAAA.profile.Main', {
    extend: 'Ext.app.Profile',
    config: {
      controllers: ['AAAA.controller.Main']
    },
    isActive: function() {
      return true;
    }
  });

}).call(this);
