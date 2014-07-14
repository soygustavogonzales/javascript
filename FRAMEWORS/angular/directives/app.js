var myapp = angular.module('myapp',[]);
myapp.controller('myCtrl', ['$scope','$interval', function ($scope,$interval) {
	$scope.friends = [
		{
			id:1
			,firstName:'Trinity'
			,lastName:'Orion'
			,age:25
			,tweets:[
				{id:1,text:'Este es mi tweet en Orion'}
				,{id:2,text:'Este es mi tweet en la discoteca del Merovingeo'}
			]
		},
		{
			id:2
			,firstName:'Neo'
			,lastName:'Saturno'
			,age:28
			,tweets:[
				{id:1,text:'Este es mi tweet desde la Matrix'}
				,{id:2,text:'Este es mi tweet desde Zion'}
			]
		}
	]
}])
myapp.directive('contactCard', ['$interval',function ($interval) {
	return {
		restrict: 'E',
    /*
		controller:function($scope,$interval){
			console.log($scope.friend.firstName);
		},
    */
    templateUrl:'contactCard.html'
		,scope:{
			friend:'=',
			title:'='
		},
		link: function (scope, ele, attr) {
			ele.find('h3').click(function(event) {//buscamos un elemento h3 dentro del elemento ele
				console.log(this.tagName);
        var e = 10
         while(e--){
           console.log(e)
         }
			});
		}
	};
}])
