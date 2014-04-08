Cutting Edge
----

本项目是开发 Sencha Touch 应用的初始化工程。本项目通过将直接编写代码转变为编写模板，简化了 Sencha Touch MVC 的编写过程。同时引入了 CoffeeScript 语法，减少代码量，规范语法。

特点
----

- 使用 grunt 整合开发流程，无需手动构建项目
- 通过配置解决应用 Sencha Touch 更改命名空间问题
- 使用 handlebars 开发领域语言，精简 MVC 代码
- 使用 CoffeeScript，规范化 Javascript 语法
- 分离 Cordova 与 Sencha Touch 工程，均可独立升级
- 整合常用插件
- 性能优化

使用方法
----
开发者需要 clone 这个项目，在这个模板的基础上进行开发。

在 `src` 目录中编写自己的应用，编写方法与 Sencha Touch 的 app 文件夹是一样的。

在 `src` 中的代码可以使用 CoffeeScript 编写，同时也可以用 Javascript 编写，以扩展名 `.coffee` 区分。

在 `src` 中可以使用模板简化命名空间的编写。

模板语法
====
### 定义类
```
{{#class [parent class]}}
{{/class}}
```
这个模板会自动匹配当然的文件名与路径生成 Sencha Touch MVC 的类。使用时无需编写类名，自动从文件名获取。

例子
```
{{#class 'Ext.app.Controller'}}

  config:
    routes:
      '': 'entry'
      
  entry: ->
    console.log 'helloworld'
    
{{/class}}
```

### 命名空间补全
```
{{app 'className'}}
{{controller 'className'}}
{{view 'className'}}
{{store 'className'}}
{{model 'className'}}
...
```
这个模板会根据配置自动补齐命名空间，使得更改应用名变得更简单。

例子
```
{{#class (view 'Main')}}
  config:
    items: [{
      xtype: 'button'
      text: 'push me'
    }]
    
  initialize: ->
    @callParent arguments
    view = Ext.create '{{view "Test"}}'
    Ext.Viewport.add view
{{/class}}
```

命令
====

### 构建应用
```
grunt build
```

### 编译模板
```
grunt template
```

### 实机调试
```
grunt test
```
