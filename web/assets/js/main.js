$(function(){
  var disableCopying = false;

  function checkImageLoad(url, success, fail) {
    $("<img>", {
        src: url,
        error: function() { if (fail) { fail(); } },
        load: function() { if (success) { success(); } }
    });
  }

  var previewFace = function() {
    var input = this;
    if (input.checkValidity()) {
      checkImageLoad(input.value, function() {
        $('.js-face-image').attr('src', input.value);
      }, function() {
        $('.js-face-image').attr('src', '/assets/img/broken.png');
      });
    } else {
      $('.js-face-image').attr('src', '/assets/img/faceless.png');
    }
  };

  $('.js-face-url')
    .on('paste', previewFace)
    .on('change', previewFace);

  var duplicateText = function(e) {
    if (!disableCopying) {
      $('.js-list-email').val(e.target.value);
    }
  };

  $('.js-contact-email')
    .on('paste', duplicateText)
    .on('keyup', duplicateText);

  $('.js-list-email').on('change', function(e) {
    disableCopying = (e.target.value !== '');
  })


  $('.js-face-file').change(function() {
    var input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.js-face-image').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  });

});
