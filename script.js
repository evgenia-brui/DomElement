"use strict";

const DomElement = function(selector, height, width, bg, fontSize, text, position) {
    this.selector = selector;
    this.height   = height;
    this.width    = width;
    this.bg       = bg;
    this.fontSize = fontSize;
    this.text     = text;
    this.position = position;
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
        'position'   : this.position,
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

DomElement.prototype.moveBlock = function(event) {
    const block = document.querySelector(this.selector);
    const coords = block.getBoundingClientRect();
    switch (event.keyCode) {
        case 37: // left arrow
            block.style.left = coords.left - 10 + 'px';
            break;
        case 38: // up arrow
            block.style.top = coords.top - 10 + 'px';
            break;
        case 39: // right arrow
            block.style.left = coords.left + 10 + 'px';
            break;
        case 40: // down arrow
            block.style.top = coords.top + 10 + 'px';
            break;
    }
};

DomElement.prototype.eventsListeners = function() {
    const _this = this;
    document.addEventListener('DOMContentLoaded', _this.createNewElement.bind(_this));
    document.addEventListener('keydown', _this.moveBlock.bind(_this));
};

const domElement = new DomElement('.square', '100px', '100px', 'green', null, null, 'absolute');
domElement.eventsListeners();