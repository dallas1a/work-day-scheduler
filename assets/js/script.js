//sets initial jquery variables 
var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $workScheduleHour = $(".schedule");
//sets string for items to be done
var toDoItems = [];

//sets variables for todays date and hour using Moment.js
var todaysDate = moment().format("dddd, MMMM Do, YYYY");
var currentHour = moment().format("H");
//uses jquery to detect when the document is ready and calls readyFn function
$(document).ready(readyFn);
//sets currentDay's text to the output from Moment.js in the todaysDate var
$currentDay.text(todaysDate);

//initializes work day
function initializeWorkDay() {
    //creates a function for each time-block using the integer conversion 
    //from $thisBlock's data-hour attribute from the html
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlocksHour = parseInt($thisBlock.attr("data-hour"));
    //uses thisBlocksHour to set the Object to be done and outputs the 
    //text to add the Object to the items to be done
        var todoObj = {

            hour: thisBlocksHour,
            text: "",
        }

        toDoItems.push(todoObj);
    });

    //sets todos in local storage and stringifys the toDoItems array
    localStorage.setItem("todos", JSON.stringify(toDoItems));

}
// changes the color of the block to correspond to hour being in the present, past, or future.
//changes color by adding a style class for the correct time period and removes any style class 
//for the incorrect period
function colorChangeBlocks() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlocksHour = parseInt($thisBlock.attr("data-hour"));

        if (thisBlocksHour == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlocksHour < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlocksHour > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }

    });
}
//collects info from local storage
function collectInfo() {
    //sets toDoItems based on local storage
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

//if the length of the var i is less than the length of the array add info to that data-hours text area
    for (var i = 0; i < toDoItems.length; i++) {
        var infoHour = toDoItems[i].hour;
        var infoText = toDoItems[i].text;

        $("[data-hour=" + infoHour + "]").children("textarea").val(infoText);
    }

    console.log(toDoItems);
}
//saves the row chosen to local storage by string toDoItems and then calls collectInfo()
function saveEventLocal() {
   var $thisBlock = $(this).parent();
    //sets parent attribute to data-hour and adds its childs value to textarea
        var hourToUpdate = $(this).parent().attr("data-hour");
        var itemToAdd = (($(this).parent()).children("textarea")).val();

// if the value of j is less than to toDoItems length, it adds to the string to save if the time-block needs to be updated 
        for (var j = 0; j < toDoItems.length; j++) {
            if (toDoItems[j].hour == hourToUpdate) {

                toDoItems[j].text = itemToAdd;
            }
        }
        //sets todos in local storage and stringifys the toDoItems array
        localStorage.setItem("todos", JSON.stringify(toDoItems));
        collectInfo();

}

//if document is ready it starts this function
function readyFn(jQuery) {
    //calls the colorChangeBlocksFunction 
    colorChangeBlocks();
    //if there is an item in local storage it gets item and calls initializeWorkDay function
    if (!localStorage.getItem("todos")) {

        initializeWorkDay();

    }
    //calls collectInfo to check for saved data in local storage for each time-block 
    collectInfo();
    

   //on the click of the button it saves the event info for the corresponding hour
    $workScheduleHour.on("click", "button", saveEventLocal);
};






