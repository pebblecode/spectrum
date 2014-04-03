// This is where the audio is analyzed
function SpectrumAnalyzer(audio) {
  this.audio = audio;
  this.analysis = this.audio.context.createJavaScriptNode(this.audio.bufferSize);
  this.curve = 16;
  this.intensity = 50;
  this.setResolution(16);

  this.min = 0;
  this.max = 0;
  this.average = 0;
}

SpectrumAnalyzer.prototype.setResolution = function(n) {
  this.resolution = this.linLog(this.audio.bufferSize / n);
  this.reset();
}

SpectrumAnalyzer.prototype.setCurve = function(n) {
  this.curve = n;
  this.reset();
}

SpectrumAnalyzer.prototype.reset = function() {
  this.data = [];
  this.delta = [];
  var fftSize = this.resolution;
  this.audio.mono = new Float32Array(fftSize);
  this.fft = new FFT(fftSize, this.audio.sampleRate);
  var analyzer = this;
  this.analysis.onaudioprocess = function(event) {
    analyzer.audioReceived(event);
  };
}

SpectrumAnalyzer.prototype.linLog = function(n) {
  return Math.pow( 2, Math.round( Math.log( n ) / Math.log( 2 ) ) );
}

SpectrumAnalyzer.prototype.length = function() {
  return this.fft.spectrum.length/2;
}

SpectrumAnalyzer.prototype.play = function(callback) {
  var analyzer = this;
  this.audio.play(function() {
    analyzer.audio.connectProcessor(analyzer.analysis);
    if (callback) {
      callback();
    }
  });
}

SpectrumAnalyzer.prototype.getInitialData = function() {
  var data = [];
  for (var i = 0; i < this.length(); i++) {
    data.push(1);
  };
  return data;
}

SpectrumAnalyzer.prototype.withCurve = function(callback) {
  var segmentLength = this.length() / this.curve;
  var segmentCounter = 0;
  var segment = 0;
  var counter = 0;
  var index = 0;
  while (index <= this.length() - 1) {
    callback(index, counter);
    index += (segment * this.curve) + 1;
    counter += 1;
    segmentCounter += 1;
    if (segmentCounter > segmentLength - 1) {
      segment += 1;
      segmentCounter = 0;
    }
  }
}

SpectrumAnalyzer.prototype.populateData = function(index, counter) {
  amplitude = this.fft.spectrum[index] * (this.intensity * 200);
  this.delta[counter] = amplitude - this.data[counter];
  this.data[counter] = amplitude;
}

/**
 * Find the min of the data
 *
 * @return {Number} min value
 */
SpectrumAnalyzer.prototype.getDataMin = function() {
  var length = this.data.length;

  if (length === 0) {
    return 0;
  }

  var min = 0;

  for (var i = 0; i < length; i++) {
    var val = this.data[i];
    if (val < min) {
      min = val;
    }
  }

  return min;
}

/**
 * Find the max of the data
 *
 * @return {Number} max value
 */
SpectrumAnalyzer.prototype.getDataMax = function() {
  var length = this.data.length;

  if (length === 0) {
    return 0;
  }

  var max = 0;

  for (var i = 0; i < length; i++) {
    var val = this.data[i];
    if (val > max) {
      max = val;
    }
  }

  return max;
}

/**
 * Find the average of the data
 *
 * @return {Number}
 */
SpectrumAnalyzer.prototype.getDataAvg = function() {
  var length = this.data.length;

  if (length === 0) {
    return 0;
  }

  var total = 0;

  for (var i = 0; i < length; i++) {
    total = total + this.data[i];
  }

  return total / length;
}

SpectrumAnalyzer.prototype.audioReceived = function(event) {
  var analyzer = this;
  this.audio.routeAudio(event, false);
  this.fft.forward(this.audio.mono);
  this.withCurve(function(index, counter) {
    analyzer.populateData(index, counter);
  });

  this.min = this.getDataMin();
  this.max = this.getDataMax();
  this.average = this.getDataAvg();
}
