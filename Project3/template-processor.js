"use strict";

function TemplateProcessor(template) {
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
    var res = this.template;
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            var pattern = new RegExp("{{" + key + "}}", "g");
            res = res.replace(pattern, dictionary[key]);
        }
    }

    res = res.replace(/{{[^{}]*}}/g, "");
    return res;
};
