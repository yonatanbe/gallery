function Gallery() {

    var itemsContainer = document.querySelector('#gl-items-container'),
        displayedCounter = document.querySelector('#gl-menu-counter-displayed'),
        totalCounter = document.querySelector('#gl-menu-counter-total'),
        selectedItemText = document.querySelector('#gl-menu-selected-text'),
        searchInput = document.querySelector('#gl-search-input');

    var itemId = 0,
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

    function addGalleryItem(title, imgSrc, imgAlt) {

        var galleryItem = createGalleryItem(title, imgSrc, imgAlt);
        itemsContainer.appendChild(galleryItem);
    }

    function createGalleryItem(title, imgSrc, imgAlt) {

        var item = createElementWithClassName('div', ['gl-item', 'gl-item-grid']);
        var itemHeader = createItemHeader(title);
        var itemContent = createItemContent(imgSrc, imgAlt);
        var itemFooter = createItemFooter();

        appendChilds(item, [itemHeader, itemContent, itemFooter]);

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
        document.body.addEventListener('click', handleItemClickEvent, false);
    }

    function handleGridViewPressed() {
        if(currView != 'grid'){

        }
    }

    function handleItemClickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        switch(event.target.dataset.action){
            case 'search':
                handleSearchButtonPressed();
                break;
            case 'remove-btn':
                removeGalleryItem(event);
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
                throw Error('This can\'t be the right button');
                break;
        }
    }

    function removeGalleryItem(event) {
        var itemIdToRemove = event.target.dataset.id;
        var itemToRemove = document.getElementById(itemIdToRemove);
        itemsContainer.removeChild(itemToRemove);
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
            addGalleryItem(item['name'], item['imgUrl'], item['type']);
        })
    }

    function onLoadHandler() {
        try {
            allItems = JSON.parse(this.responseText);
            console.log(allItems);
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

}

Gallery();