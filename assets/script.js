// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    
   // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

    $(".saveBtn").on("click", function() {
        // Get the id of the parent time-block
        var timeBlockId = $(this).parent().attr("id");

        // Get the user input from textarea
        var userInput = $(this).siblings(".description").val();

        // Save the user input in local storage using the time block id as the key
        localStorage.setItem(timeBlockId, userInput);
    });

    // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // Get the current hour using Day.js
    var currentHour = dayjs().format("H");

    // Loop through each time block
    $(".time-block").each(function () {
        // Get the hour from the time-block id
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

        //Compare the time block hour with the current hour
        if (timeBlockHour < currentHour) {
            // Past time block
            $(this).removeClass("present future").addClass("past");
        } else if (timeBlockHour == currentHour) {
            // Present time block
            $(this).removeClass("past future").addClass("present");
        } else {
            // Future time block
            $(this).removeClass("past present").addClass("future");
        }
    });
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //

    //  Loop through each time block
    $(".time-block").each(function () {
        // Get the time block id
        var timeBlockId = $(this).attr("id");
        // Get the user input from local storage using the time block id as the key
        var userInput = localStorage.getItem(timeBlockId);
        // Set the textarea value with the retrieved user input
        $(this).find("description").val(userInput);
    });
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    function displayCurrentDate() {
        var currentDate = new Date();
        var dateElement = document.getElementById("currentDay");
        dateElement.textContent = currentDate.toDateString();
      };
  });