angular.module('kaifanla',[
  'ng',
  'ngRoute',
  'ngAnimate'
])
  .controller('parentCtrl',function($scope,$location){
    $scope.jump=function(url){
      $location.path(url);
    }
})
  .controller('startCtrl', function ($scope) {

  })
  .controller('mainCtrl', function ($scope,$http) {
    $scope.hasMoreData=true;
    //从服务器端获取最开始的五条菜品数据，声明为model数据，绑定到View
    $scope.dishList=[];
    $http.get('data/dish_getbypage.php?start=0')
      .success(function(data){

        $scope.dishList=data;
      });
    $scope.loadMore=function(){
      $http.get('data/dish_getbypage.php?start='+$scope.dishList.length)
        .success(function(data){
          //把新获取的数据追加到之前已经获取的数据的尾部
          if(data.length<5){
            $scope.hasMoreData=false;
          }
          $scope.dishList=$scope.dishList.concat(data);
        });
    };
    //监视Model数据kw的改变，只要一改变就要发起服务器请求
    $scope.$watch('kw',function(){
      //console.log('Model数据kw改变了：'+$scope.kw);
      if(!$scope.kw){  //模型数据变为空，则不发请求
        return;
      }
      $http.get('data/dish_getbykw.php?kw='+$scope.kw)
        .success(function(data){
          $scope.dishList = data;  //覆盖已有数据
        })
    })

  })
  .controller('detailCtrl', function ($scope,$http,$routeParams) {
    $http.get('data/dish_getbyid.php?did='+$routeParams.did)
      .success(function(data){
        $scope.dish=data[0];
        //console.log(arguments);
      })
  })
  .controller('orderCtrl', function ($scope,$http,$routeParams) {
    $scope.hasInfoShow=false;
    $scope.order={did:$routeParams.did};
    $scope.submitOrder=function(){
      $scope.hasInfoShow=true;
      console.log($scope.order);
      var orderData=jQuery.param($scope.order);
      console.log(orderData);
      $http.post('data/order_add.php',orderData)
        .success(function(data){
          console.log('接收到服务器的数据');
          console.log(data);
        })
    }
  })
  .controller('myOrderCtrl', function ($scope,$http,$routeParams) {
      $scope.orderList=[];
      $http.get('data/order_getbyphone.php?phone='+$routeParams.phone)
          .success(function(data){
            $scope.orderList=data;
          console.log(arguments);
          });
  })
  .config(function($routeProvider){
    $routeProvider
      .when('/start', {
        templateUrl: 'tpl/start.html',
        controller: 'startCtrl'
      })
      .when('/main', {
        templateUrl: 'tpl/main.html',
        controller: 'mainCtrl'
      })
      .when('/detail/:did', {
        templateUrl: 'tpl/detail.html',
        controller: 'detailCtrl'
      })
      .when('/order/:did', {
        templateUrl: 'tpl/order.html',
        controller: 'orderCtrl'
      })
      .when('/myorder/:phone', {
        templateUrl: 'tpl/myOrder.html',
        controller: 'myOrderCtrl'
      })
    .otherwise({
     redirectTo: '/start'
     })
  })
  .run(function($http){
    $http.defaults.headers.post=
    {'Content-Type':'application/x-www-form-urlencoded'};
  })

