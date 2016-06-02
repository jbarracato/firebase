// connect to your Firebase application using your reference URL
var messageAppReference = new Firebase("https://class-14.firebaseio.com/");

// jQuery Document
$(document).ready(function(){
  var yourName = prompt('What is your name?');
  $('#name').html(yourName);

  $('#submitmsg').on('click', function (event) {
    event.preventDefault();
    var message = $('#usermsg').val();
    $('#usermsg').val('');
    var messagesReference = messageAppReference.child('chatLog');
    messagesReference.push({
      username: yourName,
      message: message,
    });
  });

  getChatLog();

  // create delete element
  $('#chatbox').on('click', '.fa-trash', function () {
    var id = ($(this).parent().data('id'));
    deleteMessage(id);
  });

  //Delete a message
  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = new Firebase("https://class-14.firebaseio.com/chatLog/" + id);
    messageReference.remove();
    $("li").attr("data-id",id).remove();
    getChatLog();
  }

  // create edit element
  $('#chatbox').on('click', '.fa-pencil', function () {
    var id = ($(this).parent().data('id'));
    editMessage(id);
  });

  //edit a message
  function editMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = new Firebase("https://class-14.firebaseio.com/chatLog/" + id);
    messageReference.update({message: message});
    $("li").attr("data-id",id).update();
    getChatLog();
  }

//close document.ready function on next line
});

function getChatLog() {

  messageAppReference.child('chatLog').on('value', function (results) {

    var $chatbox = $('#chatbox');
    var messages = [];

    var allMessages = results.val();

    for (var msg in allMessages) {
      var message = allMessages[msg].message;
      var username = allMessages[msg].username;

      var $messageListElement = $('<li>' + username + ': ' + message + '<i class="fa fa-pencil edit"></i><i class="fa fa-trash delete"></i></li>');
      $messageListElement.attr('data-id', msg);
      messages.push($messageListElement);

      $chatbox.empty();

      for (var i in messages) {
        $chatbox.append(messages[i]);
      }
    }
  });
}
