var obj1 ={
	name:'omar',
	lastname:'gonzales',
	surname:'jesus',
	age:20,
	telefono:'94567456',
	prop1:undefined,
	prop2:'isNaN___',
	prop3:undefined,

};
/*
	Comparar objetos
	Algoritmo que compara si existen o no propiedades(key) similares 
	en dos objetos
	El objetivo real es hacer un clon mas funcional y eficiente del metodo extend de jquery
*/
var obj2={
	name:'erick',
	lastname:'gonzales',
	surname:'aldo',
	age:21,
	domicilio:'av:la paz',
	nacionalidad:'peruana',
	ocupacion:'estudiante',
};
var obj3={
	name:'carlos',
	lastname:'torres',
	surname:'segundo',
	age:25,
	domicilio:'av:dominicos',
	nacionalidad:'peruana',
}
var obj4={
	name:'maria',
	lastname:'torres',
	surname:'de los angeles',
	age:25,
	domicilio:'av:ignacio canales',
	nacionalidad:'peruana',
	estado_civil:'soltero',
}
var obj5={
	name:'antenor'
	,lastname:'gonzales'
	,surname:'davalos'
	,age:51
	,telefono:'984511513'
	,prop1:{
		subProp1:'soy subProp1'
		,subProp2:undefined
	}
	,prop2:'NaN'
	,prop6:null
	,prop7:NaN
	,prop8:undefined
	,caracteristicas:['hermosa','saludable','alta']

}
var obj6={
	name:'gloria'
	,lastname:'davalos'
	,surname:'rosa'
	,age:48
	,prop4:'...'
	,prop5:null
	,prop6:null
	,prop7:undefined
	,prop8:NaN
	,prop1:{
		subProp1:'subProp1'
		,subProp2:'NaN'
		,subProp3:{
			subProp31:'soy subProp31'
			,subProp32:'soy subProp32'
		},
	}
	
	,domicilio:'av:cesar vallejo'
	,nacionalidad:'peruana'
	,prop2:undefined
	,prop3:''
}
/********************************************/
!function(window,undefined){
		var net = new Object();

		net.Extends = function (){ 
			this.arguments_=arguments;
			this.nroArguements=arguments.length;
		};//end extends

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
						
				*/
				console.log("comparando : "+JSON.stringify(o1)
								+" con\n"+JSON.stringify(o2));
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
				console.info(keysOMA)
				console.info(keysOME)

				if(!(nroEleOMA==Math.max(nroEleOMA,nroEleOME))){//si NO es cierto que el objeto con mayor elementos es o1(lo supuesto)
					oMa=o2;//o2 tiene mayor elementos
					oMe=o1;//o1 tiene menor elementos
					/*Actualizo los datos*/
						keysOMA=keysOME;//
						keysOME=Object.keys(oMa);
						nroEleOMA=keysOMA.length,//nro de elementos del oMa
						nroEleOME=keysOME.length;//nro de elementos del oMe
				}//end if
				oMa_oMe=Object.keys(oMa);//array con el nombre de los keys del objeto oMa
				oMe_oMa=Object.keys(oMe);//array con el nombre de los keys del objeto oMe
				var patron=/(undefined)(null)(NaN)/gi;
				for (var i = nroEleOMA-1,elem=null; i >= 0; i--) {
						elem=keysOMA[i];
						console.log(elem);
						var result = patron.exec(oMe[elem]);
						console.log(result);
						console.log(oMe[elem]);
/*
						console.log(patron.exec(oMe[elem]));
*/
						if(oMe[elem]){
							keysOMA.splice(keysOMA.indexOf(elem),1);//quito del array con mayor elementos los items que son similares.
							keysOME.splice(keysOME.indexOf(elem),1);//quito del array con menor elementos los items que son repetidos.
							sim.push(elem);//en el array similares inserto el item que esta presente en los dos objetos
						}//end if
				
				}//end for
				dif=keysOMA.concat(keysOME);//dif es un array que contendra la concatenacion de los arrays que contienen a los elementos distintos en ambos objetos.
				return {//retorno un objeto literal o Json
							diferentes:dif,
							similares:sim,
					   };
			}//end Comparar function
			,getExtendedObject : function(){

				var l=arguments.length;
				var ul,pul,o,s,d,obj={};
				for(var j=l-1;j>=1;j--){
					ul=arguments[j];//ultimo objeto
					pul=arguments[j-1];//penultimo objeto
					//console.log(ul);
					//console.log(pul);
					o=comparar(obj,ul);
					console.log("resultado de comparacion: "+JSON.stringify(o));
					s=o.similares;//s es un array
					d=o.diferentes;//d es un array
					for(var i=0,dl=d.length;i<dl;i++){//propiedades diferentes
						obj[d[i]]=ul[d[i]]||obj[d[i]];
					}//end for
					for(var i=0,sl=s.length;i<sl;i++){//propiedades similares
						if(typeof(obj[s[i]])=="object"){
							console.warn(JSON.stringify(obj[s[i]]) +" es un objeto");
							obj[s[i]]=arguments.callee(ul[s[i]],obj[s[i]]);
						}else{
							obj[s[i]]=obj[s[i]];	
						}//end if
						//obj[s[i]]=(typeof(obj[s[i]])=="object")?arguments.callee(obj[s[i]],ul[s[i]]):obj[s[i]];
					}//end for
				}//end for
				return obj;
			}//end getExtendedObject
		}//end prototype definition
	window.net = net;
}(window,undefined);//end scope gloabal
var obj = new net.Extends();
console.log(obj.comparar(obj6,obj5));
