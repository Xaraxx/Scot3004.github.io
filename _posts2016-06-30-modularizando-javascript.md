---
title: Modularizando JavaScript
category: dev
author: Sergio C. Orozco Torres
excerpt: Divide y venceras, una gran verdad del desarrollo web
---

Desarrollando aplicaciones aprendemos que hay muchas maneras de dar solución a un problema, todas ellas validas, muchas puede que compartan su enfoque asi como pueden haber implementaciones con otra forma de ver el problema. El problema llega cuando se requiere dar solución a algo que anteriormente ya otros dieron solución, sin embargo hacer todo desde 0 no es conveniente dado que puede tomar mucho tiempo.

### Herramientas para hacer un javascript modular

Los módulos en javascript es una caracteristica disponible de forma nativa a partir de ES6, sin embargo para ES5 hay herramientas que pueden ser de ayuda para este objetivo

#### ES5

CommonJS
: La usada en este blog, CommonJS una implementación usada por NodeJS para la importación de modulos usando la palabra reservada require.

{% highlight javascript %}
  var $ = require('jquery');
  exports.myExample = function () {};
{% endhighlight %}

AMD
: Se usa cuando se requiere tener paquetes asincronos ya que commonJS a pesar de ser mas sencilla tiene el inconveniente que los modulos se importan de forma sincrona.

{% highlight javascript %}
  define(['jquery'] , function ($) {
      return function () {};
  });
{% endhighlight %}


#### ES6

Ya está implemntada de forma nativa 

{% highlight javascript %}
   //------ lib.js ------
    export const sqrt = Math.sqrt;
    export function square(x) {
        return x * x;
    }
    export function diag(x, y) {
        return sqrt(square(x) + square(y));
    }
    
    //------ main.js ------
    import { square, diag } from 'lib';
    console.log(square(11)); // 121
    console.log(diag(4, 3)); // 5
  {% endhighlight %}

 [②ality – JavaScript and more](http://www.2ality.com/2014/09/es6-modules-final.html)
