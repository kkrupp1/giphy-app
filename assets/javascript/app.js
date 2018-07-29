var topics = ["Jim Halpert", "Dwight Schrute", "Pam Beesly", "Michael Scott", 'Ryan Howard', "Stanley Hudson", "David Wallace", "Darryl Philbin", "Toby Flenderson", "Andy Bernard"];
console.log(topics);
function renderButtons() {
    // Empty the buttons div
    $("#buttons").empty();
    // Looping through the array of characters
    for (var i = 0; i < topics.length; i++) {
        // Generate buttons for each topic in the array
        var a = $("<button>");
        // add some bootstrap stylin'
        a.addClass("btn btn-primary");
        // add the topics data name attribute (specifies the name of the gif)
        a.attr("data-name", topics[i]);
        // Gives the buttons text the string of it's respective index spot in the array
        a.text(topics[i]);
        // Adding the HTML button
        $("#buttons").append(a);
    }
}

renderButtons();

// jQuery on click method for calling the create Gif function
$(".btn").on("click", createGif);
$("gifs").empty();


// function for creating the gifs
function createGif() {
    // Stores the data-name attribute of newly created gifs
    event.preventDefault();
    var character = $(this).attr("data-name");
    // Make the button text the string of the index spot

    console.log(character);
    // Constructing the queryURL to be used in the AJAX call ---- limit to 10 results
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=RuCVjYuFpnCjVqiTM7ZjNT0POjLbUesB&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item (the new array of topics)
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var characterDiv = $("#gifs");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                var title = $("<p>").text("Title: " + results[i].title);
                // Creating and storing an image tag
                var characterImage = $("<img class='card-img-top' src=results>");
                var dataStill = results[i].images.fixed_height_still.url;
                var dataAnimate = results[i].images.fixed_height.url;
                // Setting the src attribute of the image to a property pulled off the result item
                characterImage.attr("src", dataStill);
                characterImage.attr("class", "displayGif img-fluid text-bold");
                characterImage.attr("alt", "Gif Not Downloading");
                characterImage.attr("data-state", "still");
                characterImage.attr("data-still", dataStill);
                characterImage.attr("data-animate", dataAnimate);
                // Appending the paragraph and image tag to the characterDiv

                // play and pause gifs
                characterDiv.prepend(characterImage);
                var gifBtn = $("<a href='" + dataStill + "' ></a>");

                characterDiv.append(gifBtn);
                $("#gifs").prepend(characterDiv);
                characterDiv.append(title);
                characterDiv.append(p);
            }
            $(".displayGif").on("click", changeState);
        });
}

function changeState() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

$("#add-character").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // Using a form allows the user to hit enter instead of having to click the add button
    event.preventDefault();
    // grab the text from the input box
    var character = $("#character-input").val().trim();
    console.log(character);
    // The topic from the textbox is then added to the array
    topics.push(character);
    console.log(topics);
    // calling renderButtons which handles the processing of the topics array
    renderButtons();
    $(".btn").on("click", createGif);
});




