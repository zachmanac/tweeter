$(document).ready(function() {
  // --- our code goes here ---
  $('textarea').on('input', function() {
    let text = $(this).val();
    let output = $('.counter');
    output.val(140 - text.length);
    if (output.val() < 0) {
      output.css('color', 'red');
    } else {
      output.css('color', 'black');
    }
  });
});