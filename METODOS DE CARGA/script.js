$("#myModal").modal("show");
var eventHandler=function(event){
          console.log(
	          "this : "+this+"\n"+
	          "event.type: "+event.type+"\n"+
	          "event.timeStamp: "+event.timeStamp+"\n"+
	          "document.readyState: "+document.readyState
          );
           var img=document.querySelectorAll('img')[15];
			console.log(img);
			console.log("border : "+getComputedStyle(img).border);
};
console.log(document.readyState);
window.addEventListener('load',eventHandler,false);
document.addEventListener('readystatechange',eventHandler,false);
document.addEventListener('DOMContentLoaded',eventHandler,false);
window.addEventListener("load",function(e){
	$("#myModal").modal("hide");
},false)