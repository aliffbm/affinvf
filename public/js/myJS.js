	'use strict';


	// Call this function when the page loads (the "ready" event)
	$(document).ready(function() {
		initializePage();
	})

	/*
	 * Function that is called when the document is ready.
	 */
	 function initializePage() {


	  $.get('/login', function(data){
	 	console.log(data[0].name);
	 	$("nav li a#home").attr("href", '/home/'+data[0].name+'');	
	 	})

	$("#switchRegister").click(function(e){
		e.preventDefault();
		$("#register").slideDown();
		$("#sign-in").slideUp();
		
	})	

	$("#switchLogin").click(function(e){
		e.preventDefault();
		$("#sign-in").slideDown();
		$("#register").slideUp();
	})	

	 $("#complete_chore_btn").click(function(e){
	 	$("#complete_chore_btn img").attr('src', "../images/svg/checkMarkDone.svg");
	 })
	//add new chores
	$('#newChoreSubmitButton').click(function(e){
		var choreTitle = $('#new-chore-form #choreTitle').val();
		var expectedTime = $('#new-chore-form #expectedTime').val();
		var imageURL = $('#new-chore-form #imageURL').val();

		var json = {
			'choreTitle': choreTitle,
			"expectedTime": expectedTime,
			"image": imageURL
		}
		$.post('/chores/new', json, function(){
			window.location.href = window.location.href;
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

			var ht = "";
			var lengthOFe = emoticomments_json.length;
			
			for(var i=0;i< lengthOFe;i++){
			 ht += '<img class="emotiImage" value="'+emoticomments_json[i].name+'" id="eeMs'+i+'" width=50 src="'+emoticomments_json[i].image+'">';
			
			/* $.get('/emoticomments/addHit', function(){
			 	res.send("Hit sent");
			 })*/
			}
		
			
			for(var i=1;i<=lengthOf;i++){
				new_model_html='<div><img id="myBtn'+i+'" width=40 src="../images/thought.svg" style="cursor: pointer; cursor: hand; margin: auto; display: inline-block; margin-left: 20px;"/></div>'+
				'<div id="myModal'+i+'" class="modal">'+
				'<div class="modal-content">'+
				'<div class="modal-header">'+
				'<span class="close">&times;</span>'+
				'<h2 class="text-center">Choose an EmotiComment</h2>'+
				'</div>'+
				'<div class="modal-body">'+
				ht+
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
					console.log(modal);
					modal.style.display = "none";
				}
			}

		


	/*	$('img#eeMs3').click(function(e){
					e.preventDefault();
					alert("Kool!");
				})*/
		}

		for(var i=0;i<9;i++){
		var ee = $('img#eeMs'+i+'');
		if(i<6){
			console.log(ee);
		}

		ee.click(function(e){
			e.preventDefault();
			var toDisplay = $(this).closest("div.modal");
			var toDisplayEl = toDisplay[0];
			toDisplayEl.style.display = "none";


			var toChange = toDisplay.find(".modal-body");
			var emotiType = $(this).attr("value");
			var emotiTypeFormat = emotiType.charAt(0).toUpperCase() + emotiType.slice(1);
			toChange.html("<h1>"+emotiTypeFormat+" Sent</h1>");
			toDisplayEl.style.display = "block";
			setTimeout(function(){
				toDisplayEl.style.display = "none";
				window.location.href = '/chores';
			}, 1000);

			$.post('/emoticomments/'+emotiType+'/addHit');
			$.get('/emoticomments', function(data){
				console.log(data);
			});

		})
		}
		
		



	}
	$.get('/emoticomments', addModal);

}



