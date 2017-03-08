'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {



$('#signInButton').click(function(e){
	e.preventDefault();
	window.location.href = '/home';
})

//add new chores
$('#newChoreSubmitButton').click(function(e){
	console.log("clicked");
	var choreTitle = $('#new-chore-form #choreTitle').val();
	var expectedTime = $('#new-chore-form #expectedTime').val();
	var imageURL = $('#new-chore-form #imageURL').val();

	var json = {
		'choreTitle': choreTitle,
		"expectedTime": expectedTime,
		"image": imageURL
	}
	$.post('/chores/new', json, function(){
		window.location.href = '/chores';
	});
	ga("send", "event", "newAddedChore", "Click");
});

// delete Chores
$(".chore-delete").click(function(e){
	e.preventDefault();

	var choreID = $(this).closest('.panel-default').attr('id');

	$.post('/chores/'+choreID+'/delete', function() {
		window.location.href = '/chores';
	});

})


//Remix with W3Schools
var new_model_html; 
var theID;	
// $.get(url_model_call, addModel);
// adding modal to each Thought cloud for emoticomment
function addModal(emoticomments_json){
	var lengthOf = $('.panel-default:nth-child(n)').length;
	for(var i=1;i<=lengthOf;i++){
		new_model_html='<div><img id="myBtn'+i+'" width=40 src="../images/thought.svg" style="cursor: pointer; cursor: hand; margin: auto; display: inline-block; margin-left: 20px;"/></div>'+
		'<div id="myModal'+i+'" class="modal">'+
		'<div class="modal-content">'+
		'<div class="modal-header">'+
		'<span class="close">&times;</span>'+
		'<h2 class="text-center">Choose an EmotiComment</h2>'+
		'</div>'+
		'<div class="modal-body">'+
		'<a href="#" class="emocom">'+emoticomments_json+'</a>'+
		'</div>'+
		
		'<div class="modal-footer">'+
		'<h3></h3>'+
		'</div>'+
		'</div>'+

		'</div>';

		theID = $('.panel-default:nth-child('+i+')');
		theID.find(".panel-heading").after().append(new_model_html);


		var modal = document.getElementById('myModal'+i+'');

// Get the button that opens the modal
var btn = document.getElementById("myBtn"+i+"");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function(e) {
	e.preventDefault();
	modal.style.display = "block";
	ga("send", "event", "emotiComment", "click");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
}

}
$.get('/emoticomments', addModal);



// create modal for emoticomment on Chore B

var modal = document.getElementById('commentModal');

// Get the button that opens the modal
var btn = document.getElementById("commentBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function(e) {
	e.preventDefault();
	modal.style.display = "block";
	ga("send", "event", "emotiComment", "click");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}



$("#choresBImages #commentButton").click(function(e){
	e.preventDefault();
	alert('Sent emoticomment response');
	ga("send", "event", "emotiComment", "click");
})
}



