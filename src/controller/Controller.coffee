{{#class 'Ext.app.Controller'}}

  requires: [
    '{{view "Main"}}'
  ]

  config:
    routes:
      '': 'entry'

    refs:
      aaa: 'aaa'

  launch: ->
    view = Ext.create('{{view "Main"}}')
    
    @showView view

    ETFramework.Backend.request
      bo: '1'
      callback: ->
        store.load

  entry: ->
    console.log 'hello'

{{/class}}