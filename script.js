//upload an image
var submit = document.getElementById("submit");
submit.addEventListener("click", function(e){

  //GET input value
  var uploadInput = new UploadInput();
  var file = document.getElementById("upload").files[0];
  uploadInput.append("upload", file);

  //post new XMLHttpRequest
  var newRequest = new XMLHttpRequest();

  // set AJAX method & URL
  newRequest.open("post", "/uploads", true);

  newRequest.onreadystatechange = function() {
    if(newRequest.readyState == 4 && newRequest.status == 200) {
      var response = JSON.parse(newRequest.responseText);

    // append new uploaded image into listImages
    var ul = document.getElementById("listImages");
    var li = document.createElement("li");
    li.innerHTML = "<img src=\"" + response.file + "\" class=\"img-rounded img-add\" />";
    ul.appendChild(li);

    // re-initialize draggable for newly added elements to DOM
    $(".img-add").draggable({ revert: "invalid" });
      // return true;
  } else {
    console.log(newRequest.responseText);
    // return false;
    }
  };

  newRequest.send(Data);
}, false);

window.onload = function() {
  //Load list of images on window load

  // create new XMLHttpRequest object for AJAX
  var newRequest = new XMLHttpRequest();

  // set AJAX method & URL
  newRequest.open("get", "/images", true);

  newRequest.onreadystatechange = function() {
  if(newRequest.readyState == 4 && newRequest.status == 200) {
    // get AJAX json response text and parse into array
    var obj = JSON.parse(newRequest.responseText);

    // get ul element with id listImages
    var ul = document.getElementById("listImages");
    for(var i = 0; i < obj.length; i++) {
      // create new li
      var li = document.createElement("li");

      // insert img with src and class
      li.innerHTML = "<img src=\"" + obj[i] + "\" class=\"img-rounded img-add\" />";

      // append as ul children
      ul.appendChild(li);

        // re-initialize draggable for newly added elements to DOM
        $(".img-add").draggable({ revert: "invalid" });
      }
    } else {
  }
  }
  newRequest.send(null);
  return false;
}

$(document).ready(function() {
// this function is to add image into div canvas by clicking on it
$(document).on("click", ".img-add", function(e) {
    var src = $(this).attr("src");
    var elem = $("<div class=\"container draggable\"><img src=\"" + src + "\" class=\"img-blocks\" height=\"50\" width=\"50\" /></div>");
    $(".block").append(elem);
    elem.draggable({
      containment	: ".block",
      scroll		: false
    });
    elem.find(".img-blocks:first").resizable();
    return false;
});

// this function is to remove image from div canvas by clicking on it
$(document).on("click", ".img-blocks", function(e){
  $(this).remove();
  return false;
});

// add img with img-add class is draggable into div canvas
$(".img-add").each(function(i, el) {
  $(el).draggable({
    revert: "invalid"
  });
});

// set div block as a droppable
$(".block").droppable();

// function to add dynamic text into div canvas
$(document).on("click", "#addText", function(e) {
  var input = $("<input type=\"text\" name=\"name[]\" class=\"input\" value=\"\" placeholder=\"hello world\" />");
  $(".block").append(input);
  input.focus();

  // initialize change input text into real text when clicking enter
  changeInputIntoText(input);
});

// when user click on text make it editable by change into input tag
editText(".input");
});

function changeInputIntoText(elem) {
$(elem).on("keypress", function(e) {
if(e.which == 13) {
  if($(elem).val() == "") {
    // if input is empty then remove text
    $(elem).remove();
  }
  else {
    // if input is not empty make it text inside span tag
    var text = $("<div class=\"text\"><span class=\"input\">" + $(elem).val() + "</span></div>");
    $(elem).replaceWith(text);

    // make text draggable
    text.draggable({
          containment	: ".block",
          scroll		: false
        });
  }
  // enable edit text when span is clicked
  editText(".input");
}
});
}

function editText(selector) {
// loop through all text inside div canvas
$(selector).each(function(i, el) {
// when span is clicked, then change it into input text for user to edit text
$(el).on("click", function(e) {
  var input = $("<input type=\"text\" name=\"name[]\" class=\"input\" value=\"" + $(el).html() + "\" placeholder=\"hello world\" />");
  $(el).replaceWith(input);
  input.focus();

  // re-initialize this function, so when user press "Enter" input will change into text
  changeInputIntoText(input);
});
});
};
