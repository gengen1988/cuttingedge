(function() {
  Ext.define('Focus.model.Test', {
    extend: 'Ext.data.Model',
    config: {
      identifier: 'uuid',
      fields: ['day', 'count1', 'count2']
    }
  });

}).call(this);
