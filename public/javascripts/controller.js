var app = angular.module('app', []);
app.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http) {

      $scope.walmartItems = [];

    $scope.getResults = function () {
         //var myCategory = document.getElementById("dropdown").value;
	$scope.ebayShow();
        //$scope.walmartItems = [];
         //$scope.ebayItems = [];
       
     var myQuery = document.getElementById("inputbox").value;
      var urls = "http://api.walmartlabs.com/v1/search?apiKey=2w9xg6wasagm2atc99qn8fjg&query="+myQuery+"&facet=on&facet.range=price:[4.50%20TO%205.01]&sort=bestseller";
      console.log(urls);

       //document.getElementById("result").innerHTML = ""
      console.log("Hello");
      
      $.ajax({
        // console.log("Walmart");
        url: urls,
          dataType: 'jsonp',
          async: false,
          success: function( data ){
            console.log("Hello from data");
            console.log(data);
            $("#result")
            $scope.temp2 = [];
          $.each(data['items'], function(name2, value)
          {     
      
		 $scope.temp2.push({
			name: value.name,
			imgUrl: value.largeImage,
			price: value.salePrice,
			addToCartUrl: value.addToCartUrl

		});
     $scope.walmartItems = $scope.temp2;
   
  //           $("#result").append("<div class='items'><strong>"+value.name+"</strong><br><img src="+value.largeImage+"><br>Price: <strong>$" + value.salePrice+"</strong> <p></p><a href="+value.addToCartUrl+"><button type='button' class='btn btn-primary'>Click here to Buy</button></a></div><br><br>");
             //console.log(value.parentItemId);
          });
		console.log($scope.walmartItems); 
		$scope.$apply();
          }

      }
    )
            $.ajax({
    type: "GET",
    url: 'http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JacobWhi-CS201Fin-PRD-238c4f481-c3ec72bc&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + myQuery + '&paginationInput.entriesPerPage=10&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice&itemFilter(1).name=MinPrice&itemFilter(1).value=0&itemFilter(2).name=MaxPrice&itemFilter(2).value=5.00',
    async: false, 
    dataType: 'jsonp',
    crossDomain:true,
    success: function(data, status, xhr){
      console.log("EBAY");
      console.log(data);
          $scope.ebayItems = data.findItemsAdvancedResponse[0].searchResult[0].item || [];
      console.log($scope.ebayItems);
      var html = [];
      html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');

      $scope.temp = [];
      angular.forEach($scope.ebayItems, function(ebayItem, key){
          $scope.temp.push({
              Name: ebayItem.title[0],
              Pic: ebayItem.galleryURL[0],
              View: ebayItem.viewItemURL,
              Price: ebayItem.sellingStatus[0].currentPrice[0].__value__, 
	      URL: ebayItem.viewItemURL[0]
          })
      })
      $scope.ebayItems = $scope.temp;
      console.log($scope.ebayItems);
      console.log("temp:" + $scope.temp);

	$scope.$apply();
    }
  })
  event.preventDefault();
     }
 angular.element(document).ready(function () {
      //return $http.get('/user').success(function(data){
        //$scope.user=data;
       // console.log($scope.user);
     // });
    });


  $scope.walmartShow= function(){
    $scope.showModal2=false;
    $scope.showModal=true;
    $scope.showModal3=false;
  }

  $scope.ebayShow= function() {
    $scope.showModal=false;
    $scope.showModal2=true;
    $scope.showModal3=false;
    }

  $scope.shopShow = function() {
    $scope.showModal3=true;
    $scope.showModal2=false;
    $scope.showModal=false;
  }

  } 
]);


