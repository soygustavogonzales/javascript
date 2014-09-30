    var circle = document.querySelector('.colores')
    var circleEraser = document.querySelector('.eraser')
    var tamano = document.querySelector('.tamano')
    var tamDiv = document.querySelectorAll('.tamano div')
    var div = document.querySelectorAll('.colores div')
    var divEraser = document.querySelectorAll('.eraser div')
    var articleColores = document.querySelector('.colores-btn')
    var articleEraser = document.querySelector('.eraser-btn')
    //console.log(articleEraser)
    var onAnimation = function(){
      circle.classList.remove('hide')
      tamano.classList.remove('hide')
      console.log(tamDiv.item)
      for (var i = div.length - 1; i >= 0; i--) {
          console.log(tamDiv.item(i))
          div.item(i).classList.add('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.add('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('expand-tam')
        };
      },750)
      
    }

    var offAnimation = function(){
      circle.classList.add('hide')
      tamano.classList.add('hide')
      for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('expand-tam')
        };
      },10)
      
    }

    var onAnimationEraser = function() {
      circleEraser.classList.remove('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('expand')
        };
      },750)
      
    }
    var offAnimationEraser = function() {
      circleEraser.classList.add('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('expand')
        };
      },10)

    }
    articleColores.onmouseenter = onAnimation
    articleEraser.onmouseenter = onAnimationEraser
    tamano.onmouseleave = offAnimation
    circleEraser.onmouseleave = offAnimationEraser
    circleEraser.onmousemove = function(e) {
      console.log("x: %d,y: %d",e.x,e.y)
      if(e.x <=5 && e.y <=110 && e.y >= 95){
        console.log("en posicion")
        this.classList.contains('rotar-tam-pause')&&this.classList.remove('rotar-tam-pause')
        !this.classList.contains('rotar-tam')&&this.classList.add('rotar-tam')
        !this.classList.contains('rotar-tam-running')&&this.classList.add('rotar-tam-running')
      }else{
        !this.classList.contains('rotar-tam-pause')&&this.classList.add('rotar-tam-pause')
        this.classList.contains('rotar-tam-running')&&this.classList.remove('rotar-tam-running')
      }
    }
    tamano.onmousemove = function(e) {
      //console.log("x: %d,y: %d",e.x,e.y)
      if(e.x >= 90 && e.y >= 670){
        console.log("en posicion")//110,670
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.remove('rotar-tam-reverse')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
      }
      else if(e.x <= 5 && e.y <= 590){
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
        !tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.add('rotar-tam-reverse')
      }
      else{
        !tamano.classList.contains('rotar-tam-pause')&&tamano.classList.add('rotar-tam-pause')
      }
    }
          

    for (var i = div.length - 1; i >= 0; i--) {
      div[i].onclick = function (){
        console.log("click on color")
      }
      div[i].onmouseover = function (){
        console.log("mouseover")
        var span = this.children;
        var background = span[0].style.background;
        for (var i = tamDiv.length - 1; i >= 0; i--) {
          var span = tamDiv.item(i).children;
          span[0].style.background = background
        };

      }
    };
    for (var i = tamDiv.length - 1; i >= 0; i--) {
      tamDiv[i].onclick = function (){
        console.log("click on tamano")
      }
    };