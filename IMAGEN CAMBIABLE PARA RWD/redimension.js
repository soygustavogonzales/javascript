/*
ESte script determinara si se cambio el ancho del browser,
por ejemplo, si se detecta cambios en el ancho del navegador se pueden hacer aplicaciones
en la web o webapp para que hagan determinadas acciones en esa circunstancia, cumpliendo 
especificaciones del "responsive design".
*NOTA: En el camino de la implementacion del codigo me di cuenta q el mismo algoritmo
no funcionaba de igual forma en linux y en windows(Aunque se utilicen los mismos navegadores)
Razon: El raro(diferente) comportamiento del evento resize en ambos S.O.

	var alto_browser=window.innerHeight;//el alto del navegador
	var ancho_browser=window.innerWidth;//el ancho del navegador
*/
//(function(){
	var so = navigator.platform.toLowerCase(),
	so_=/(win32)|(win16)|(win)|(linux)|(mac)/gi.exec(so)[0];
	console.log(so);
	console.log("el sistema operativo es: "+so_);
	switch(so_){
		case"win":/*sentencias cuando es windows*/
			SWindowsResize();
			break;
		case"linux":/*sentencias cuando es linux*/
			SLinuxResize();	
			break;
		default:/*sentencias cuando es mac*/
			SWindowsResize();/*por el momento hasta q pruebe el codigo en una mac*/
			break;
	}
	var ancho_final=null;var alto_final=null;var ancho_inicial=window.innerWidth;var alto_inicial=window.innerHeight;
	function SLinuxResize(){

			window.addEventListener('resize',function(evento){

					//alert("evento: "+evento.type+" ::en "+this);/*cuidado q en Chrome provoca una doble repeticion del metodo, el escucha ejecuta dos veces la funcion pasada como argumento(comprobar!!, los demas navegadores no tienen problemas)*/
					ancho_inicial=ancho_final||ancho_inicial;//si los dos existen(son true),tomara el valor de la izquierda
					alto_inicial=alto_final||alto_inicial;
					ancho_final=window.innerWidth;//mide nuevamente el ancho del browser
					alto_final=window.innerHeight;
					dalto=(alto_final-alto_inicial);//0 si no hay cambios
					dancho=(ancho_final-ancho_inicial);
					/*

					0(cero) si no hay cambios, equivale a false
					<0( - ) o >0 ( + ) si hay cambios,equivale a true

					*/
					var msjFinal="CAMBIO SOLO EL ANCHO ::"+"\n"+
							"ANCHO: "+Estado(dancho)+" : "+dancho


					function Estado(dif){
						var msj="AGRANDASTE ";
						if(dif<0){msj="ACHICASTE ";}
						return msj
					}
					/*
					if(dancho&&dalto){
						msjFinal="CAMBIO EL ANCHO y ALTO ::"+"\n"+
								 "ANCHO: "+Estado(dancho)+dancho+"\n"+
								 "ALTO: " +Estado(dalto)+dalto
					}else if(!dancho&&dalto){msjFinal="CAMBIO SOLO EL ALTO ::"+"\n"+"ALTO: "+Estado(dalto)+" : "+dalto}
					else{msjFinal=msjFinal}
					*/
					if(dancho&&dalto){
						msjFinal="CAMBIO EL ANCHO y ALTO ::"+"\n"+
								 "ANCHO: "+Estado(dancho)+dancho+"\n"+
								 "ALTO: " +Estado(dalto)+dalto;
					}else{
						msjFinal="CAMBIO SOLO EL ALTO ::"+"\n"+"ALTO: "+Estado(dalto)+" : "+dalto;
					}
					console.log(msjFinal);
			},false);//cada vesz q se cambie el alto o ancho del browser-evento: "resize"-, se llamara al metodo medir_ancho
		//})()
	}
	function SWindowsResize(){//funciono muy bien en windows YEAA!!
		window.addEventListener('resize',function(){
			ancho_inicial=ancho_final||ancho_inicial;
			var self=this;
			var miMetodo=arguments.callee;//la funcion anonima
			this.removeEventListener('resize',miMetodo,false);
			var timer=setTimeout(function(){
				ancho_final=window.innerWidth;
				console.log(((ancho_inicial!=ancho_final)?"CAMBIO ANCHO":"NO CAMBIO ANCHO"));
				this.addEventListener('resize',miMetodo,false);
			},100)
		},false);
	}

