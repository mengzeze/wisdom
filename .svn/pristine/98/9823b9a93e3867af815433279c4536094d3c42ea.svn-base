var relevancySelectSelectCtrl = [ '$scope', function($scope) {
    var options = [
      {"name":"无","value":"0"}
    ];

    // $scope.property.options = JSON.parse('[{"name":"无","value":"0"},{"name":"关联投票","value":"1"},{"name":"关联会议","value":"2"}]')
  // console.log(1111, $scope.property.value)
  var state = sessionStorage.getItem('vuex')
  var modulePerm = JSON.parse(state).modulePerm
  $scope.hasVote = modulePerm.indexOf('project_vote')>-1;
  $scope.hasMeeting = modulePerm.indexOf('project_meeting')>-1;

  if($scope.hasVote) {
    options.push({"name":"关联投票","value":"1"})
  }
  if($scope.hasMeeting){
    options.push({"name":"关联会议","value":"2"})
  }
  options.push({"name":"关联审批","value":"3"})

  $scope.property.options = options;
  if ($scope.property.value == undefined && $scope.property.value == null)
    {
        console.log('$scope.property value is null ');
        $scope.property.value = '0';
    }

    $scope.relevancySelectSelectChanged = function() {
        console.log('$scope.property relevancySelectSelectChanged :'+ JSON.stringify($scope.property));
        $scope.updatePropertyInModel($scope.property);
    };
}];
