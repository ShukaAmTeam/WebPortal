var ProductController = function ($scope) {
    //$scope.selectedProduct = $scope.models[0];

    $scope.models = {
        products: getProductsXHR()//[
        //                { Id: "1", Name: "Product 1", Description: "Description 1", CostPrice: 15, Price: 12, dataFilter: "" },
        //                { Id: "2", Name: "Product 2", Description: "Description 2", CostPrice: 15, Price: 12, dataFilter: ".color-1" },
        //                { Id: "3", Name: "Product 3", Description: "Description 3", CostPrice: 15, Price: 12, dataFilter: ".color-2" }
        //]
    };
    $scope.loopLoaded = function () {
        reloadStylesheets();
        //$scope.$broadcast('rebuild:me');
    }
};


function getProductsXHR() {
    var productType = { Name: "Product Type 1", DataFilter: "type1", Description: "Type 1 Description" };
    var products = [{ Id: "1", Name: "Product 1", Description: "Description 1", CostPrice: 15, Price: 12, dataFilter: "", ProductTypes: productType }];
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:6315/Home/GetProducts',
        data: "pageIndex=1&pageSize=12",
        dataType: 'json',
        success: function (result) {
            console.log("success:   " + result);
            products = result;
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
    return products;
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