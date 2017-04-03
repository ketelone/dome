/**
 * Created by daidongdong on 17/3/28.
 */
angular.module('loginModule').controller('registeredCtrl', ['$scope', function ($scope) {

  $scope.registered = function () {
    LocalPagePlugin.openPage(suc, err, {
      moduleId: '',
      localUrl: "/newwww/index2.html",
      version: ""
    });
  }
  $scope.registered1 = function () {
    LocalPagePlugin.updateLocalPage(suc, err, {
        updateModules: [
          {
            moduleId: '',
            downloadUrl: "",
            zipName: "newwww.zip",
            unZipPath: "",
            version: ""
          },
          {
            downloadUrl: "",
          }

        ]
      }
    );
  }

}]);
