// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    $(".saveBtn").on("click", function() {
        // Get the id of the parent time-block
        var timeBlockId = $(this).parent().attr("id");

        // Get the user input from textarea
        var userInput = $(this).siblings(".description").val();

        // Save the user input in local storage using the time block id as the key
        localStorage.setItem(timeBlockId, userInput);
    });

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

    //  Loop through each time block
    $(".time-block").each(function () {

        // Get the time block id
        var timeBlockId = $(this).attr("id");

        // Get the user input from local storage using the time block id as the key
        var userInput = localStorage.getItem(timeBlockId);
        
        // Set the textarea value with the retrieved user input
        $(this).find(".description").val(userInput);
    });

    function displayCurrentDate() {
        var currentDate = new Date();
        var dateElement = document.getElementById("currentDay");

        //Set the Date
        dateElement.textContent = currentDate.toDateString();
      };

      displayCurrentDate();

      function displayCurrentTime() {
        var currentTimeElement = document.getElementById("currentTime");
      
        setInterval(function() {
            var currentDate = new Date();
            var hours = currentDate.getHours();
            var period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            var minutes = String(currentDate.getMinutes()).padStart(2, "0");
            var seconds = String(currentDate.getSeconds()).padStart(2, "0");
            var currentTime = hours + ":" + minutes + ":" + seconds + " " + period;
      
          currentTimeElement.textContent = currentTime;
        }, 1000); // Update every 1 second
      }
      
      // Call the function to display the current time
      displayCurrentTime();
      
  });