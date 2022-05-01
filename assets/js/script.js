var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".container");

var toDoEvents = [];

 
var todaysDate = moment().format("dddd, MMMM Do, YYYY");
var currentHour = moment().format("H");

$currentDay.text(todaysDate);

function initializeWorkDay(){

}