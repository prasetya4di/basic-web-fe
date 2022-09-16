(() => {
  $("#btn-show-chat").on("click", function () {
    showOrHideChat()
  })
  $("#btn-close-chat").on("click", function () {
    showOrHideChat()
  })
})()

function showOrHideChat() {
  let chatContainer = $("#chat-container")
  let videoContainer = $("#video-container")
  if (chatContainer.hasClass("visually-hidden")) {
    chatContainer.removeClass("visually-hidden")
    videoContainer.addClass("col-sm-9 col-md-9 col-lg-9")
  } else {
    chatContainer.addClass("visually-hidden")
    videoContainer.removeClass("col-sm-9 col-md-9 col-lg-9")
  }
}