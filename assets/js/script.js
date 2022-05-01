var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".container");

var toDoEvents = [];

 
var currentFullDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function 