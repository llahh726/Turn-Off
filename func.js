var notes = [];

window.onload = function(){
    geoFindMe();
    displayNotes();
};

function geoFindMe() {
  var output = document.getElementById("postits");


  /*function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log(position);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }*/

  output.innerHTML = "<p>Locating…</p>";

  //navigator.geolocation.getCurrentPosition(success, error);

  console.log("executing");

  if (true) {
    navigator.geolocation.getCurrentPosition(
            function(position) {
                // Get current cordinates.
                positionCords = {"lat": position.coords.latitude, "lng": position.coords.longitude};
                console.log(positionCords);
            },
            function(error) {
                // On error code..
                console.log("ASDDDDDDDDDdd");
                output.innerHtml = "Some error";
            },
            {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
    );
    console.log("inside");  
    }
    console.log("executed");
}

function add()
{
    notes = JSON.parse(localStorage.notes);
    var note = {
        text: $('#notetext')[0].value,
    }

    notes.push(note);


    // set text field to empty
    $('#notetext')[0].value = "";

    localStorage.notes = JSON.stringify(notes);


    displayNotes();
}

function displayNotes() { //creates the html elements to show the notes


    if ("notes" in localStorage){
        notes = JSON.parse(localStorage.notes);
    }
    else{
        notes = [];
        localStorage.notes = JSON.stringify(notes);
    }
   
    var notesHtml = "";
    for (var i=0; i<notes.length; i++) {
        notesHtml += '<div class="sticker" ' + 'data-index="' + i + '">';
        notesHtml += '<p>' + notes[i].text + '</p>';
        notesHtml += '<input type="submit" class="removebtn" value="Remove" data-index= "' + i + '"">';
        notesHtml += "</div>";
    }

    $("#postits").empty().append(notesHtml);

    $(".removebtn").click(function() { 
    removeNote($(this).attr("data-index"))
    });
    
}

// removes note by index
function removeNote(index){

    notes.splice(index, 1);

    localStorage.notes = JSON.stringify(notes);

    displayNotes(); 
}