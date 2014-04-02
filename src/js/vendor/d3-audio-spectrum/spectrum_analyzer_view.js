function SpectrumAnalyzerView(model, selector) {
  this.model = model;
  this.updateFreq = 100; // milliseconds
  this.initialize();
}

SpectrumAnalyzerView.prototype.initialize = function() {

}

SpectrumAnalyzerView.prototype.update = function() {
  var view = this;
  var data = this.model.data;

  moveWithData(data);

  this.enqueueNextUpdate()
}

SpectrumAnalyzerView.prototype.enqueueNextUpdate = function() {
  var view = this;
  timeout = setTimeout(function() { view.update() }, this.updateFreq);
  return timeout;
}
