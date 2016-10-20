// function to upload an image
var submit = document.getElementById("submit");
submit.addEventListener("click", function(e) {
    // get input value
    var formData = new FormData();
    var file = document.getElementById("upload").files[0];
    formData.append("upload", file);

    // create new XMLHttpRequest object for AJAX
    var xhr = new XMLHttpRequest();

    // set AJAX method & URL
    xhr.open("post", "/uploads", true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);

			// append new uploaded image into listImages
			var ul = document.getElementById("listImages");
			var li = document.createElement("li");
			li.innerHTML = "<img src=\"" + response.file + "\" class=\"img-rounded block-add\" />";
			ul.appendChild(li);
            // return true;
        }
        else {
        	console.log(xhr.responseText);
        	// return false;
        }
    }

	xhr.send(formData);
}, false);

var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    console.log(selected);
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
	console.log("move elem");
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

window.onload = function() {
	/*
	 * Load list of images on window load
	 */

	// create new XMLHttpRequest object for AJAX
	var xhr = new XMLHttpRequest();

	// set AJAX method & URL
	xhr.open("get", "/images", true);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			// get AJAX json response text and parse into array
            var obj = JSON.parse(xhr.responseText);

            // get ul element with id listImages
            var ul = document.getElementById("listImages");
            for(var i = 0; i < obj.length; i++) {
            	// create new li
            	var li = document.createElement("li");

            	// insert img with src and class
            	li.innerHTML = "<img src=\"" + obj[i] + "\" class=\"img-rounded img-add\" onclick=\"addImages(this);\" />";

            	// append as ul children
            	ul.appendChild(li);
            }
        }
        else {
        }
	}
	xhr.send(null);
	return false;
}

function addImages(elem) {
	var src = elem.getAttribute("src");
	var newElem = document.createElement("div");
	newElem.className = "container draggable";
	newElem.innerHTML = "<img src=\"" + src + "\" class=\"img-blocks img-rounded\" onmousedown=\"_drag_init(this);\" height=\"50\" width=\"50\" />";
	var container = document.getElementById("block");
	container.appendChild(newElem);

	return false;
}

document.onmousemove = _move_elem;
document.onmouseup = _destroy;
