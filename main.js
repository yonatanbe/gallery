function Gallery() {

    var itemsContainer = document.querySelector('#gl-items-container'),
        displayedCounter = document.querySelector('#gl-menu-counter-displayed'),
        totalCounter = document.querySelector('#gl-menu-counter-total'),
        selectedItemText = document.querySelector('#gl-menu-selected-text'),
        searchInput = document.querySelector('#gl-search-input');

    var serverQueryUrl = 'http://localhost:3001/search/',
        itemId = 0,
        totalItemsCount = 0,
        currDisplayedItemsCount = 0,
        allItems = [],
        currentDisplayedItems = [],
        itemCapacityPerPage = 18,
        itemsLeftForDisplaying = 0,
        currView = 'grid';

    initItemsContainer();

    function initItemsContainer() {
        totalCounter.textContent = totalItemsCount;
        updateCountHeader();
        selectedItemText.textContent = 'None';
        bindButtonsClick();
        bindScrolling();
    }

    function addGalleryItem(jsonItem) {

        var galleryItem = createGalleryItem(jsonItem);
        itemsContainer.appendChild(galleryItem);
    }

    function createGalleryItem(jsonItem) {

        var item = createElementWithClassName('div', ['gl-item', 'gl-item-grid']);
        var itemHeader = createItemHeader(jsonItem);
        var itemContent = createItemContent(jsonItem);
        var itemFooter = createItemFooter();

        appendChilds(item, [itemHeader, itemContent, itemFooter]);

        item.id = itemId++;
        item.setAttribute('data-action', 'item');
        item.setAttribute('data-title', jsonItem['name']);

        return item;
    }

    function createItemHeader(jsonItem) {
        var itemHeader = createElementWithClassName('div', ['gl-item-header']);
        var headerTitle = createElementWithClassName('h3', ['small-margin']);
        var titleText = document.createTextNode(jsonItem['name']);
        headerTitle.setAttribute('title', jsonItem['name']);
        headerTitle.appendChild(titleText);
        itemHeader.appendChild(headerTitle);

        return itemHeader;
    }

    function createItemContent(jsonItem) {
        var itemContent = createElementWithClassName('div', ['gl-item-content']);

        var img = new Image();
        // ** src should be set AFTER registering the listeners like onclick...
        img.src = jsonItem['imgUrl'];
        img.alt = jsonItem['type'];
        img.title = jsonItem['type'];
        img.style.width = '95%';
        img.style.height = '100%';

        itemContent.appendChild(img);

        return itemContent;
    }

    function appendChilds(element, elementsToAppend) {
        elementsToAppend.forEach(function (elementToAppend) {
            element.appendChild(elementToAppend);
        })
    }

    function createItemFooter() {
        var itemFooter = createElementWithClassName('div', ['gl-item-footer']);

        var removeBtn = createElementWithClassName('BUTTON', ['gl-item-footer-button', 'gl-item-footer-button-rmv']);
        initItemButton(removeBtn, 'remove-btn', 'Remove');

        var editBtn = createElementWithClassName('BUTTON', ['gl-item-footer-button', 'gl-item-footer-button-edit']);
        initItemButton(editBtn, 'edit-btn', 'Edit');

        appendChilds(itemFooter, [removeBtn, editBtn]);

        return itemFooter;
    }

    function initItemButton(btn, actionString, text) {
        btn.setAttribute('data-action', actionString);
        btn.textContent = text;
        btn.dataset.id = itemId;
    }

    function bindButtonsClick () {
        document.body.addEventListener('click', handleClickEvent, false);
    }


    //TODO
    function handleGridViewPressed() {
        if(currView != 'grid'){

        }
    }

    //TODO
    function handleListViewPressed() {

    }

    function handleClickEvent(event) {
        switch(event.target.dataset.action){
            case 'search':
                event.preventDefault();
                event.stopPropagation();
                handleSearchButtonPressed();
                break;
            case 'remove-btn':
                removeGalleryItem(event);
                break;
            case 'item':
                handleItemClickEvent(event);
                break;
            case 'edit-btn':
                editGalleryItem(event);
                break;
            case 'grid-view':
                handleGridViewPressed();
                break;
            case 'list-view':
                handleListViewPressed();
                break;
            default :
                throw Error('NOT A BUTTON');
                break;
        }
    }

    function removeGalleryItem(event) {
        var itemIdToRemove = event.target.dataset.id;
        var itemToRemove = document.getElementById(itemIdToRemove);
        itemsContainer.removeChild(itemToRemove);

        currDisplayedItemsCount--;
        updateCountHeader();
        totalCounter.textContent = --totalItemsCount;
    }

    function handleItemClickEvent(event) {
        var clickedItemId = event.target.dataset.id;
        var clickedItem = document.getElementById(clickedItemId);
        selectedItemText.textContent = clickedItem.dataset.title;
    }

    function editGalleryItem(event) {
        var itemIdToEdit = event.target.dataset.id;
        var itemToEdit = document.getElementById(itemIdToEdit);
        itemsContainer.appendChild(itemToEdit);
    }

    function handleSearchButtonPressed() {
        if(searchInput.value !== ""){
            makeRequest(onLoadHandler, searchInput.value);
        }
    }

    function addNextItemsToGallery(start, end) {
        currentDisplayedItems = allItems.slice(start, end);
        currentDisplayedItems.forEach(function (item) {
            addGalleryItem(item);
        })
    }

    function onLoadHandler() {
        try {
            allItems = JSON.parse(this.responseText);
            allItems = makeArrayUnique(allItems);
            currDisplayedItemsCount = allItems.length >= itemCapacityPerPage ?
                itemCapacityPerPage : allItems.length;
            totalItemsCount = allItems.length;
            totalCounter.textContent = totalItemsCount;
            updateCountHeader();
            itemsLeftForDisplaying = totalItemsCount - currDisplayedItemsCount;
            addNextItemsToGallery(0, currDisplayedItemsCount);
        } catch (e){
            console.log('Something went wrong when parsing the server response: ' + e.message);
        }
    }

    function makeRequest(onLoadEvent, searchInput){
        var xhr = new XMLHttpRequest();
        xhr.open('get', serverQueryUrl + searchInput, true);
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

    function bindScrolling() {
        window.addEventListener('scroll', function () {
            var body = document.body,
                html = document.documentElement;

            var height = Math.max( body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight );

            if (height <= document.body.scrollTop + window.innerHeight) {
                scrollMore();
            }
        });
    }

    function updateCountHeader() {
        displayedCounter.textContent = currDisplayedItemsCount;
    }

    function scrollMore() {
        if(itemsLeftForDisplaying > 0){
            var endItemToDisplay = (itemsLeftForDisplaying >= itemCapacityPerPage ?
                currDisplayedItemsCount + itemCapacityPerPage : totalItemsCount);
            addNextItemsToGallery(currDisplayedItemsCount, endItemToDisplay);
            itemsLeftForDisplaying -= itemCapacityPerPage;
            currDisplayedItemsCount = endItemToDisplay;
            updateCountHeader();
        }
    }

    function makeArrayUnique(array) {
        var namesArray = [];
        return array.reduce(function(prev, curr) {
            if (namesArray.indexOf(curr['name']) < 0){
                prev.push(curr);
                namesArray.push(curr['name']);
            }
            return prev;
        }, []);
    }

}

Gallery();