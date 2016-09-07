var app = angular.module("contactApp", []);
app.controller("appController", function($scope, $http) {
    var refresh = function() {
        $http.get("/getContacts").success(function(response) {
            console.log("Received the Response.", response);
            $scope.contacts = response;
            $scope.contact = "";
        });
    };
    
    refresh();
    
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post("/addContact", $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };
    
    $scope.deleteContact = function(id) {
        console.log(id);
        $http.delete("/deleteContact/" + id).success(function(response) {
            console.log(response);
            refresh();
        });
    };
    
    $scope.editContact = function(id) {
        console.log(id);
        $http.get("/getContact/" + id).success(function(response) {
            console.log(response);
            $scope.contact = response[0];
        });
    };
    
    $scope.updateContact = function() {
        console.log($scope.contact);
        $http.post("/updateContact", $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };
    
    $scope.clear = function() {
       $scope.contact = "";
    };
});