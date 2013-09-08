/*A continuacion una funcion es pasada como parametrop en otra funcion*/
var oOmar={
	name:'omar',
	lastname:'gonzales',
};
function Saludar(param){
	console.log(param);
}
(function(subMetodo,parametro){//1era forma de pasar una funcion como parametro
	subMetodo(parametro);
})(Saludar,"hello word");

(function(subMetodo,parametro){//2da forma de pasar una funcion como parametro
	subMetodo(parametro);
})(function(param){console.log(param)},"hello word");

/*----------------------------*/


