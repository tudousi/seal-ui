/**
* 解析数据为HTML文档结构
*/
var ParseHTML = (function(superClass){
    superClass.inherit(ParseHTML, superClass);
    function ParseHTML() {
        return ParseHTML.__super__.constructor.apply(this, arguments);
    }
    ParseHTML.pluginName = "ParseHTML";
    ParseHTML.prototype.parse = function(data) {
        var key;
        data = data || this.opts.data || {};
        for(key in data) {
            if(key == 'dir') {
                
            }
        }
    }
    return ParseHTML;
})(SealModule);


SealModule.inherit(SealLayout, SealModule);
function SealLayout(opts){
    return SealLayout.__super__.constructor.apply(this, arguments);
}
SealLayout.connect(ParseHTML);
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
    split: 5,                   // 分割条宽度
    data: {
        dir: "vertical",
        horizontal: [
            {content: "abcd"},
            {content: "12345"}
        ],
        vertical: [
            {content: "abcd"},
            {content: "12345"}
        ]
    }
};
SealLayout.prototype._init = function() {
    var html = this.parseHTML.parse();
};
