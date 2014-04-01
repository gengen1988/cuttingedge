(function() {
  Ext.define('Bootplate.profile.Main', {
    extend: 'Ext.app.Profile',
    config: {
      controller: ['Main']
    },
    isActive: function() {
      return true;
    }
  });

}).call(this);
