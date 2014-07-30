/**
 * Created by Yonatan_Bentzur on 7/29/14.
 */


describe("JQuery library Tests", function() {
    var collection;

    beforeEach(function () {
        document.body.innerHTML = '<div id="ab">Test</div><div>Test2</div>';
        collection = $('div');
    });

    it("tests $", function () {
        expect(collection.nodes.length).toEqual(2);
    });

    it("tests addClass function", function () {
        collection.addClass('a');
        var checkClasses = collection.nodes[0].element.classList[0] === 'a' && collection.nodes[1].element.classList[0] === 'a';
        expect(checkClasses).toBeTruthy();
    });

    it("tests removeClass function", function () {
        collection.addClass('a');
        collection.removeClass('a');
        var checkClasses = collection.nodes[0].element.classList[0] === 'a';
        expect(checkClasses).toBeFalsy();
    });

    it('tests the chaining', function () {
        collection.addClass('a').removeClass('a');
        var checkClasses = collection.nodes[0].element.classList[0] === 'a';
        expect(checkClasses).toBeFalsy();
    });

    it("tests hasClass function", function () {
        collection.addClass('a');
        expect(collection.hasClass('a')).toBeTruthy();
    });

    it("tests toggleClass on function", function () {
        collection.toggleClass('a');
        expect(collection.hasClass('a')).toBeTruthy();
    });

    it("tests toggleClass off function", function () {
        collection.addClass('a').toggleClass('a');
        expect(collection.hasClass('a')).toBeFalsy();
    });

    it("tests toggleClass on and off function", function () {
        var div1 = $('#ab');
        div1.addClass('a');
        collection.toggleClass('a');
        var checkClasses = collection.nodes[0].element.classList.length === 0 && collection.nodes[1].element.classList[0] === 'a';
        expect(checkClasses).toBeTruthy();
    });

    it("tests addAttr function", function () {
        collection.addAttr('attr', '2');
        expect(collection.nodes[0].element.getAttribute('attr')).toEqual('2');
    });

    it('tests removeAttr function', function () {
        collection.addAttr('attr').removeAttr('attr');
        expect(collection.nodes[0].element.hasAttribute('attr')).toBeFalsy();
    });

    it('tests hasAttr function', function () {
        collection.addAttr('attr');
        expect(collection.hasAttr('attr')).toBeTruthy();
    });

    it('tests the size function', function () {
        expect(collection.size()).toEqual(2);
    });

    it('tests the clone function', function () {
        var col = collection.clone(true);
        expect(col.nodes[0].element.innerHTML).toEqual(collection.nodes[0].element.innerHTML);
        expect(col.nodes[1].element.innerHTML).toEqual(collection.nodes[1].element.innerHTML);
        expect(col.nodes[0]).not.toBe(collection.nodes[0]);
    });

    it('tests the html with no arg function', function () {
        expect(collection.html()).toEqual(collection.nodes[0].element.innerHTML);
    });

    it('tests the html with an arg function', function () {
        collection.html('<div id="ab">INNER</div>');
        expect(collection.nodes[0].element.innerHTML).toEqual('<div id="ab">INNER</div>');
        expect(collection.nodes[1].element.innerHTML).toEqual('<div id="ab">INNER</div>');
    });

    it('tests the html with no arg that returns undefined function', function () {
        var col = $('bla');
        expect(col.html()).toEqual(undefined);
    });

    it('tests the text with no arg function', function () {
        collection.text();
        expect(collection.text()).toEqual(collection.nodes[0].element.textContent);
    });

    it('tests the text with an arg function', function () {
        collection.text('INNER');
        expect(collection.nodes[0].element.textContent).toEqual('INNER');
        expect(collection.nodes[1].element.textContent).toEqual('INNER');
    });

    it('tests the text with no arg that returns undefined function', function () {
        var col = $('bla');
        expect(col.text()).toEqual(undefined);
    });

    it('tests the remove function', function () {
        document.body.innerHTML = '<div><ul></ul></div><div><ol></ol></div>';
        collection = $('ul');
        collection.remove();
        expect(document.body.innerHTML).toEqual('<div></div><div><ol></ol></div>');
    });

    it('tests the empty function', function () {
        collection.empty();
        expect(document.body.innerHTML).toEqual('<div id="ab"></div><div></div>');
    });

    it('tests the eq function', function () {
        var col = collection.eq(1);
        expect(col.html()).toEqual('Test2');
    });

    it('tests the $ for elements', function () {
        var col = $(collection.nodes[0].element);
        expect(col.nodes[0].element instanceof Element).toBeTruthy();
    });

//    ASK BARAK HOW TO WORK WITH APPENDTO
//    it('tests appendTo with selector arg', function () {
//
//        expect(col.nodes[0].element instanceof Element).toBeTruthy();
//    });

    it('tests the appendTo for htmlString', function () {
        collection.append('<span>123</span>');
        expect(collection.nodes[0].element.innerHTML).toEqual('Test<span>123</span>');
    });

    it('tests the appendTo for element', function () {
        collection.append(document.createElement('div'));
        expect(collection.nodes[0].element.innerHTML).toEqual('Test<div></div>');
    });

    it('tests the before for element', function () {
        collection.before(document.createElement('div'));
        expect(document.body.innerHTML).toEqual('<div></div><div id="ab">Test</div><div></div><div>Test2</div>');
    });

});