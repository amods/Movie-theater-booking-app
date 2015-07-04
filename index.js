var theatreapp = angular.module("theatre", [])
    .controller("baseController", ["$scope", "$rootScope", function ($scope, $rootScope) {
        /*Variable initialization*/
        $scope.users = [], $scope.userName = "", $scope.totalBookedSeats = 0, $scope.noOfSeats = 0, $scope.useractive = false, $scope.blockedSeats = [], $scope.rowChars = ["A","B","C","D","E","F","G","H","I","J"];
        /*Master data object to hold the grid data*/
        $scope.gridDataObj = [
            { 0: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 1: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 2: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 3: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 4: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 5: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 6: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 7: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 8: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] },
            { 9: [{ checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }, { checked: false, full : false }] }
        ];
        /*Function handler to handle the start selection button tap*/
        $scope.startSelecting = function () {
            if ($scope.userName !== "" && $scope.noOfSeats > 0) {
                /*Check if the seats are available*/
                if ($scope.noOfSeats > (120 - $scope.totalBookedSeats)) { window.alert("Selected number of seats are not available! "); return; }
                /*Save the user data*/
                $scope.users.push({ name: $scope.userName, seatsRequired: $scope.noOfSeats, bookedseats:"" });
                $scope.useractive = true;
            }
        }
        /*Function handler to handle the seat grid click event*/
        $scope.checkThis = function (index, column) {
            /*Check if user has entered details*/
            if ($scope.useractive) {
                if (!$scope.gridDataObj[index][index][column].full) { /*Check if already booked*/
                    if ($scope.gridDataObj[index][index][column].checked) { /*Uncheck an already check seat*/
                        $scope.gridDataObj[index][index][column].checked = false;
                        for (var i = 0; i < $scope.blockedSeats.length; i++) {
                            if ($scope.blockedSeats[i].row == index && $scope.blockedSeats[i].col == column)
                                $scope.blockedSeats.splice(i, 1);
                        }
                    }
                    else {/*select an empty seat*/
                        $scope.gridDataObj[index][index][column].checked = true;
                        $scope.blockedSeats.push({ row: index, col: column });
                    }                                        
                }
            }
            else {
                window.alert("Please enter user details before selecting seats !")
            }
        }
        /**Function handler to handle the confirm the seat selection event*/
        $scope.confirmSelection = function () {
            if ($scope.useractive) { /*User detail check*/
                if ($scope.blockedSeats.length === $scope.noOfSeats) { /*Check for the exact number of seats which was entered during registration*/
                    var temp, seatsStr = "";
                    for (var j = 0, len = $scope.blockedSeats.length; j < len; j++) {
                        var thisRow = $scope.blockedSeats[j].row;
                        var thisCol = $scope.blockedSeats[j].col;
                        $scope.gridDataObj[thisRow][thisRow][thisCol].full = true; /*Mark the seat as booked*/
                        seatsStr += $scope.rowChars[thisRow]; /*Build the seat number string*/
                        seatsStr += (thisCol + 1) + ", ";
                        if (j == len - 1) {
                            seatsStr = seatsStr.slice(0, -2); /*remove last comma*/
                        }
                    }
                    temp = $scope.users.pop();
                    temp.bookedseats = seatsStr; /*Map the seat number array to the current user*/
                    $scope.users.push(temp);
                    $scope.totalBookedSeats += $scope.noOfSeats; /*Update the booked seat count*/
                    /*Clear the session specific data*/
                    $scope.useractive = false;
                    $scope.blockedSeats = [];
                    $scope.userName = "";
                    $scope.noOfSeats = 0;
                
                }
                else {
                    window.alert("Please select mentioned number of seats before proceeding")
                }
            }
            else {
                window.alert("Please enter user details before procceding !");
            }
        }
    }]);