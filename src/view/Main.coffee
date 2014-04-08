{{#class 'Ext.Container'}}

  xtype: 'main'

  config:
    items: [{
      xtype: 'button'
      text: 'hello'
      margin: '.5em'
      listeners:
        tap: ->
          e = document.createEvent('hello')
          document.dispatchEvent(e);

          console.log('hello tap');
    }]
{{/class}}