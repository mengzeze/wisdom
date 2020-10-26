
var KisBpmMultiInstanceSelectCtrl = [ '$scope', function($scope) {

    $scope.property.options = JSON.parse('[{"name":"会签","value":"1"},{"name":"或签","value":"2"}]')

    if ($scope.property.value == undefined && $scope.property.value == null)
    {
        console.log('$scope.property value is null ');
        $scope.property.value = '1';
    }

    $scope.multiInstanceSelectChanged = function() {
        console.log('$scope.property multiInstanceSelectChanged :', $scope.property);
        $scope.updatePropertyInModel($scope.property);
    };
}];

