var ProductController = function ($scope) {
    //$scope.selectedProduct = $scope.models[0];

    $scope.models = {
        products: getAllProductsXHR()
    };
    $scope.Name = function () { return "fsdfs" };
    $scope.loopLoaded = function () {
        reloadStylesheets();
        //$scope.$broadcast('rebuild:me');
    }

    // Register event handler
    $scope.$on('endlessScroll:next', function () {
        // Determine which page to load
        var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

        // Load page
        load(page);
    });
};

Products = [];
function getProductsXHR() {
    var productType = { Name: "Product Type 1", DataFilter: "type1", Description: "Type 1 Description" };
    var products = [{ Id: 1, Name: "Product 1", Description: "Description 1", CostPrice: 15, Price: 12, ImageUrls: ["/img/content-filter/img-1.jpg"], dataFilter: "", ProductTypes: productType }];
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:6315/api/Products',
        data: "pageIndex=0&pageSize=12",
        dataType: 'json',
        success: function (result) {
            console.log("success:   " + result);
            products = result;
            Products = products;
        },
        //success: function (result, status, xhr) {
        //    console.log("success:   " + result);
        //    return result;
        //},
        error: function (xhr, status, error) {
            console.log("xhr:   " + xhr);
            console.log("status:   " + status);
            console.log("error:   " + error);
            alert('Error! </br> see error details in console.');
        }
    });
    return products;
}

function getAllProductsXHR() {
    var productType = { Name: "Product Type 1", DataFilter: "type1", Description: "Type 1 Description" };
    var products = [{ Id: 1, Name: "Product 1", Description: "Description 1", CostPrice: 15, Price: 12, ImageUrls: ["/img/content-filter/img-1.jpg"], dataFilter: "", ProductTypes: productType }];
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:6315/api/Products',
        data: "",
        dataType: 'json',
        success: function (result) {
            console.log("success:   " + result);
            products = result;
            Products = products;
        },
        //success: function (result, status, xhr) {
        //    console.log("success:   " + result);
        //    return result;
        //},
        error: function (xhr, status, error) {
            console.log("xhr:   " + xhr);
            console.log("status:   " + status);
            console.log("error:   " + error);
            alert('Error! </br> see error details in console.');
        }
    });
    return products;
}


// Define a method to load a page of data
function load(page) {
    var params = { page: page },
        isTerminal = $scope.pagination &&
                     $scope.pagination.current_page >= $scope.pagination.total_pages &&
                     $scope.pagination.current_page <= 1;

    // Determine if there is a need to load a new page
    if (!isTerminal) {
        // Flag loading as started
        $scope.loading = true;

        // Make an API request
        $http.get('http://localhost:6315/Home/GetProducts', params)
          .success(function (data, status, headers) {
              // Parse pagination data from the response header
              $scope.pagination = angular.fromJson(headers('x-pagination'));

              // Create an array if not already created
              $scope.items = $scope.items || [];

              // Append new items (or prepend if loading previous pages)
              $scope.items.push.apply($scope.items, data);
          })
          .finally(function () {
              // Flag loading as complete
              $scope.loading = false;
          });
    }
}

/**
 * Forces a reload of all stylesheets by appending a unique query string
 * to each stylesheet URL.
 */
function reloadStylesheets() {
    var queryString = '?reload=' + new Date().getTime();
    $('link[rel="stylesheet"]').each(function () {
        //this.href = this.href.replace(/\?.*|$/, queryString);
    });
}

ProductController.$inject = ['$scope'];