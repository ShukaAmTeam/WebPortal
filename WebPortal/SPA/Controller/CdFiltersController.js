var CdFiltersController = function ($scope) {
    $scope.models = {
        filters: [
                        { id: "1", filter: "All", dataType: "All",classS:"selected" },
                        { id: "2", filter: "color-1", dataType: "color-1", classS: "selected" },
                        { id: "3", filter: "color-2", dataType: "color-2", classS: "selected" }
        ]
    };
    $scope.selectedFilter = $scope.models.filters[0];

    $scope.changeFilter = function (f) {
        $scope.selectedFilter = f;
    }
}

CdFiltersController.$inject = ['$scope'];