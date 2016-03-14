;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jQuery', 'SealModule'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'), require('SealModule'));
  } else {
    root.SealUI = factory(root.jQuery, root.SealModule);
  }
}(this, function($, Module) {
SealModule.inherit(SealUI, SealModule);
function SealUI(opts){
    return SealUI.__super__.constructor.apply(this, arguments);
}
SealUI.prototype.opts = {}

return SealUI;
}));
