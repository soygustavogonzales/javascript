	var section=document.getElementsByTagName('section')[0];
	var section1=document.getElementById('section1');
	//console.log(getComputedStyle(section).background);
	console.log("section: "+section);
	console.log(
					"section==section1) : "+(section==section1)+"\n"+
					"(section===section1) : "+(section===section1)
				);
	order++;
	console.log("order : "+order);
	console.log((script.async)?'soportado':'no soportado');
console.timeEnd("controller");

