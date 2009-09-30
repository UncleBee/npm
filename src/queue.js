
exports.queue = function queue (items, fn) {
  return new Queue(items, fn).start();
};

// items are the things
// fn is what to do to each one.
// promise is the promise that is fulfilled when it works.
function Queue (items, fn) {
  this.items = [];
  for (var i = 0, l = items.length; i < l; i ++) if (i in items) {
    this.push(items[i]);
  }
  this.fn = fn;
}
function Queue_next () {
  if (this.items.length <= 0) return this.promise.emitSuccess();
  
  var np = new node.Promise(),
    self = this
  np.addCallback(function () { Queue_next.call(self) });
  setTimeout(function () {
    try {
      var fnP = self.fn.call(null, self.items.shift());
      if (fnP instanceof node.Promise) fnP.addCallback(function () {
          np.emitSuccess();
        }).addErrback(function () {
          np.emitError();
        });
      else np.emitSuccess();
    } catch (ex) {
      self.promise.emitError(ex);
    }
  });
  return this.promise;
};

Queue.prototype = {
  start : function Queue_start () {
    if (this._started) return;
    this._started = true;
    this.promise = new node.Promise();
    return Queue_next.call(this);
  },
  push : function (i) { this.items.push(i); }
};