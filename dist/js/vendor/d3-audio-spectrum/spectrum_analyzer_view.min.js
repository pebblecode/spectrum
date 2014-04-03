/*global Snap:true */
function SpectrumAnalyzerView(model, selector) {
  this.canvas = Snap('#svg');
  this.colors = ['#F16663', '#F48D6C', '#F2E07B', '#8ABE9B', '#4A6D8B'];

  this.landscapePoints = [];
  this.portraitPoints = [];

  // The side that does not move
  this.fixedSideLength = "100%";
  this.duration = 500;

  this.model = model;
  this.updateFreq = 500; // milliseconds
  this.initialize();
}

function drawLandscape() {
  var points = this.landscapePoints;

  points[0] = this.canvas.rect(0, 0, '100%', this.fixedSideLength).attr({fill: this.colors[0]});
  points[1] = this.canvas.rect(0, 0, '080%', this.fixedSideLength).attr({fill: this.colors[1]});
  points[2] = this.canvas.rect(0, 0, '060%', this.fixedSideLength).attr({fill: this.colors[2]});
  points[3] = this.canvas.rect(0, 0, '040%', this.fixedSideLength).attr({fill: this.colors[3]});
  points[4] = this.canvas.rect(0, 0, '020%', this.fixedSideLength).attr({fill: this.colors[4]});
}

function drawPortrait() {
  var points = this.portraitPoints;

  points[0] = this.canvas.rect(0, 0, this.fixedSideLength, '100%').attr({fill: this.colors[0]});
  points[1] = this.canvas.rect(0, 0, this.fixedSideLength, '080%').attr({fill: this.colors[1]});
  points[2] = this.canvas.rect(0, 0, this.fixedSideLength, '060%').attr({fill: this.colors[2]});
  points[3] = this.canvas.rect(0, 0, this.fixedSideLength, '040%').attr({fill: this.colors[3]});
  points[4] = this.canvas.rect(0, 0, this.fixedSideLength, '020%').attr({fill: this.colors[4]});
}

function moveLandscape(stop1, stop2, stop3, stop4) {
  var points = this.landscapePoints;

  points[4].animate({'width': stop1 + '%'}, this.duration);
  points[3].animate({'width': stop2 + '%'}, this.duration);
  points[2].animate({'width': stop3 + '%'}, this.duration);
  points[1].animate({'width': stop4 + '%'}, this.duration);
}

function movePortrait( stop1, stop2, stop3, stop4) {
  var points = this.portraitPoints;

  points[4].animate({'height': stop1 + '%'}, this.duration);
  points[3].animate({'height': stop2 + '%'}, this.duration);
  points[2].animate({'height': stop3 + '%'}, this.duration);
  points[1].animate({'height': stop4 + '%'}, this.duration);
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
function moveWithData(data) {
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

      if (this.orientation == 'landscape') {
        moveLandscape.call(this, normVal1, normVal2, normVal3, normVal4);
      } else {
        movePortrait.call(this, normVal1, normVal2, normVal3, normVal4);
      }
    }
  }
}

SpectrumAnalyzerView.prototype.initialize = function() {
  if (window.innerWidth / window.innerHeight >= 1){
    drawLandscape.call(this);
    this.orientation = 'landscape';
  } else {
    drawPortrait.call(this);
    this.orientation = 'portrait';
  }
}

SpectrumAnalyzerView.prototype.update = function() {
  var view = this;
  var data = this.model.data;

  moveWithData.call(this, data);

  // Debug values
  var min = Math.floor(this.model.min);
  var max = Math.floor(this.model.max);
  var avg = Math.floor(this.model.average);
  $("#debug").html(avg + ", " + min + " &rarr; " + max);

  requestAnimationFrame(this.update.bind(this));
}