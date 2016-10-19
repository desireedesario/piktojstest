//upload an image
var submit = document.getElementById("submit");
submit.addEventListener("click", function(e){

  //GET input value
  var uploadInput = new UploadInput();
  var file = document.getElementById("upload").files[0];
  uploadInput.append("upload", file);

  //post a new XMLHTTPRequest
  
})
