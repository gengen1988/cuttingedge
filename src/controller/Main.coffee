{{#class 'ETFramework.app.Controller'}}
  requires: [
    'ETFramework.util.Uuid'
  ]
  config:
    views: [
      'Main'
    ]
    control:
      viewport:
        additem: 'handleAddItem'
        clearall: 'handleClearAll'
        
  launch: ->
    @showView 'main'

  handleAddItem: ->
    store = Ext.StoreMgr.lookup 'aaaa'

    Ext.Viewport.setMasked
      xtype: 'loadmask'

    store.add
      title: uuid.v4()

    setTimeout ->
      store.sync()
      Ext.Viewport.setMasked false
    , 1000

  handleClearAll: ->
    store = Ext.StoreMgr.lookup 'aaaa'

    Ext.Viewport.setMasked
      xtype: 'loadmask'
    
    store.removeAll()

    setTimeout ->
      store.sync()
      Ext.Viewport.setMasked false
    , 1000
    

{{/class}}
