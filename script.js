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
