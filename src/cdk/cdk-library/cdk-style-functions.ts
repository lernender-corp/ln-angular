import { Library } from '@lernender/core';
//
// Load CSS
//
export function injectCSS(document: any, rules: string) {
//
// Create a Style Object
//
const style = document.createElement('style');
if (style) {
    style.type = 'text/css';
    //
    // If IE Browser
    //
    if (style['styleSheet']) {
    style['styleSheet'].cssText = rules;
    } else {
    //
    // Append the CSS to <style> element.
    //
    style.appendChild(document.createTextNode(rules));
    }
    //
    // Add Css Element to to the <head> section of the DOM.
    //
    document.getElementsByTagName('head')[0].appendChild(style);
}
}

//
// _getStyle()
//
export function getStyle(window: any, className: any) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0; i < window.document.styleSheets.length; i++) {
    const sheet = window.document.styleSheets[i];
    const classes = Library.hasOwnProperty(sheet, 'rules')
    ? sheet.rules
    : sheet.cssRules;

    if (!classes) {
    continue;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < classes.length; x++) {
    const _class = classes[x];

    if (_class.selectorText === className) {
        let style = _class.cssText ? _class.cssText : _class.style.cssText;
        if (style.indexOf(_class.selectorText) === -1) {
        style = _class.selectorText + '{' + style + '}';
        }
        return style;
    }
    }
}
}
