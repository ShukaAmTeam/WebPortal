var ChBFiltersController = function ($scope) {
    $scope.models = {
        filters: getProductTypesXHR()
    };
    $scope.selectedFilter = $scope.models.filters[0];

    $scope.changeFilter = function (f) {
        $scope.selectedFilter = f;
    }
};

function getProductTypesXHR() {
    var productTypes = [{ Id: "1", Name: "Type 1", DataFilter: "type1", Description: "Type 1 Description" }];
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:6315/api/Products/Types',
        data: "pageIndex=1&pageSize=12",
        dataType: 'json',
        success: function (result) {
            console.log("success:   " + result);
            productTypes = result;
        },
        //success: function (result, status, xhr) {
        //    console.log("success:   " + result);
        //    return result;
        //},
        error: function (xhr, status, error) {
            console.log("xhr:   " + xhr);
            console.log("status:   " + status);
            console.log("error:   " + error);
            alert('Error! </br> see error details in console.')
        }
    });
    return productTypes;
};

ChBFiltersController.$inject = ['$scope'];