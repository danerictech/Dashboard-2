var dashboard = angular.module('dashboard', []);

dashboard.controller('tabCtrl', function($scope) {
    var tabClasses;
    $scope.dashboardHidden = false;
    $scope.dashboardButton = "<";

    function initTabs() {
        tabClasses = ["", "", "", ""];
    }

    $scope.toggleDashboard = function() {
        $scope.dashboardHidden = !$scope.dashboardHidden;
        $scope.dashboardButton = $scope.dashboardButton == ">" ? "<" : ">";
    }

    $scope.getTabClass = function(tabNum) {
        return tabClasses[tabNum];
    };

    $scope.getTabPaneClass = function(tabNum) {
        return "tab-pane " + tabClasses[tabNum];
    }

    $scope.setActiveTab = function(tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
    };

    $scope.tab1 = "This is first section";
    $scope.tab2 = "This is SECOND section";
    $scope.tab3 = "This is THIRD section";
    $scope.tab4 = "This is FOUTRH section";

    //Initialize 
    initTabs();
    $scope.setActiveTab(1);
});
