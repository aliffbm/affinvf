	'use strict';


	// Call this function when the page loads (the "ready" event)
	$(document).ready(function() {
		initializePage();
	})

	/*
	 * Function that is called when the document is ready.
	 */
	 function initializePage() {

	 	/*LOGIN AND REGISTERING STUFF ...
	 	*
	 	*. wAAA! dEAR LORD,  I am  sorry for all the terrible things I have done.
	 	*
	 	* Get it together, Aliff. Form your thoughts and patterns. Build your schemas and synthesize them. 
		*
		* .... But it seems so easy to everyone..... Is this genetically predisposed.... Do i interject myself into a 
		* group that I truly don't belong toooooooOo?
	 	*********************I*************************************************/
	  $.get('/login', function(data){
	 	console.log(data[0].name);
	 	$("nav li a#home").attr("href", '/home/'+data[0].name+'');

	 		if(data[0].currentChore != "None Assigned"){
	 			$("#complete_chore_btn").show();
	 		}
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

	 /*
		//ADD NEW CHORES
	 	So here, I am creating a button to create a new chore on the 
	 	* chores page
	 	* 
		Stuff to add new Chores.... I love you, love, God.

		

	 */
	
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

	/**************************************************************************************
	* End the CHORES ADD BUTTON thing here
	***************************************************************************************/

	/******************************************************************************************
	*	THE CREATION OF DELETE-CHORES button and FUNCTION
	*	Delete Chores here
	*	In other classes, I wouold get penalize a good amount of points for not having
	* 	decorations (comments) like this..... Does anyone else feel helpless from our need to confirm
	*  	in order to feel like you belong???? Blah Blah BLAH blah.....  
	*
	*******************************************************************************************/
	
	$(".chore-delete").click(function(e){
		e.preventDefault();

		var choreID = $(this).closest('.panel-default').attr('id');

		$.post('/chores/'+choreID+'/delete', function() {
			window.location.href = '/chores';
		});

	})

	/*****************************************************************************************
	*					~ BTW: This is a Remix with W3Schools, Mr. Radioman. ~
	*	--------------------------------------------------------------------------------------
	*	| This is the end of my Deleting Chore Stuff for the chores page...
	*	--------------------------------------------------------------------------------------
	* 	# I will say though, it seems like this commenting here might server useful afterall
	* 	# I guess the question is something else..... hmmmmmmm
	*
	*******************************************************************************************/
	// neat.... I am evolving....

	/*********************************************************************************************
	*	~~~~~~~~!!! I wanted to use a pop on the window to show which faces to pick !!!!!~~~~~~~~~
	*	@ I got some help from W3SCHOOLS <3 <----------- XoXoxO Mucho Gracias ~~~~~~~~~~~~~~~~~~~~
	*	I HAVE A LOT OF GRATITUDE WWWW creators and thes one who use to promot knowledge and good information....
	*	
	*	**My head hurts**Who Cares**
	*
	*
	*
	*******************************************************************************************/


	
	var new_model_html; 
	var theID;	

		function addModal(emoticomments_json){
			var lengthOf = $('.panel-default:nth-child(n)').length;

			var ht = "";
			var lengthOFe = emoticomments_json.length;
			
			for(var i=0;i< lengthOFe;i++){
			 ht += '<img class="emotiImage" value="'+emoticomments_json[i].name+'" id="eeMs'+i+'" width=50 src="'+emoticomments_json[i].image+'">';
		
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



