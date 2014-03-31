$(document).ready(function() {
  
  var canvas = Snap('#svg');
  var colors = ['#F16663', '#F48D6C', '#F2E07B', '#8ABE9B', '#4A6D8B'];

  var a = canvas.rect(0, 0, '100%', '100%').attr({fill: colors[0]}),
      b = canvas.rect(0, 0, '080%', '100%').attr({fill: colors[1]}),
      c = canvas.rect(0, 0, '060%', '100%').attr({fill: colors[2]}),
      d = canvas.rect(0, 0, '040%', '100%').attr({fill: colors[3]}),
      e = canvas.rect(0, 0, '020%', '100%').attr({fill: colors[4]});

  window.drawSA = drawSA;
  window.randomSA = randomSA;
  window.repeatRandom = repeatRandom;

  function drawSA( stop1, stop2, stop3, stop4 ) {
    e.animate({'width': stop1 + '%'}, 100);
    d.animate({'width': stop2 + '%'}, 100);
    c.animate({'width': stop3 + '%'}, 100);
    b.animate({'width': stop4 + '%'}, 100);
  }

  function randomSA () {
    drawSA(
      Math.floor(Math.random() * 20) + 10,
      Math.floor(Math.random() * 20) + 30,
      Math.floor(Math.random() * 20) + 50,
      Math.floor(Math.random() * 20) + 70
    );
  }

  function repeatRandom() {
    setInterval( function() {
      randomSA();
    }, 100);
  }

});