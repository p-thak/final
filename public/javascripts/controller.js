var app = angular.module('app', []);
app.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http) {

      $scope.walmartItems = [];
    $scope.getResults = function () {

	 $scope.walmartBool=true;
        $scope.ebayBool=true;
        $scope.shopBool=true;
         //var myCategory = document.getElementById("dropdown").value;
	$scope.walmartItems = [];
	$scope.ebayItems = [];
	var cls = document.getElementsByClassName("active btn btn-success");
	console.log(cls.length);
	for (i=0; i<cls.length; i++) {
		var id = cls[i].id;
		console.log(id);
		if (id === "walmart") {
		  $scope.walmartShow();
		} else if (id === "ebay") {
                  $scope.ebayShow();
		}
	}
	console.log($("#walmart.btn.btn-success.active.length"));

        console.log($("#ebay.btn.btn-success.active.length"));
/*
	if (#walmart.btn.btn-success.active) {
		$scope.walmartItems = [];
	} else if (#ebay.btn.btn-success.active.length >0) {
		$scope.ebayItems = [];
	} else if (#shop.btn.btn-success.active.length >0) {
		$scope.shopItems = [];
	}
*/
	console.log($("#walmart.btn.btn-success.active"));
	console.log($("#ebay .btn.btn-success.active"));
//	 $scope.walmartItems = [];
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
		console.log(data.numItems);
		if (data.numItems ===0) {
                   $scope.walmartBool = false;
		   var cls = document.getElementsByClassName("active btn btn-success");
        console.log(cls.length);
        for (i=0; i<cls.length; i++) {
                var id = cls[i].id;
                console.log(id);
                if (id === "walmart") {
                  $scope.walmartShow();
                } else if (id === "ebay") {
                  $scope.ebayShow();
                }
        }

                }
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
	console.log("I AM TESTING HERE");
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
      if ($scope.ebayItems ===0) {
                   $scope.ebayBool = false;
                }
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

//SHOP.COM API!!!!!!! =======================================
  console.log("In SHOPPING API");
        var xhr = new XMLHttpRequest();
        var myQuery = document.getElementById("inputbox").value;
	$scope.shopArray=[];
        var url = 'https://api.shop.com/sites/v1/search/term/'+myQuery;
      
        var queryParams = '?' +  encodeURIComponent('apikey') + '=' + encodeURIComponent('l7xxa64b99fe16964c8fa9edf45efc08f072');
        xhr.open('GET', url + queryParams);
          console.log(url+queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState== 4) {
               var theJson = JSON.parse(this.responseText);

               theJson.searchItems.forEach(function(item) {

                        var minPriceString = item.priceInfo.minPrice;

                    if(minPriceString != null){
                       console.log("the Low Price " + item.priceInfo.minPrice);

                        if(minPriceString.charAt(0)==='$') minPriceString= minPriceString.substr(1);  
 			minPriceString=minPriceString.replace (/,/g, "");
			console.log('Before parse: '+minPriceString);
                        console.log("after parse "+parseFloat(minPriceString));

                            if(parseFloat(minPriceString) <=5.00) {
                                console.log("in loop");
                                  $scope.shopArray.push({

                                    name: item.caption,
                                    imgUrl: item.imageURI,
                                    minPrice: item.priceInfo.minPrice,
                                    priceRange:item.priceInfo.price,
                                    addToCartUrl: item.modelQuickViewDetails.linkUrl

                             });
                          }
                  }

               });

                //console.log(theJson.searchItems);
                //console.log(theJson.searchItems[0].caption);
                //console.log(theJson.searchItems[0].imageURI);
                //console.log(theJson.searchItems[0].priceInfo.price);
                //console.log(theJson.searchItems[0].priceInfo.maxPrice);
                //console.log(theJson.searchItems[0].priceInfo.minPrice);
                //console.log(theJson.searchItems[0].modelQuickViewDetails.linkUrl);
			if ($scope.shopArray.length ===0) {
			console.log("SHOP FALSE");
                   $scope.shopBool = false;
                }
                     console.log($scope.shopArray);
		     $scope.apply();
            }
        };
        console.log($scope.shopArray);
        xhr.send('');


 $scope.apply();
  event.preventDefault();

     }
 angular.element(document).ready(function () {
      //return $http.get('/user').success(function(data){
        //$scope.user=data;
       // console.log($scope.user);
     // });
    });


  $scope.walmartShow= function(){
	console.log($scope.walmartItems.length);
	console.log("TEST LENGTH");
	var i = $scope.walmartItems.length;
	if (!$scope.walmartBool) {
		console.log("ITS FALSE");
		$scope.noModal=true;
	} else $scope.noModal=false;
    $scope.showModal2=false;
    $scope.showModal=true;
    $scope.showModal3=false;
    $(".btn-group > .btn").removeClass("active");
    $("#walmart").addClass("active");	
	
  }

  $scope.ebayShow= function() {
	if (!$scope.ebayBool) {
                $scope.noModal=true;
        } else $scope.noModal=false;
    $scope.showModal=false;
    $scope.showModal2=true;
    $scope.showModal3=false;
	$(".btn-group > .btn").removeClass("active");
    $("#ebay").addClass("active");
    }
	
  $scope.shopShow = function() {
	if (!$scope.shopBool) {
                $scope.noModal=true;
        } else $scope.noModal=false;
    $scope.showModal3=true;
    $scope.showModal2=false;
    $scope.showModal=false;
 	$(".btn-group > .btn").removeClass("active");
    $("#shop").addClass("active");
  }
  $scope.noShow = function() {
    $scope.noModal=true;
  }

  } 
]);


