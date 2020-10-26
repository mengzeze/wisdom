var voteruleCtrl = [ '$scope','$http', function($scope,$http) {

    var param = {
        token:JSON.parse(sessionStorage.getItem("userToken")),
        userId:JSON.parse(sessionStorage.getItem("userId")),
        projectId:0
        // token:'string',
        // userId:123,
    };
    var modelUrl = KISBPM.URL.getVoteRule();

    $http({method: 'post',data:param, url: modelUrl}).
    success(function (data, status, headers, config) {
        data = data.data;
        console.log(data, 'voteruleCtrl');
        $scope.property.options = data;
    }).
    error(function (data, status, headers, config) {
        console.log('Error loading voterule with id ' + data);
    });

    // $scope.property.options = JSON.parse('[{"name":"关联投票","value":"1"},{"name":"关联会议","value":"2"}]')

    if ($scope.property.value == undefined && $scope.property.value == null)
    {
        console.log('$scope.property value is null ');
        $scope.property.value = '0';
    }

    $scope.voteruleChanged = function() {
        console.log('$scope.property voteruleChanged :'+$scope.property);
        $scope.updatePropertyInModel($scope.property);
    };
}];
