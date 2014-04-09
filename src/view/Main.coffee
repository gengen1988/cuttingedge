{{#class 'Ext.Container'}}

  xtype: 'main'

  config:
    items: [{
      xtype: 'button'
      text: 'world'
      margin: '.5em'
      listeners:
        tap: ->
          e = document.createEvent('hello')
          document.dispatchEvent(e);

          console.log('hello tap');
    }, {
      xtype: 'button'
      text: 'nihao'
      margin: '.5em'
    }]
{{/class}}