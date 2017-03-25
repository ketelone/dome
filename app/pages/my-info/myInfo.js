/**
 * Created by daidongdong on 17/43/20.
 */

angular.module('myInfoModule')

  .controller('myInfoCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {




      console.log('myInfoCtrl.enter');

      $scope.$on('$ionicView.enter', function (e) {
        console.log('myInfoCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('myInfoCtrl.$destroy');
      });

      $scope.EmployeeListHistoryval = function(){
        $scope.employee_userqueryflag = false;
        if(storedb('employdb').find() != undefined || storedb('employdb').find() != null){
          $scope.employee_query_historylists = (storedb('employdb').find());
          if ($scope.employee_query_historylists.length > 5) {
            $scope.employee_query_historylists = $scope.employee_query_historylists.slice(0, 5);
          };
        };

        //常用联系人显示
        if (JSON.parse(localStorage.getItem("usuaemploydb")) != null || JSON.parse(localStorage.getItem("usuaemploydb")) != undefined) {
          $scope.usuaemployee_query_list = JSON.parse(localStorage.getItem("usuaemploydb"));
          if ($scope.usuaemployee_query_list.length > 15) {
            $scope.usuaemployee_query_list = $scope.usuaemployee_query_list.slice(0, 15);
          }
        } else {
          $scope.usuaemployee_query_list = [];
        }
      };

      $scope.employee_userClearhis = function(){
        storedb('employdb').remove();
        $scope.employee_query_historylists = [];
      };

      $scope.employee_govalue = function(value){
        $scope.employisshow = false;
        $scope.usuallyemployeelist = value;
        //存储历史记录

        //存储历史记录
        if($scope.employ.employeefiledvalue != ''){
          if(storedb('employdb').find() != undefined || storedb('employdb').find() != null){
            var employeehislistvalue = storedb('employdb').find();
            var employeehislistvaluelength = storedb('employdb').find().length;
            //判断是否有相同的值
            var emplyeehislistflag = true;
            for(var i=0;i<employeehislistvaluelength;i++){
              if(employeehislistvalue[i].name ==  $scope.employ.employeefiledvalue) {
                //删除原有的，重新插入
                storedb('employdb').remove({"name":employeehislistvalue[i].name}, function (err) {
                  if (!err) {
                  } else {
                  }

                })
                storedb('employdb').insert({"name": $scope.employ.employeefiledvalue}, function (err) {
                  if (!err) {
                  } else {
                    $cordovaToast.showShortBottom('历史记录保存失败');
                  }
                });
                emplyeehislistflag = false;
              }
            };
            if(emplyeehislistflag == true){
              storedb('employdb').insert({"name": $scope.employ.employeefiledvalue}, function (err) {
                if (!err) {
                } else {
                  $cordovaToast.showShortBottom('历史记录保存失败');
                }
              });
            }
          }else{
            storedb('employdb').insert({"name": $scope.employ.employeefiledvalue}, function (err) {
              if (!err) {
              } else {
                $cordovaToast.showShortBottom('历史记录保存失败');
              }
            });
          };
        };


        //存储常用联系人
        if (JSON.parse(localStorage.getItem("usuaemploydb")) != null || JSON.parse(localStorage.getItem("usuaemploydb")) != undefined) {
          //判断是否有相同的值
          var usuaemployhislistflag = true;
          for(var i=0;i<$scope.employeehislistvalue.length;i++){
            if($scope.employeehislistvalue[i].NAME_LAST == $scope.usuallyemployeelist.NAME_LAST) {
              //删除原有的，重新插入
              $scope.employeehislistvalue = JSON.parse(localStorage.getItem("usuaemploydb"));
              $scope.employeehislistvalue.splice(i,1);
              $scope.employeehislistvalue.unshift($scope.usuallyemployeelist);
              localStorage['usuaemploydb'] = JSON.stringify( $scope.employeehislistvalue);
              usuaemployhislistflag = false;
            }
          };
          if(usuaemployhislistflag == true){
            $scope.employeehislistvalue.unshift($scope.usuallyemployeelist);
            localStorage['usuaemploydb'] = JSON.stringify( $scope.employeehislistvalue);
          }

        }else{
          $scope.employeehislistvalue.unshift($scope.usuallyemployeelist);
          localStorage['usuaemploydb'] = JSON.stringify( $scope.employeehislistvalue);
        };

      }
    }]);
