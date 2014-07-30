/**
 * Created by Yonatan_Bentzur on 7/29/14.
 */

function jDom(context, exports) {

    function jDomItem(element) {
        this.element = element;
    }

    jDomItem.prototype.addClass = function (className) {
        this.element.classList.add(className);
        return this;
    };

    jDomItem.prototype.removeClass = function (className) {
        this.element.classList.remove(className);
        return this;
    };

    jDomItem.prototype.hasClass = function (className) {
        return this.element.classList.contains(className);
    };

    jDomItem.prototype.toggleClass = function (className) {
        return this.element.classList.contains(className) ? this.removeClass(className) : this.addClass(className);
    };

    jDomItem.prototype.addAttr = function (attrName, val) {
        this.element.setAttribute(attrName, val);
        return this;
    };

    jDomItem.prototype.removeAttr = function (attrName) {
        this.element.removeAttribute(attrName);
        return this;
    };

    jDomItem.prototype.hasAttr = function (attrName) {
        return this.element.hasAttribute(attrName);
    };

    jDomItem.prototype.clone = function (isDeep) {
        return new jDomItem(this.element.cloneNode(isDeep));
    };

    jDomItem.prototype.html = function (newHtml) {
        if(newHtml !== undefined){
            this.element.innerHTML = newHtml;
            return this;
        }
        return this.element.innerHTML;
//        return newHtml !== undefined ? this.element.innerHTML = newHtml || this : this.element.innerHTML;
    };

    jDomItem.prototype.text = function (newText) {
        if(newText !== undefined){
            this.element.textContent = newText;
            return this;
        }
        return this.element.textContent;
    };

    jDomItem.prototype.remove = function () {
        this.element.remove();
        return this;
    };

    jDomItem.prototype.empty = function (){
        var child;
        while(child = this.element.firstChild){
            this.element.removeChild(child);
        }
        return this;
    };

    jDomItem.prototype.append = function (itemToAppend) {
        if(typeof itemToAppend === 'string'){
            return this.element.innerHTML += itemToAppend;
        } else {
            return this.element.appendChild(itemToAppend.cloneNode(true));
        }
    };

    jDomItem.prototype.before = function (itemToInsert) {
        if(typeof itemToInsert === 'string'){
            return this.element.innerHTML += itemToAppend;
        } else {
            return this.element.parentNode.insertBefore(itemToInsert.cloneNode(true), this.element);
        }
    };

    //////////////////////////////////////////////////////////////////////

    function jDOMCollection(jDomItems) {
        this.nodes = jDomItems;
    }

    jDOMCollection.prototype.addClass = function (className) {
        return this.each(function () {
            this.addClass(className);
        })
    };

    jDOMCollection.prototype.removeClass = function (className) {
        return this.each(function () { this.removeClass(className); })
    };

    jDOMCollection.prototype.hasClass = function (className) {
        return this.nodes[0].hasClass(className);
    };

    jDOMCollection.prototype.toggleClass = function (className) {
        return this.each(function () { this.toggleClass(className); })
    };

    jDOMCollection.prototype.addAttr = function (attrName, val) {
        return this.each(function () { this.addAttr(attrName, val); })
    };

    jDOMCollection.prototype.removeAttr = function (attrName) {
        return this.each(function () { this.removeAttr(attrName); })
    };

    jDOMCollection.prototype.hasAttr = function (attr) {
        return this.nodes[0].hasAttr(attr);
    };

    jDOMCollection.prototype.size = function () {
        return this.nodes.length;
    };

    jDOMCollection.prototype.clone = function (isDeep) {
        return this.map(function (item) {
            return item.clone(isDeep);
        });
    };

    jDOMCollection.prototype.html = function (newHtml) {
        if(newHtml !== undefined){
            return this.each(function () { this.html(newHtml); })
        }
        return (this.nodes[0] && this.nodes[0].html()) || undefined;
    };

    jDOMCollection.prototype.text = function (newText) {
        if(newText !== undefined){
            return this.each(function () { this.text(newText); })
        }
        return (this.nodes[0] && this.nodes[0].text()) || undefined;
    };

    jDOMCollection.prototype.remove = function () {
        return this.each(function () { this.remove(); })
    };

    jDOMCollection.prototype.empty = function () {
        return this.each(function () { this.empty(); })
    };

    jDOMCollection.prototype.eq = function (index) {
        var ans;
        if(this.nodes[index]){
            ans = new jDOMCollection([this.nodes[index]]);
        } else {
            ans = new jDOMCollection([]);
        }
        return ans;
    };

    jDOMCollection.prototype.append = function (itemToAppend) {
        return this.each(function () { this.append(itemToAppend); })
    };

    jDOMCollection.prototype.before = function (itemToInsert) {
        return this.each(function () { this.before(itemToInsert); })
    };

    jDOMCollection.prototype.each = function (func) {
        this.nodes.forEach(function (item, index, array) {
            func.call(item, item, index, array);
        });
        return this;
    };

    jDOMCollection.prototype.map = function (func) {
        return new jDOMCollection(this.nodes.map(function (item, index, array) {
            return func.call(item, item, index, array);
        }));
    };

    jDOMCollection.prototype.filter = function () {};

    //////////////////////////////////////////////////////////////////////

    function $(selectorOrNode, root) {
        root = root || document;
        if (typeof selectorOrNode === 'string') {
            var nlist = root.querySelectorAll(selectorOrNode);
            return new jDOMCollection($.nodeListToArrayOfjDomItems(nlist));
        } else if(selectorOrNode instanceof Element) {
            return new jDOMCollection([new jDomItem(selectorOrNode)]);
        } else {
            throw new Error('TODO: implement more modes');
        }
    }

    $.is_jDomEntity = function(thing){
        return thing instanceof jDomItem || thing instanceof jDOMCollection;
    };

    $.nodeListToArrayOfjDomItems = function(nodeList){
        return Array.prototype.map.call(nodeList, function (element) {
            return new jDomItem(element);
        });
    };

    return context[exports] = $;

}

jDom(window, '$');
