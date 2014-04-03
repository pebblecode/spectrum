// $(document).ready(function() {

  var canvas = Snap('#svg');
  var colors = ['#F16663', '#F48D6C', '#F2E07B', '#8ABE9B', '#4A6D8B'];
  var a,b,c,d,e,v,w,x,y,z;
  var orientation;
  var fixedProportion = "100%";
  var duration = 500;

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
    a = canvas.rect(0, 0, '100%', fixedProportion).attr({fill: colors[0]});
    b = canvas.rect(0, 0, '080%', fixedProportion).attr({fill: colors[1]});
    c = canvas.rect(0, 0, '060%', fixedProportion).attr({fill: colors[2]});
    d = canvas.rect(0, 0, '040%', fixedProportion).attr({fill: colors[3]});
    e = canvas.rect(0, 0, '020%', fixedProportion).attr({fill: colors[4]});
  }

  function drawPortrait() {
    v = canvas.rect(0, 0, fixedProportion, '100%').attr({fill: colors[0]});
    w = canvas.rect(0, 0, fixedProportion, '080%').attr({fill: colors[1]});
    x = canvas.rect(0, 0, fixedProportion, '060%').attr({fill: colors[2]});
    y = canvas.rect(0, 0, fixedProportion, '040%').attr({fill: colors[3]});
    z = canvas.rect(0, 0, fixedProportion, '020%').attr({fill: colors[4]});
  }

  function moveLandscape( stop1, stop2, stop3, stop4 ) {
    e.animate({'width': stop1 + '%'}, duration);
    d.animate({'width': stop2 + '%'}, duration);
    c.animate({'width': stop3 + '%'}, duration);
    b.animate({'width': stop4 + '%'}, duration);
  }

  /**
   * Find the normalized value for percentages (out of
   * 100).
   *
   * @param  {Number} val Value
   * @param  {Number} total
   * @return {Number} Rounded down value of normalised value. Returns 0 if total is 0.
   */
  function normalizeToPercent(val, total) {
    if (total === 0) {
      return 0;
    }

    return Math.floor(val / total * 100);
  }

  /**
   * Move bars with given data.
   *
   * Only takes the first 4 values.
   *
   * Ignore data that has less than 4 values.
   *
   * @param  {Array} data
   */
  function moveWithData( data ) {
    if (data.length >= 4) {
      var val1 = data[0];
      var val2 = data[1];
      var val3 = data[2];
      var val4 = data[3];

      var total = val1 + val2 + val3 + val4;

      if (total > 0) {
        // Normalise values from total
        var normVal1 = normalizeToPercent(val1, total);
        var normVal2 = normalizeToPercent(val2, total);
        var normVal3 = normalizeToPercent(val3, total);
        var normVal4 = normalizeToPercent(val4, total);

        if (orientation == 'landscape') {
          moveLandscape(normVal1, normVal2, normVal3, normVal4);
        } else {
          movePortrait(normVal1, normVal2, normVal3, normVal4);
        }
      }
    }
  }

  function movePortrait( stop1, stop2, stop3, stop4 ) {
    z.animate({'height': stop1 + '%'}, duration);
    y.animate({'height': stop2 + '%'}, duration);
    x.animate({'height': stop3 + '%'}, duration);
    w.animate({'height': stop4 + '%'}, duration);
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