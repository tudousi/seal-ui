;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jQuery', 'SealModule'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'), require('SealModule'));
  } else {
    root.SealLayout = factory(root.jQuery, root.SealModule);
  }
}(this, function($, Module) {
SealModule.inherit(SealLayout, SealModule);
function SealLayout(opts){
    return SealLayout.__super__.constructor.apply(this, arguments);
}
SealLayout.prototype.opts = {}

return SealLayout;
}));
