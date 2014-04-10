function InputAudioSource(context) {
  this.context = context;

  // Frequency ranges
  freqRanges =  {
    humanAudible: {
      min: 20,
      max: 20000
    },

    // Eg, bass
    humanAudibleLowRange: {
      min: 20,
      max: 250
    },

    humanAudibleMidRange: {
      min: 250,
      max: 4000
    },

    humanAudibleHighRange: {
      min: 4000,
      max: 20000
    },

    // http://en.wikipedia.org/wiki/Voice_frequency
    voice: {
      min: 300,
      max: 3400
    }
  };

  // Mid human audible range
  this.freq = freqRanges.voice;
}

InputAudioSource.prototype.load = function(callback) {
  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  navigator.getUserMedia({ audio:true },
    this.streamCallback(callback));
};

InputAudioSource.prototype.play = function() {};

InputAudioSource.prototype.stop = function() {
  this.disconnect();
};

InputAudioSource.prototype.streamCallback = function(callback) {
  var source = this;

  var addBandPassFilter = function() {
    // Filter out low frequencies
    // (allow high frequences to pass through)
    var highPassFilter = source.context.createBiquadFilter();
    highPassFilter.type = 'highpass';
    highPassFilter.frequency.value = source.freq.min;

    // Filter out high frequencies
    // (allow low frequences to pass through)
    var lowPassFilter = source.context.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.frequency.value = source.freq.max;

    source.source.connect(highPassFilter);
    highPassFilter.connect(lowPassFilter);
  };

  return function(stream) {
    source.source = source.context.createMediaStreamSource(stream);
    addBandPassFilter();

    callback();
  };
};

InputAudioSource.prototype.connect = function(connector) {
  this.source.connect(connector);
};

InputAudioSource.prototype.disconnect = function() {
  this.source.disconnect();
};

module.exports = InputAudioSource;