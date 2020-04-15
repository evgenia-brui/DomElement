"use strict";

const DomElement = function(selector, height, width, bg, fontSize, text) {
    this.selector = selector;
    this.height   = height;
    this.width    = width;
    this.bg       = bg;
    this.fontSize = fontSize;
    this.text     = text;
};

DomElement.prototype.createNewElement = function() {
    let element;
    if (this.selector == null || !this.selector || this.selector.trim() == '' && (this.selector[0] !== '.' || this.selector[0] !== '#')) {
        element = document.createElement('div');
    } else if (this.selector[0] === '.') {
        element = document.createElement('div');
        element.classList.add(this.selector.slice(1));
    } else if (this.selector[0] === '#') {
        element = document.createElement('p');
        element.id = this.selector.slice(1);
    }

    const styleAll = {
        'height'     : this.height,
        'width'      : this.width,
        'background' : this.bg,
        'font-size'  : this.fontSize,
    };
    const style = [];

    for (let property in styleAll) {
        if (styleAll[property]) {
            style.push(`${property}: ${styleAll[property]}`);
        }
    }

    element.style.cssText = style.join(';');
    element.textContent = this.text;
    document.body.append(element);
};

const domElement = new DomElement('.class', '50px', '100px', '#ccc', '18px', 'lorem ispum');
domElement.createNewElement();

const domElement2 = new DomElement('#id', '50px', '100px', '#ccc', '18px', 'lorem ispum');
domElement2.createNewElement();

const domElement3 = new DomElement(null, null, '100px', '#ccc', null, 'lorem ispum');
domElement3.createNewElement();