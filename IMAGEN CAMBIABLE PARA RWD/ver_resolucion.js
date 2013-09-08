console.time("controller1");
$(document).on('ready',function(){
	/*
	Este script hace q se muestre por consola la resolucion del navegador, osea
	el alto y el ancho visibles.
	*/
	//var cajita_img=$('div.cajita_img');
	//var img=$('div.cajita>img');
		//console.log("el alt del browser: "+alto_browser);
		//console.log("el alt del browser: "+ancho_browser);

		function mostrar_ancho(ancho,alto){
			if(ancho<=1200 && ancho>=800){
				console.log("entre 800 y 1200");
			
			}else if(ancho<800 && ancho>=600){
				console.log("entre 600 y 800");
			}else if(ancho<600 && ancho>=480){
				console.log("entre 480 y 600");
			}else if(ancho<480 && ancho>=320){
				console.log("entre 320  480");
			}else if(ancho<320){
				console.log("menor a 320");
			}else{
				console.log("mayor a 1200");
			}
		}
			
	$(window).resize(function(){
	var alto_browser=$(window).height();
	var ancho_browser=$(window).width();
		//console.log("cambiaste de tamaño");
		mostrar_ancho(ancho_browser,alto_browser);
	});

});
console.timeEnd("controller1");

