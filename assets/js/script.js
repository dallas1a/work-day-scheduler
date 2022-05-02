var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $workScheduleHour = $(".schedule");
var toDoItems = [];


var todaysDate = moment().format("dddd, MMMM Do, YYYY");
var currentHour = moment().format("H");

$(document).ready(readyFn);
$currentDay.text(todaysDate);

function initializeWorkDay() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlocksHour = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {

            hour: thisBlocksHour,
            text: "",
        }

        toDoItems.push(todoObj);
    });


    localStorage.setItem("todos", JSON.stringify(toDoItems));

}
function setUpTimeBlocks() {
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

function collectInfo() {

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);


    for (var i = 0; i < toDoItems.length; i++) {
        var infoHour = toDoItems[i].hour;
        var infoText = toDoItems[i].text;

        $("[data-hour=" + infoHour + "]").children("textarea").val(infoText);
    }

    console.log(toDoItems);
}

function saveEventLocal() {
   
    
        var hourToUpdate = $(this).parent().attr("data-hour");
        var itemToAdd = (($(this).parent()).children("textarea")).val();


        for (var j = 0; j < toDoItems.length; j++) {
            if (toDoItems[j].hour == hourToUpdate) {

                toDoItems[j].text = itemToAdd;
            }
        }
        localStorage.setItem("todos", JSON.stringify(toDoItems));
        collectInfo();

}


function readyFn(jQuery) {
    collectInfo();
    setUpTimeBlocks();
    
    if (!localStorage.getItem("todos")) {

        initializeWorkDay();

    }
    
    

    $currentDay.text(todaysDate);
    $workScheduleHour.on("click", "button", saveEventLocal);
};








