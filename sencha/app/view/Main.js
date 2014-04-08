(function() {
  Ext.define('AAAA.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
      items: [
        {
          xtype: 'button',
          text: 'hello',
          margin: '.5em',
          listeners: {
            tap: function() {
              var e;
              e = document.createEvent('hello');
              document.dispatchEvent(e);
              return console.log('hello tap');
            }
          }
        }
      ]
    }
  });

}).call(this);
