function Audio(context, sampleRate) {
  this.context = context;
  this.sampleRate = sampleRate || 44100;
  this.playing = false;
  this.bufferSize = 2048;
}

Audio.prototype.connect = function() {
  this.gain = this.context.createGainNode();
  this.source.connect(this.gain);
}

Audio.prototype.connectProcessor = function(processor) {
  this.gain.connect(processor);
  processor.connect(this.context.destination);
}

Audio.prototype.setVolume = function(value) {
  this.gain.gain.value = value;
}

Audio.prototype.stop = function() {
  this.source.stop();
  this.playing = false;
}

Audio.prototype.play = function(callback) {
  var source = this.source;
  var audio = this;
  this.source.load(function() {
    audio.connect();
    source.play();
    audio.playing = true;
    callback();
  });
}

/**
 * Route the audio
 *
 * @param  {Object} event
 * @param  {Boolean} outputToSpeakers Whether to output to the speakers or not. Default is true.
 */
Audio.prototype.routeAudio = function(event, outputToSpeakers) {
  var routeToSpeakers = (outputToSpeakers === undefined) ? true : outputToSpeakers;
  var input = {
    l: event.inputBuffer.getChannelData(0),
    r: event.inputBuffer.getChannelData(1)
  }
  var output = {
    l: event.outputBuffer.getChannelData(0),
    r: event.outputBuffer.getChannelData(1)
  };

  for (var i = 0; i < this.bufferSize; ++i) {
    if (routeToSpeakers) {
      output.l[i] = input.l[i];
      output.r[i] = input.r[i];
    }

    this.mono[i] = (input.l[i] + input.r[i]) / 2;
  }
}
