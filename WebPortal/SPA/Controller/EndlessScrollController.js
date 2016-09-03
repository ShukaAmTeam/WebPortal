angular.module('App', ['dc.endlessScroll'])
  .controller('Main', function ($scope, $http, $routeParams) {
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

      // Register event handler
      $scope.$on('endlessScroll:next', function () {
          // Determine which page to load
          var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

          // Load page
          load(page);
      });

      // Load initial page (first page or from query param)
      load($routeParams.page ? parseInt($routeParams.page, 10) : 1);
  });