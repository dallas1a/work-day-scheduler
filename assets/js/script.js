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
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }

    console.log(toDoItems);
}

function saveHandler() {
    var $thisBlock = $(this).parent();

    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();

   
    for (var j = 0; j < toDoItems.length; j++) {
        if (toDoItems[j].hour == hourToUpdate) {
           
            toDoItems[j].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}


function readyFn(jQuery) {

    
    
    
    if (!localStorage.getItem("todos")) {
        
        initializeWorkDay();
    } 
    setUpTimeBlocks();
    $currentDay.text(todaysDate);

    
    renderSchedule();
    
    $workScheduleHour.on("click", "button", saveHandler);

};


