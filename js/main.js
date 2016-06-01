// connect to your Firebase application using your reference URL
var messageAppReference = new Firebase("https://class-14.firebaseio.com/");

// jQuery Document
$(document).ready(function(){
  var yourName = prompt('What is your name?');
  $('#name').html(yourName);

  $('#submitmsg').on('click', function (event) {
    event.preventDefault();

    // grab user message input
    var message = $('#usermsg').val();

    // clear message input (for UX purposes)
    $('#usermsg').val('');

    // create a section for messages data in your db
    var messagesReference = messageAppReference.child('chatLog');

    // use the set method to save data to the messages
    messagesReference.push({
      username: yourName,
      message: message,
    });
  });

  getChatLog();

  //Delete a message

// create delete element
$('#chatbox').on('click', '.fa-trash', function () {
  // var id = $(this).parentNode().data('id')
  var id = ($(this).parent().data('id'))
  console.log(id)
  deleteMessage(id)
})

  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = new Firebase("https://class-14.firebaseio.com/chatLog/" + id)
    messageReference.remove();

    $("li").attr("data-id",id).remove();

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
      $messageListElement.attr('data-id', msg)
      console.log($messageListElement)
      messages.push($messageListElement);

      $chatbox.empty();

      for (var i in messages) {
        $chatbox.append(messages[i]);
      }
    }
  });
}

$('#usermsg').keypress(function(e){
    if(e.which == 13){
        $('#submitmsg').click();
    }
});
