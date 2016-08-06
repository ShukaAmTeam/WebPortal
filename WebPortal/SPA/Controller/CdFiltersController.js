var CdFiltersController = function ($scope) {
    $scope.models = {
        filters: [
                        { id: "1", filter: "All", dataType: "All", dataFilter: "" },
                        { id: "2", filter: "color-1", dataType: "color-1", dataFilter: ".color-1"},
                        { id: "3", filter: "color-2", dataType: "color-2", dataFilter: ".color-2" }
        ]
    };
    $scope.selectedFilter = $scope.models.filters[0];

    $scope.changeFilter = function (f) {
        $scope.selectedFilter = f;
    }
}

CdFiltersController.$inject = ['$scope'];