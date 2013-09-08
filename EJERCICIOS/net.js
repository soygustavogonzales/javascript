/*
	Comparar objetos
	Algoritmo que compara si existen o no propiedades(key) similares 
	en dos objetos
	El objetivo real es hacer un clon mas funcional y eficiente del metodo extend de jquery
*/

/********************************************/
!function(window,undefined){
		var net = new Object();
		net.exeAJAX=function(){
			this.req=null;
			this.rpta=null;
		}
		net.Extends = function (){
		};//end extends
		net.exeAJAX.prototype = {
				statusRequest:{
					UNINITIALIZED:0,//objeto creado,pero no se ha invocado al objeto open
					LOADING:1,//Canrgando(objeto creado, pero no se ha invocado al metodo send)
					LOADED:2,//Cargado(se ha invocado al metodo send, pero el servidor aun no ha respondido)
					INTERACTIVE:3,//Interactivo(se han recibido algunos datos, aunque no se puede emplear la propiedad responseText)
					COMPLETE:4,//Completo(se han recibido todos los datos de la respuesta del servidor)
				}
				,statusServer:{
					CORRECT:[0,200],//Respuesta correcta
					NO_FIND:404,//No encontrado
					ERROR_SERVER:500,//Error de servidor
				}
				,Init: function(){
					var self=this;
					request = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
					return request;
				}
				,Pedir:function(options){
						if(typeof(options)=="object"){
							var defaults ={
								method:'GET'
								,pathFile:'null'
								,queryString:'null'
								,asincronus:true
								,fallback:'null'//is a function(){}
								,callback:function(request){
									alert(request.responseText);
								}
								,contentType:"application/x-www-form-urlencoded"
								
							}
							var obj = new net.Extends();
							console.log(obj);
							options=obj.getExtendedObject(defaults,options);
							this.options=options;//las options es el namespace que contiene a los atributos que pueden ser pasados como parametros.
							this.options.fallback();//ejecutando el fallback()
							//console.log(this.options);

						}else{
							console.error("parametros incorrectos, debe ser un objeto JSON");
						}
					var self=this;
					var method=this.options.method,
					pathFile=this.options.pathFile,
					asincronus=this.options.asincronus,
					queryString=this.options.queryString,
					contentType=this.options.contentType,
					callback=this.options.callback;
					console.log(
						"method: "+method
						+"\npathFile: "+pathFile
						+"\nasincronus: "+this.options.asincronus
						+"\nqueryString: "+queryString
						+"\ncontentType: "+contentType
						+"\ncallback: "+callback
					);

					//queryString= (queryString==undefined)?null:queryString;
					if(queryString==undefined){
						queryString=null;

					}else if(typeof(queryString)=="object"){
						var cad="";
						for(key in queryString){
								cad=cad+((cad)?"&":"")+key+"="+encodeURIComponent(queryString[key]);
						}
						cad=cad+"&nocache=" + Math.random();
						queryString=cad;
					}else{
							console.error("queryString deve ser un objeto JSON");
					}
					/*
						:(typeof(queryString)=="object")?
						!function(p){
							var cad="";
							for(key in p){
								cad=cad+((cad)?"&":"")+key+"="+encodeURIComponent(p[key]);
							}
							return cad;
						}(queryString)
						:!function(){
							console.error("queryString deve ser un objeto JSON");
							return null;
						}();
					*/
					//console.log("queryString : "+queryString);
					this.req=this.Init();
					if(this.req){
						try{
							this.req.open(method,pathFile,asincronus);
							if(contentType){
								this.req.setRequestHeader("Content-type",contentType);
							}
							this.req.send(queryString);
								this.req.addEventListener('readystatechange',
									function(){
										self.Execute();
										//self.rpta = self.Execute();
										//console.log(self.rpta);
									}
								,false);
							//return this.rpta;
						}catch(error){
							console.error("error: "+error.message);
						}
					}else{
						console.error("Tu navegador no da soporte a AJAX, cambiate a uno nuevo!!!");
					}
				}
				,Execute:function(){
					var request=this.req;
					//console.log(request.readyState);
					//console.log(document.readyState);
					if(request.readyState==this.statusRequest.COMPLETE){
						if(request.status==this.statusServer.CORRECT[0] || request.status==this.statusServer.CORRECT[1]){
							this.options.callback(request);
							//return this.options.callback(request);
						}else{
							this.defaulError();
						}
					}
				}
				,defaultError:function(){
					console.log(
						"Error al traer los datos"
						+"\n\nreadyState: "+this.req.readyState
						+"\nstatus: "+this.req.status
						+"\nheaders: "+this.req.getAllResponseHeaders()
					);
				}

		};

		net.Extends.prototype = {
			comparar : function(o1,o2){
				/*
					_____________________
					o1: es un objeto JSON
					o2: es un objeto JSON
					_____________________

					*Este metodo ARROJARA la comparacion de dos objeto JSON en un
					 tercer objeto JSON que tiene dos arrays,
					 el 1ero contendra los atributos diferentes y
					 el 2do contendra los atributos semejantes.

					 La comparacion evalua al key(clave) de cada objeto, no el value(valor)
					 ej:

						 obj1:{              			obj2:{
							name:'gustavo'					name:'omar'		
							,lastname:'gonzales' 			,lastname:'davalos'
							,age:20							,dni:465448451
						 }                   			}

					var obj3 = comparar(obj1,obj2) ;
					console.log(obj3.diferentes) // [age,dni]
					console.log(obj3.iguales) // [lastname,name]
						
				console.log("comparando : "+JSON.stringify(o1)
								+" con\n"+JSON.stringify(o2));
				*/
				var oMa=o1,//asumo que o1 es el objeto con mayor elementos
				oMe=o2,//asumo que o2 es el objeto con menor elementos
				oMa_oMe=null,//guardara los elementos del objeto mayor que sean diferentes a los del objeto menor
				oMe_oMa=null,//guardara los elementos del objeto menor que sean diferentes a los del objeto mayor
				dif=null,//(guardara a los elementos diferentes)aun no le defino un tipo de valor ya que luego, se le definira en al mismo tiempo que 
				sim=[],//(guardara a los elementos similares-osea con el mismo key-),tipo array
				keysOMA=Object.keys(oMa),//array de elementos de oMa
				keysOME=Object.keys(oMe),//array de elementos de oMe
				nroEleOMA=keysOMA.length,//nro de elementos del oMa
				nroEleOME=keysOME.length;//nro de elementos del oMe

				if(!(nroEleOMA==Math.max(nroEleOMA,nroEleOME))){//si NO es cierto que el objeto con mayor elementos es o1(lo supuesto)
					oMa=o2;//o2 tiene mayor elementos
					oMe=o1;//o1 tiene menor elementos
					/*Actualizo los datos*/
						keysOMA=Object.keys(oMa);//
						keysOME=Object.keys(oMe);
						nroEleOMA=keysOMA.length,//nro de elementos del oMa
						nroEleOME=keysOME.length;//nro de elementos del oMe
				}//end if
				//console.info(keysOMA)
				//console.info(keysOME)
				oMa_oMe=Object.keys(oMa);//array con el nombre de los keys del objeto oMa
				oMe_oMa=Object.keys(oMe);//array con el nombre de los keys del objeto oMe
				for (var i = nroEleOME-1,elem=null; i >= 0; i--) {
						elem=keysOME[i];
						var result=((keysOMA.indexOf(elem)!=-1)?true:false);
						if(result){
							oMa_oMe.splice(keysOMA.indexOf(elem),1);//quito del array con mayor elementos los items que son similares.
							oMe_oMa.splice(keysOME.indexOf(elem),1);//quito del array con menor elementos los items que son repetidos.
							sim.push(elem);//en el array similares inserto el item que esta presente en los dos objetos
						}//end if
				
				}//end for
				dif=oMa_oMe.concat(oMe_oMa);//dif es un array que contendra la concatenacion de los arrays que contienen a los elementos distintos en ambos objetos.
				return {//retorno un objeto literal o Json
							diferentes:dif,
							similares:sim,
					   };
			}//end Comparar function
			,getExtendedObject : function(){
				/*
					El orden en el que se pasen los argumentos guardan relevancia con
					el resultado (objeto) que se arroja, tener en cuenta que los 
					atributos del objeto de la derecha aplastaran(sobreescriben) a
					los atributos del objeto de la izquierda siempre y cuando se asemejen
					es decir tengan el mismo key, no se toma en cuanta el valor(value)
					del atributo de ambos objetos

				*/
				var l=arguments.length;
				//console.log("nroArgumentos : "+l);
				var ul,pul,o,s,d,obj={};
				for(var j=l-1;j>=0;j--){
					//console.log(j);
					ul=arguments[j];//ultimo objeto
					//console.log(ul);
					o=this.comparar(obj,ul);
					//console.log("resultado de comparacion: ");
					//console.log(o);
					s=o.similares;//s es un array
					d=o.diferentes;//d es un array
					for(var i=0,dl=d.length;i<dl;i++){//propiedades diferentes
						if(ul[d[i]]==""||obj[d[i]]==""){//nota: "" = ''
							obj[d[i]]="";
						}
						obj[d[i]]=ul[d[i]]||obj[d[i]];
						condicion=(
									obj[d[i]]=='false'
									||obj[d[i]]=='0'
									||obj[d[i]]=='null'
									||obj[d[i]]=='NaN'
									||obj[d[i]]=='undefined'
									||obj[d[i]]=="''"
								);
						if(condicion){
							obj[d[i]]=eval(obj[d[i]]);
						}
						//console.log(d[i]+" : "+obj[d[i]]);
					}//end for
					var tipoDato=Object.prototype.toString;
					console.log(tipoDato);
						for(var i=0,sl=s.length;i<sl;i++){//propiedades similares
							if(tipoDato.call(obj[s[i]])=="[object Object]"&&tipoDato.call(ul[s[i]])=="[object Object]"){
								console.warn(JSON.stringify(obj[s[i]]) +" es un objeto");
								obj[s[i]]=this.getExtendedObject(ul[s[i]],obj[s[i]]);
							}else{
								obj[s[i]]=obj[s[i]];	
								//console.log(obj[s[i]]);
							}//end if
						}//end for
					/*
					*/
				}//end for
				return obj;
			}//end getExtendedObject
		}//end prototype definition
	window.net = net;
}(window,undefined);//end scope gloabal

