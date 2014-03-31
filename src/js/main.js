$(document).ready(function() {
  
  var canvas = Snap('#svg');
  var colors = ['#F16663', '#F48D6C', '#F2E07B', '#8ABE9B', '#4A6D8B'];

  var a = canvas.rect(0, 0, '100%', '100%').attr({fill: colors[0]}),
      b = canvas.rect(0, 0, '080%', '100%').attr({fill: colors[1]}),
      c = canvas.rect(0, 0, '060%', '100%').attr({fill: colors[2]}),
      d = canvas.rect(0, 0, '040%', '100%').attr({fill: colors[3]}),
      e = canvas.rect(0, 0, '020%', '100%').attr({fill: colors[4]});

  window.drawSA = drawSA;

  function drawSA( stop1, stop2, stop3, stop4 ) {
    e.attr('width', stop1 + '%');
    d.attr('width', stop2 + '%');
    c.attr('width', stop3 + '%');
    b.attr('width', stop4 + '%');
  }

});