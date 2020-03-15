$(function() {
  function buildHTML(message){
    var image = ( message.image ) ? `<img class="lower-message__image" src=${message.image} >` : "";
      var html = `<div class="message", data-message-id="${message.id}">
                    <div class="message__info">
                      <p class="message__info__talker">
                        ${message.user_name}
                      </p>
                      <p class="message__info__data">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
                return html;
            };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html).animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('form')[0].reset();
        $('input').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });

    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };

    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});