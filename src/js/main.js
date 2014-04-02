function Application() {
  this.audio = undefined;
  this.context = undefined;
  this.model = undefined;
  this.source = undefined;
  this.view = undefined;
}

Application.prototype.load = function() {
  var app = this;
  this.populateContext();
  this.audio = new Audio(this.context);

  this.source = this.sourceFromInput();
  app.onSourceLoaded(function() {
    app.model = new SpectrumAnalyzer(app.audio);
    app.view = new SpectrumAnalyzerView(app.model, "#spectrum_analyzer");
    app.view.update();
  });

  $("#play").click(function() {
    Application.togglePlay();
  });
};

Application.prototype.sourceFromInput = function() {
  var app = this;
  return new InputAudioSource(this.context);
};

Application.prototype.onSourceLoaded = function(callback) {
  this.audio.source = this.source;
  if (callback !== null) {
    callback();
  }
};

Application.prototype.play = function() {
  var element = document.getElementById('play');
  element.value = "Stop";
  this.model.play();
};

Application.prototype.togglePlay = function() {
  if (this.audio.playing) {
    this.stop();
  } else {
    this.play();
  }
};

Application.prototype.stop = function() {
  this.audio.stop();
  var element = document.getElementById('play');
  element.value = "Start";
};

Application.prototype.populateContext = function() {
  if (! window.AudioContext) {
    if (! window.webkitAudioContext) {
      alert("Sorry, your browser is not supported.");
      return;
    }
    window.AudioContext = window.webkitAudioContext;
    this.context = new AudioContext();
  }
};

// Class Methods

Application.load = function() {
  this.instance = new Application();
  this.instance.load();
};

Application.play = function() {
  this.instance.play();
};

Application.togglePlay = function() {
  this.instance.togglePlay();
};

Application.stop = function() {
  this.instance.stop();
};

