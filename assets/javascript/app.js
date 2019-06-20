var cast = [
    "charlie day",
    "glenn howerton",
    "kaitlin olson",
    "danny deVito",
    "rob mcelhenney",
];

// Function & FOR statement
function actorButtons() {
    $(".button-display").empty();
    for (var i = 0; i < cast.length; i++) {
        var a = $("<button>");
        a.addClass("clicker btn btn-primary");
        a.attr("data-name", cast[i]);
        a.text(cast[i]);
        $(".button-display").append(a);
        console.log('cast array =' + cast + '-');
    }
}
actorButtons();

$("body").on("click", '#add-cast', function (event) {
    event.preventDefault();
    var cast = $("#cast-input").val().trim();
    if (cast == '') {
        alert("Can't think of a cast members name? Look the show up on IMDB! Duh")
    }
    else {
        cast.push(cast);
        console.log('cast array =' + cast + '-');
        $("#cast-input").val('')
        actorButtons();
    }
});

$("body").on("click", '.clicker', function () {
    var cast = $(this).attr("data-name");
    console.log("data-name -" + cast + "-");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        cast + "&api_key=HOprz5l7jUrRAPyxBvYZY9IYfL8Bkjw1&limit=10";
    console.log("query -" + queryURL + "-");
    $.ajax({
        url: queryURL, method: "GET"
    })
        .done(function (response) {
            var results = response.data;
            console.log(response);
            $('#images').empty();

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $('<p>').append('<span class="label label-lg label-info"> Rating: <span class="badge">' + rating + '</span></span>');

                //had to look up how to do this part. 
                var castImage = $("<img class='img-thumbnail'>");
                var castUrl = results[i].images.fixed_height.url;
                var castStill = results[i].images.fixed_height_still.url;
                castImage.attr({
                    src: castStill,
                    'data-still': castStill,
                    'data-animate': castUrl,
                    'data-state': "still"
                });
                //
                gifDiv.prepend(p);
                gifDiv.prepend(castImage);
                $("#images").prepend(gifDiv);
            };
        });
});

$("body").on("click", '.img-thumbnail', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});