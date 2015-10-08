var dashboard = angular.module('dashboard', []);

dashboard.controller('tabCtrl', function($scope) {
    var tabClasses;
    $scope.dashboardHidden = false;
    $scope.dashboardButton = "<";
    $scope.templates = [{
        "name": "Stock Market",
        "url": 'views/stock-app.html'
    }, {
        "name": "Chat Application",
        "url": 'views/chat-app.html'
    }];

    function initTabs() {
        tabClasses = ["", "", "", ""];
        $scope.currentTab = $scope.templates[0];
    }

    $scope.toggleDashboard = function() {
        $scope.dashboardHidden = !$scope.dashboardHidden;
        $scope.dashboardButton = $scope.dashboardButton == ">" ? "<" : ">";
    }

    $scope.getTabClass = function(tabNum) {
        return tabClasses[tabNum];
    };

    $scope.setActiveTab = function(tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
        $scope.currentTab = $scope.templates[tabNum];
    };

    //Initialize 
    initTabs();
    $scope.setActiveTab(0);
});

dashboard.factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
