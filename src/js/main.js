// $(document).ready(function() {
  
  var canvas = Snap('#svg');
  var colors = ['#F16663', '#F48D6C', '#F2E07B', '#8ABE9B', '#4A6D8B'];
  var a,b,c,d,e,v,w,x,y,z;
  var orientation;

  (function() {
    if (window.innerWidth / window.innerHeight >= 1){
      drawLandscape();
      orientation = 'landscape';
      return orientation;
    } else {
      drawPortrait();
      orientation = 'portrait';
      return orientation;
    }
  })();

  function drawLandscape() {
    a = canvas.rect(0, 0, '100%', '100%').attr({fill: colors[0]}),
    b = canvas.rect(0, 0, '080%', '100%').attr({fill: colors[1]}),
    c = canvas.rect(0, 0, '060%', '100%').attr({fill: colors[2]}),
    d = canvas.rect(0, 0, '040%', '100%').attr({fill: colors[3]}),
    e = canvas.rect(0, 0, '020%', '100%').attr({fill: colors[4]});
  }

  function drawPortrait() {
    v = canvas.rect(0, 0, '100%', '100%').attr({fill: colors[0]}),
    w = canvas.rect(0, 0, '100%', '080%').attr({fill: colors[1]}),
    x = canvas.rect(0, 0, '100%', '060%').attr({fill: colors[2]}),
    y = canvas.rect(0, 0, '100%', '040%').attr({fill: colors[3]}),
    z = canvas.rect(0, 0, '100%', '020%').attr({fill: colors[4]});
  }

  function moveLandscape( stop1, stop2, stop3, stop4 ) {
    e.animate({'width': stop1 + '%'}, 100);
    d.animate({'width': stop2 + '%'}, 100);
    c.animate({'width': stop3 + '%'}, 100);
    b.animate({'width': stop4 + '%'}, 100);
  }

  function movePortrait( stop1, stop2, stop3, stop4 ) {
    z.animate({'height': stop1 + '%'}, 100);
    y.animate({'height': stop2 + '%'}, 100);
    x.animate({'height': stop3 + '%'}, 100);
    w.animate({'height': stop4 + '%'}, 100);
  }

  function randomMove () {
    if (orientation == 'landscape') {
      moveLandscape(
        Math.floor(Math.random() * 30) + 5,
        Math.floor(Math.random() * 30) + 25,
        Math.floor(Math.random() * 30) + 45,
        Math.floor(Math.random() * 30) + 65
      );
    } else {
      movePortrait(
        Math.floor(Math.random() * 30) + 5,
        Math.floor(Math.random() * 30) + 25,
        Math.floor(Math.random() * 30) + 45,
        Math.floor(Math.random() * 30) + 65
      );
    }
  }

  function repeatRandom() {
    setInterval( function() {
      randomMove();
    }, 100);
  }

// });