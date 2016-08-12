var ChBFiltersController = function ($scope) {
    $scope.models = {
        filters: [
                        { id: "1", filter: "Option 1", dataFilter: ".check1" },
                        { id: "2", filter: "Option 2", dataFilter: ".check2" },
                        { id: "3", filter: "Option 3", dataFilter: ".check3" }
        ]
    };
    $scope.selectedFilter = $scope.models.filters[0];

    $scope.changeFilter = function (f) {
        $scope.selectedFilter = f;
    }
}

ChBFiltersController.$inject = ['$scope'];