$(function() {
  function buildHTML(message){
    if ( message.image ) {
      var html = `<div class="message">
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
                    </div>
                      <img class="lower-message__image" src=${message.image} >
                  </div>`
                return html;
    } else {
      var html =`<div class="message">
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
                  </div>
                </div>`
              return html;
            };
          }
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
    })
  });