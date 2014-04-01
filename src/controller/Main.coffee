{{#class 'Ext.app.Controller'}}

  requires: [
    '{{view "Main"}}'
  ]

  config:
    views: [
      'Main'
    ]
    routes:
      '': 'entry'

  entry: ->
    Ext.Viewport.setActiveItem
      xtype: 'main'

{{/class}}