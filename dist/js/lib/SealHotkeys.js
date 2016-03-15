;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jQuery', 'SealModule'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'), require('SealModule'));
  } else {
    root.SealHotKeys = factory(root.jQuery, root.SealModule);
  }
}(this, function($, Module) {
SealModule.inherit(SealHotKeys, SealModule);
function SealHotKeys() {
    return SealHotKeys.__super__.constructor.apply(this, arguments);
}
SealHotKeys.count = 0;
SealHotKeys.keyMap = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",              // option on mac
    20: "Capslock",
    27: "Escape",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    91: "Meta",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "*",
    107: "+",
    //109: "-",     // SUBTRACT
    //110: ".",     // Decimal point
    //111: "/",     // divide "/" on the numeric keypad.
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12"
};
SealHotKeys.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert",
    "cmd": "meta",
    "command": "meta",
    "wins": "meta",
    "windows": "meta"
};
SealHotKeys.keyFormat = function(shortcut) {
    var keys, key, i, len;
    keys = shortcut.toLowerCase().replace(/\s+/g, '').split('+');
    for(i = 0, len = keys.length; i < len; i++) {
        keys[i] = this.aliases[keys[i]] || keys[i];
    }
    key = keys.pop();   // operator pop
    keys.sort().push(key);
    return keys.join('_');
}
SealHotKeys.prototype.opts = {
    el: document
};
SealHotKeys.prototype._init = function() {
    var self = this;
    this._map = {};
    this.id = ++this.constructor.count;
    this._delegate = (typeof this.opts.el === 'string') ? document : this.opts.el;
    $(this._delegate).on('keydown.seal-hotkeys-' + this.id, this.opts.el, function(e) {
        var handle;
        handle = self._getHandler(e);
        if(handle) {
            return handle.call(self, e);
        } else {
            return;
        }
    });
};
SealHotKeys.prototype._getHandler = function(e) {
    var keyName;
    var shortcut = '';
    keyName = this.constructor.keyMap[e.which];
    if(!keyName) return;
    if (e.altKey) {
      shortcut += "alt_";
    }
    if (e.ctrlKey) {
      shortcut += "control_";
    }
    if (e.metaKey) {
      shortcut += "meta_";
    }
    if (e.shiftKey) {
      shortcut += "shift_";
    }
    return this._map[shortcut + keyName.toLowerCase()];
};
SealHotKeys.prototype.remove = function(shortcut) {
    delete this._map[this.constructor.keyFormat(shortcut)];
    return this;
}
SealHotKeys.prototype.add = function(shortcut, handler) {
    this._map[this.constructor.keyFormat(shortcut)] = handler;
    return this;
};
SealHotKeys.prototype.destroy = function() {
    $(this._delegate).off('.seal-hotkeys-' + this.id);
    this._map = {};
    return this;
}

return SealHotKeys;
}));
