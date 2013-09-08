/*
	El objetivo de este plugin es el de optimizar el proceso de descarga
	de las imagenes en una pagina teniendo varias versiones de una misma 
	imagen, para distintas resolucines del navegador que presente la pagina
	y por ende del dispositivo movil o pc del usuario.
	Este script maneja el archivo de imagen q se va a ver en el navegador
	dependiendo de la resolucion q tenga.Este proceso se decide luego de
	cargado el DOM del documento.
	El plugin debe estar listo cuando sea implementado con OOP.

*/


function clsImage(id,nameImage_break_points){
	/*el nameImage_break_points es un objeto, como este Json con formt key:value
		{
			320:'nameFile-320.extension',
			480:'nameFile-480.extension',
			680:'nameFile-680.extension',
			840:'nameFile-840.extension',
			1000:'nameFile-1000.extension',
			1200:'nameFile-1200.extension',
			1400:'nameFile-1400.extension',
		}

	*/
	this.width_browser=window.innerWidth;
	this.nodeImage=document.getElementById(id);
	this.new_patchFile=this.original_source_file()+;
	this.original_source_file=function(){//devolvera la ruta donde se encontraran lsa imagenes excluyendo el nombre del archivo y su extension.
		var full_original_source=this.nodeImage.getAttribute("src");
		var patch_directory=full_original_source.substring(0,full_original_source.lastIndexOf("/")+1);//la ruta sin el nombre y extension del archivo imagen.
		return patch_directory;

	}

	this.Cargar_imagen=function(resolution){
		this.name_newFile=nameImage_break_points.[resolution];
		this.nodeImage.setAttribute("src",new_patchFile);
	}
	this.tester_ancho_browser=function(){
		var ancho=this.width_browser;
		if(ancho<=1200 && ancho>=800){
			console.log("entre 800 y 1200");
			Cargar_imagen('1600');
		}else if(ancho<800 && ancho>=600){
			console.log("entre 600 y 800");
			Cargar_imagen('800');
		}else if(ancho<600 && ancho>=480){
			console.log("entre 480 y 600");
			Cargar_imagen('480');
		}else if(ancho<480 && ancho>=320){
			console.log("entre 320  480");
			Cargar_imagen('480');
		}else if(ancho<320){
			console.log("menor a 320");
			Cargar_imagen('320');
		}else{
			console.log("mayor a 1200");
			Cargar_imagen('1600');
		}
	}

}

/*
	function Cargar_imagen(id_node,new_file,resolution){
		var image=document.getElementById(id_node);
		//var source=image.src;//esto arroja la ruta completa de la imagen, desde el servidor hasta el ombre y extension del archivo
		var source=image.getAttribute("src");//esto arroja exactamente lo que se establecio en el atributo src del objeto imagen.
		console.log("souce of image: "+source);
		var patch_file=source.substring(0,source.lastIndexOf("/")+1);
		//var name_file=source.substring(source.lastIndexOf("/")+1);//nombre del archivo actual + su extension.No es util si en el atributo src del <img> no espeficamos el nombre del archivo
		new_source=patch_file+new_file;//la nueva ruta.
		image.setAttribute("src",new_source);
		console.log("new source of image: "+new_source);
	}
*/
window.addEventListener('load',function(){
	var image=document.getElementById("image");
	image.addEventListener('load',function(){
		console.log("evento load de la imagen");
	},false);
	Calcular_resolucion_browser();

},false);//end listen del window en load
	function Calcular_resolucion_browser(){
		var ancho_browser=window.innerWidth;
		//var alto_browser=window.innerHeight;
		Calibrar_ancho_browser(ancho_browser);
	}
	
	function Calibrar_ancho_browser(ancho){
		if(ancho<=1200 && ancho>=800){
			console.log("entre 800 y 1200");
			Cargar_imagen("image",'img-800.jpg');
		}else if(ancho<800 && ancho>=600){
			console.log("entre 600 y 800");
			Cargar_imagen("image",'img-800.jpg');
		}else if(ancho<600 && ancho>=480){
			console.log("entre 480 y 600");
			Cargar_imagen("image",'img-480.jpg');
		}else if(ancho<480 && ancho>=320){
			console.log("entre 320  480");
			Cargar_imagen("image",'img-320.jpg');
		}else if(ancho<320){
			console.log("menor a 320");
			Cargar_imagen("image",'img-180.jpg');
		}else{
			console.log("mayor a 1200");
			Cargar_imagen("image",'img-1600.jpg');
		}
	}
	function Cargar_imagen(id_node,new_file,resolution){
		var image=document.getElementById(id_node);
		//var source=image.src;//esto arroja la ruta completa de la imagen, desde el servidor hasta el ombre y extension del archivo
		var source=image.getAttribute("src");//esto arroja exactamente lo que se establecio en el atributo src del objeto imagen.
		console.log("souce of image: "+source);
		var patch_file=source.substring(0,source.lastIndexOf("/")+1);
		var name_file=source.substring(source.lastIndexOf("/")+1);
		new_source=patch_file+new_file;
		image.setAttribute("src",new_source);
		console.log("new source of image: "+new_source);
	}