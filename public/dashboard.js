var dashboard = angular.module('dashboard', []);

dashboard.factory('socketFactory', function($rootScope) {
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

dashboard.controller('tabCtrl', function($scope, socketFactory) {
    var tabClasses;
    $scope.socketIO = socketFactory;
    $scope.dashboardHidden = true;
    $scope.dashboardButton = ">";
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
        $scope.initiateSocketStockData();
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

    $scope.initiateSocketStockData = function() {
        // var socket = io.connect();
        $scope.socketIO.emit('ready');
        $scope.socketIO.on('msg', function(data) {
            $scope.parsedStockData = angular.fromJson(data.msg);
            // $('#msg').text(data.msg);
        });
    };

    //Initialize 
    initTabs();
    $scope.setActiveTab(0);
});


