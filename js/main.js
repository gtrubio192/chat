   
$(document).ready(function() {
	// var name = prompt("Enter your user name: ");
	// enter a valid name, hide all chat room

	var name = '';
	$('#chat-room').hide();
	$('#login').on('click', 
		function(){
			name = $('#login-text').val();
			if(name == '')
			{
				alert("Please enter user name");
			}
			else{
				$('#chat-room').show();
				$('#sign-in').hide();
			}

	});

	$('#submit').on('click', onSearchButtonClick);
	// refresh listener
	$('#refresh').on('click', 
			function() { 
				// alert("clicked refresh");
				$('#chat-room').show();
				$('#sign-in').hide();
				location.reload(); 
				
			});

	// status listener
	$('a .status').on('click', 
		function() {
			var status = document.getElementById();
			alert("status: " + status);
			if(status == 'Away')
			{
				alert("Away chosen");
				$.post(
					'https://kate-gabe-chat.herokuapp.com/chats',
					{
						chat: {
							message: "Currently Away",
							name: name,
							like: '',
							photo: ''
						}
					
					},
					function(message) {
						console.log("Posting: " + message);
						// $('textarea').html('');
						render(message);
					},
					'json'
				);
			}

	});

	function onSearchButtonClick() {
		// 1. Input value
		console.log("Message: " + $('#chat-box').val());

		$.post(
			// 'http://tiny-pizza-server.herokuapp.com/collections/austintime',
			'https://kate-gabe-chat.herokuapp.com/chats',
			{
				chat: {
					message: $('#chat-box').val(),
					name: name,
					like: '',
					photo: ''
				}
			
			},
			function(message) {
				console.log("Posting: " + message);
				// $('textarea').html('');
				render(message);
			},
			'json'
		);
		$('#chat-box').val('');
	}
	
	var getMessages = function() {
		$.get(
			// 'http://tiny-pizza-server.herokuapp.com/collections/austintime',
			'https://kate-gabe-chat.herokuapp.com/chats.json',
			function(messages) {
				render(messages);
			},
			'json'
		);
	};

	var render = function(messages) {
		// console.log(messages);
		var messageRowMe = _.template('<li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff&amp;text=ME" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><small><span id="likes" class="glyphicon glyphicon-heart"> <%= like %> </span></small><strong class="pull-right primary-font"><%= name %></strong></div><p><%= message %></p><div><%= time_stamp %></div></div></li>');
		var messageRowYou = _.template('<li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&amp;text=YOU" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><small><span id="likes" class="glyphicon glyphicon-heart"> <%= like %> </span></small><strong class="pull-left primary-font"><%= name %></strong></div><p><%= message %></p><div><%= time_stamp %></div></div></li>');
		// console.log(messages);
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			// if(messages[i].message && messages[i].name && messages[i].created_at) {
			if(messages[i].name == name){
				console.log("Name at i: " + messages[i].name + "     Current user: " + name);
				$('.chat').prepend(messageRowMe(messages[i]));
			}
			else{
				$('.chat').prepend(messageRowYou(messages[i]));
			}

		}
	};


	
	// var now = timeStamp();
	// var firstPass = 1;
	getMessages();
	setInterval( getMessages, 3000);

});



