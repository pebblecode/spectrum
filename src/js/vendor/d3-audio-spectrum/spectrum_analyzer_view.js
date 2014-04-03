function SpectrumAnalyzerView(model, selector) {
  this.model = model;
  this.updateFreq = 500; // milliseconds
  this.initialize();
}

SpectrumAnalyzerView.prototype.initialize = function() {

}

SpectrumAnalyzerView.prototype.update = function() {
  var view = this;
  var data = this.model.data;

  moveWithData(data);

  requestAnimationFrame(this.update.bind(this));
}
