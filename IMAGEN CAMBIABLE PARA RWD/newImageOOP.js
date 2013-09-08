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
	this.name_newFile=null;
	this.width_browser=window.innerWidth;
	this.nodeImage=document.getElementById(id);
	this.original_source_file=function(){//devolvera la ruta donde se encontraran lsa imagenes excluyendo el nombre del archivo y su extension.
		var full_original_source=this.nodeImage.getAttribute("src");
		var patch_directory=full_original_source.substring(0,full_original_source.lastIndexOf("/")+1);//la ruta sin el nombre y extension del archivo imagen.
		return patch_directory;

	}

	this.Cargar_imagen=function(resolution){
		this.name_newFile=nameImage_break_points[resolution];
		this.new_patchFile=this.original_source_file()+this.name_newFile;
		this.nodeImage.setAttribute("src",this.new_patchFile);
		console.log("New file is LOADED");
	}
	this.testear_ancho_browser=function(){
		var ancho=this.width_browser;
		if(ancho<=1200 && ancho>=800){
			console.log("entre 800 y 1200");
			this.Cargar_imagen('1600');
		}else if(ancho<800 && ancho>=600){
			console.log("entre 600 y 800");
			this.Cargar_imagen('800');
		}else if(ancho<600 && ancho>=480){
			console.log("entre 480 y 600");
			this.Cargar_imagen('480');
		}else if(ancho<480 && ancho>=320){
			console.log("entre 320  480");
			this.Cargar_imagen('480');
		}else if(ancho<320 && ancho>=180){
			console.log("menor a 320");
			this.Cargar_imagen('320');

		}else if(ancho<180){//una resolucion muy pequeña
			console.log("menor a 180");
			this.Cargar_imagen('180');			
		}else{
			console.log("mayor a 1200");
			this.Cargar_imagen('1600');
		}
	}

}
