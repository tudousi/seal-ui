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
SealLayout.count = 0;
/**
opts.data = {
    dir: "vertical",
    horizontal: [
        {content: "abcd"},
        {content: "12345"}
    ],
    vertical: [
        {content: "abcd"},
        {content: "12345"}
    ]
};
*/

SealLayout.prototype.opts = {
    el: "",
    box: "",
    split: 5,                   // 分割条宽度
    data: {
        dir: "vertical",
        horizontal: [
            {content: "abcd11"},
            {content: "1234511"}
        ],
        vertical: [
            {content: "abcd22"},
            {content: "1234522"}
        ]
    }
};
SealLayout.prototype._tpl = '<div class="sl-layout"></div>';
SealLayout.prototype._init = function() {
    this.wrapper;

    if(!this.opts.box) {
        throw Error("not give box selector");
    }
    this.opts.box = $(this._tpl).appendTo(this.opts.box);
    var html = this._parse();
    if(!html) {
        throw Error('html parse faild');
    }
    this._position();
};
SealLayout.prototype._parse = function(data) {
    var i;
    var len;
    var key;
    var cell;
    var split;
    var value;
    var parent;
    var cellDom;

    data = data || this.opts.data || {};
    if(!data['dir']) {
        return false;
    } else {
        if(data['dir'] == 'vertical') {
            this.wrapper = $('<div class="sl-layout__vertical"></div>').appendTo(this.opts.box);
        } else if(data['dir'] == 'horizontal') {
            this.wrapper = $('<div class="sl-layout__horizontal"></div>').appendTo(this.opts.box);
        } else {
            return;
        }
    }

    delete data['dir'];

    for(key in data) {
        value = data[key];
        if(key == 'vertical') {
            parent = $('<div class="sl-layout__vertical"></div>').appendTo(this.wrapper);
        }
        if(key == 'horizontal') {
            parent = $('<div class="sl-layout__horizontal"></div>').appendTo(this.wrapper);
        }
        // cell
        for(i = 0, len = value.length; i < len; i++ ) {
            cell = value[i];
            cellDom = $('<div class="sl-layout__cell"></div>');
            split = $('<div class="sl-layout__split"></div>');
            (typeof cellDom.content == "string") ? cellDom.text(cellDom.content) : cellDom.append($(cellDom.content));
            cellDom.appendTo(parent);
            if(i != value.length - 1) {
                split.appendTo(parent);
                split.data('cell', cellDom);
                cellDom.data('split', split);
            }
        }
    }
    return true;
}
SealLayout.prototype._position = function() {
    var elem;
    var width;
    var height;
    width = this.opts.box.parent().width();
    height = this.opts.box.parent().height();
    this.wrapper.width(width).height(height);
    this.opts.box.height(height).width(width);

    this.opts.box.find('.sl-layout__vertical').each(function() {
        var height = $(this).height() - 5;
        var width = $(this).width();
        var split;


        elem = $(this).find(">div").not('.sl-layout__split');
        elem.height(height / elem.length).width(width);

        (split = $(this).find(">div.sl-layout__split")).length ?  split.width($(this).height()).height(5) : void 0;
        elem.each(function(index) {
            var top = index * (height / elem.length)
            $(this).css({top: top});
            //(split = elem.find('>.sl-layout__split').eq(index)).length ? split.css({top: (index + 1) * (height / elem.length)}) : void 0;
        });
    });
    this.opts.box.find('.sl-layout__horizontal').each(function(elem) {
        var height = $(this).height();
        var width = $(this).width() - 5;

        elem = $(this).find(">div").not('.sl-layout__split');
        elem.height(height).width(width / elem.length);
        (split = $(this).find(">div.sl-layout__split")).length ? split.height($(this).width()).width(5) : void 0;
        elem.each(function(index) {
            var left = index * (width / elem.length)
            $(this).css({left: left});
            //(split = elem.find('>.sl-layout__split').eq(index)).length ? split.css({left: (index + 1) * (width / elem.length)}) : void 0;
        });
    });
};

return SealLayout;
}));
