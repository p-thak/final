var app = angular.module('app', []);
app.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http) {


    $scope.getWalmartResults = function () {
         //var myCategory = document.getElementById("dropdown").value;
       
     var myQuery = document.getElementById("inputbox").value;
      var urls = "http://api.walmartlabs.com/v1/search?apiKey=2w9xg6wasagm2atc99qn8fjg&query="+myQuery+"&facet=on&facet.range=price:[4.50%20TO%205.01]&sort=bestseller";
      console.log(urls);

       //document.getElementById("result").innerHTML = ""
      console.log("Hello");
      
      $scope.walmartItems = [];
      $.ajax({
        // console.log("Walmart");
        url: urls,
          dataType: 'jsonp',
          success: function( data ){
            console.log("Hello from data");
            console.log(data);
            $("#result")
          $.each(data['items'], function(name2, value)
          {     

		 $scope.walmartItems.push({
			name: value.name,
			imgUrl: value.largeImage,
			price: value.salePrice,
			addToCartUrl: value.addToCartUrl

		});
   
  //           $("#result").append("<div class='items'><strong>"+value.name+"</strong><br><img src="+value.largeImage+"><br>Price: <strong>$" + value.salePrice+"</strong> <p></p><a href="+value.addToCartUrl+"><button type='button' class='btn btn-primary'>Click here to Buy</button></a></div><br><br>");
             //console.log(value.parentItemId);
          });
		console.log($scope.walmartItems); 
          }

      }
    )
     }
 angular.element(document).ready(function () {
      return $http.get('/user').success(function(data){
        $scope.user=data;
        console.log($scope.user);
      });
    });

    }
]);


