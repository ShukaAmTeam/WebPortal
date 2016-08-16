var CdGalleryController = function ($scope) {
    $scope.models = {
        products: [
                        {
                            id: "1", img: "img-1.jpg", alt: "Image 1",
                            color: "color-1", check: "check1", radio: "radio1", option: "option1"
                        },
                        {
                            id: "2", img: "img-2.jpg", alt: "Image 2",
                            color: "color-1", check: "check1", radio: "radio1", option: "option2"
                        },
                        {
                            id: "3", img: "img-3.jpg", alt: "Image 3",
                            color: "color-3", check: "check3", radio: "radio3", option: "option3"
                        },
                          {
                              id: "4", img: "img-4.jpg", alt: "Image 4",
                              color: "color-3", check: "check3", radio: "radio4", option: "option3"
                          }

        ]
    };
    $scope.selectedProduct = $scope.models.products[0];

    $scope.changeProduct = function (f) {
        $scope.selectedProduct = f;
    }
}

CdGalleryController.$inject = ['$scope'];