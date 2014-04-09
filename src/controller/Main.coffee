{{#class 'Ext.app.Controller'}}

  requires: [
    '{{view "Main"}}'
    'Ext.data.proxy.LocalStorage'
  ]

  config:
    views: [
      'Main'
    ]

    control:
      viewport:
        push: 'hello',
        mmm: 'aaa'

    routes:
      '': 'entry'      

  entry: ->
    Ext.Viewport.setActiveItem
      xtype: 'main'

  hello: ->
    console.log 'world'

  ontap: ->
    console.log 'tap'

{{/class}}