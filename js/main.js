   
$(document).ready(function() {
	// var name = prompt("Enter your user name: ");

	$('#submit').on('click', onSearchButtonClick);
	//testing call
	// $('table').on('.entry tr', 'click', onRowClick);

	function onSearchButtonClick() {
		// 1. Input value
		console.log("Search: " + $('#chat-box').val());
		//$('.submit').val();
		// $('#results').html($('#search-box').val());
		// var now = timeStamp();

		// clear text box
		var now = timeStamp();
		// var name = prompt("Enter your user name: ");

		$.post(
			// 'http://tiny-pizza-server.herokuapp.com/collections/austintime',
			'https://kate-gabe-chat.herokuapp.com/chats',
			{
				chat: {
					message: $('#chat-box').val(),
					// name: name,
					name: "CoolDude",
					// created_at: now,
					like: '',
					photo: ''
				}
			
			},
			function(message) {
				console.log(message);
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

	function timeStamp(dateString) {
	// Create a date object with the current time
    var now = new Date(dateString);
	 
	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
	 
	// Create an array with the current hour, minute and second
	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	 
	// Determine AM or PM suffix based on the hour
	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
	 
	// Convert hour from military time
	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
	 
	// If hour is 0, set it to 12
	  time[0] = time[0] || 12;
	 
	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {
	    if ( time[i] < 10 ) {
	      time[i] = "0" + time[i];
	    }
	  }
	 
	// Return the formatted string
	  return date.join("/") + " " + time.join(":") + " " + suffix;
	}

	var render = function(messages) {
		console.log(messages);
		var messageRow = _.template('<li><div class="chat-body clearfix"><div class="header"><strong class="primary-font"><%= name %></strong><small class="pull-right"><span class="glyphicon glyphicon-heart"> <%= like %> </span></small></div><p><%= message %></p></div><div><%= time_stamp %></div></li>');
		// console.log(messages);
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			// if(messages[i].message && messages[i].name && messages[i].created_at) {
				$('.chat').prepend(messageRow(messages[i]));
			// }
			// else{
				// console.log("Failed");
			// }
		}
	};

	
	// var now = timeStamp();
	// var firstPass = 1;
	getMessages();
	setInterval( getMessages, 3000);



});



