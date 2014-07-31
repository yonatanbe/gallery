function GalleryItemsContainer() {

    var gallery = document.querySelector('#gl-main');
    var itemsContainer = document.querySelector('#gl-items-container');
//    var footer = document.querySelector('.gl-footer');
    var displayedCounter = document.querySelector('#gl-menu-counter-displayed');
    var totalCounter = document.querySelector('#gl-menu-counter-total');
    var searchInput = document.querySelector('#gl-search-input');

    var itemId = 0,
        totalItems = 0,
        currDisplayedItems = 0;

    initItemsContainer();

    function initItemsContainer() {
        // TODO - initialize the counter and totoal

        bindRemoveButtonsClick();
    }

    function addGalleryItem(title, imgSrc, imgAlt) {

        var galleryItem = createGalleryItem(title, imgSrc, imgAlt);
        itemsContainer.appendChild(galleryItem);

        totalItems++;
        displayedCounter.textContent = totalItems;
    }

    function createGalleryItem(title, imgSrc, imgAlt) {

        var item = createElementWithClassName('div', ['gl-item']);
        var itemHeader = createItemHeader(title);
        var itemContent = createItemContent(imgSrc, imgAlt);
        var itemFooter = createItemFooter();

        item.appendChild(itemHeader);
        item.appendChild(itemContent);
        item.appendChild(itemFooter);

        item.id = itemId++;

        return item;
    }

    function createItemHeader(title) {
        var itemHeader = createElementWithClassName('div', ['gl-item-header']);
        var headerTitle = createElementWithClassName('h3', ['small-margin']);
        var titleText = document.createTextNode(title);
        headerTitle.setAttribute('title', title);
        headerTitle.appendChild(titleText);
        itemHeader.appendChild(headerTitle);

        return itemHeader;
    }

    function createItemContent(imgSrc, imgAlt) {
        var itemContent = createElementWithClassName('div', ['gl-item-content']);

        var img = new Image();
        // ** src should be set AFTER registering the listeners like onclick...
        img.src = imgSrc;
        img.alt = imgAlt;
        img.title = imgAlt;
        img.style.width = '95%';
        img.style.height = '100%';

        itemContent.appendChild(img);

        return itemContent;
    }

    function createItemFooter() {
        var itemFooter = createElementWithClassName('div', ['gl-item-footer']);

        var removeBtn = createElementWithClassName('BUTTON', ['gl-item-footer-button', 'gl-item-footer-button-rmv']);
        removeBtn.textContent = 'Remove';
        removeBtn.dataset.id = itemId;

        var editBtn = createElementWithClassName('BUTTON', ['gl-item-footer-button', 'gl-item-footer-button-edit']);
        editBtn.textContent = 'Edit';
        editBtn.dataset.id = itemId;

        itemFooter.appendChild(removeBtn);
        itemFooter.appendChild(editBtn);

//        connectRemoveButtonClick(removeBtn);

        return itemFooter;
    }

    function bindRemoveButtonsClick () {
        document.body.addEventListener('click', handleItemClickEvent, false);
    }

    function handleItemClickEvent(event) {
        if(event.target.classList.contains('gl-item-footer-button-rmv')){
            removeGalleryItem(event);
        } else if(event.target.classList.contains('gl-item-footer-button-edit')){
            editGalleryItem(event);
        } else if(event.target.id === 'search-submit-button'){
            event.preventDefault();
            event.stopPropagation();
            handleSearchButtonPressed(event);
        }
    }

    function removeGalleryItem(event) {
        var itemIdToRemove = event.target.dataset.id;
//        $('#'+itemIdToRemove).remove();

        var itemToRemove = document.getElementById(itemIdToRemove);
        itemsContainer.removeChild(itemToRemove);
    }

    function editGalleryItem(event) {
        var itemIdToEdit = event.target.dataset.id;
//        $('#'+itemIdToEdit).append();

        var itemToEdit = document.getElementById(itemIdToEdit);
        itemsContainer.appendChild(itemToEdit);
    }

    function handleSearchButtonPressed(event) {
        if(searchInput.value !== ""){
            makeRequest(onLoadHandler, searchInput.value);
        }
    }

    function onLoadHandler() {
        var responseObject = JSON.parse(this.responseText);
        responseObject.forEach(function (item) {
            addGalleryItem(item['name'], item['imgUrl'], item['type']);
        })
    }

    function makeRequest(onLoadEvent, searchInput){

        // TODO - add try catch

        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3001/search/' + searchInput, true);
        xhr.onload = onLoadEvent;
        xhr.send();
    }

    function createElementWithClassName(elementType, classNames) {
        var element = document.createElement(elementType);
        classNames.forEach(function (name) {
            element.classList.add(name);
        });
        return element;
    }

    return {
        addGalleryItem: addGalleryItem
    }

}

var galleryItemsContainer = GalleryItemsContainer();

//galleryItemsContainer.addGalleryItem('my title1!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
//galleryItemsContainer.addGalleryItem('my title2!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
//galleryItemsContainer.addGalleryItem('my title3!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
//galleryItemsContainer.addGalleryItem('my title4!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');


//var MyGL = {
//
//    allItems: [],
//    displayedItems: 0,
//    itemId: 0,
//
//    init:function(setup){
//        this.setup = setup;
//        this.markup();
//        this.bindEvents();
//    },
//    markup:function(){
//        this.$root = $(this.setup.root);
//        this.$itemsContainer = $(this.setup.itemsContainer);
//        this.$header = $(this.setup.glHeader);
//        this.$footer = $(this.setup.glFooter);
//        this.$displayedItemsCounter = $(this.setup.displayedCounter);
//        this.$totalItemsCounter = $(this.setup.totalItemsCounter);
//    },
//
//    bindEvents: function(){
//
//        this.$root.on('click', function(evt){
//            evt.target.remove();
//        })
//
//
//
//    },
//
//    updateGlItems:function(){
//
//    },
//
//    searchItems: function(){
//
//    },
//
//    removeAllEvents:function(){
//
//    },
//
//    destroy:function(){
//        this.$root.remove();
//        this.removeAllEvents();
//    }
//
//};
//
//
//MyGL.init({
//    root:'#gl-main',
//    itemsContainer:'#gl-items-container',
//    glHeader: '#gl-header',
//    glFooter: '#gl-footer',
//    displayedCounter: '#gl-menu-counter-displayed',
//    totalItemsCounter: '#gl-menu-counter-total'
//});
//