function GalleryItemsContainer() {

    var gallery = document.querySelector('.gl-main');
    var itemsContainer = document.querySelector('.gl-items-container');
    var footer = document.querySelector('.gl-footer');
    var itemId = 0;

    function addGalleryItem(title, imgSrc, imgAlt) {

        var galleryItem = createGalleryItem(title, imgSrc, imgAlt);

        itemsContainer.appendChild(galleryItem);
    }

    function createGalleryItem(title, imgSrc, imgAlt) {

        var item = createElementWithClassName('div', 'gl-item');
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
        var itemHeader = createElementWithClassName('div', 'gl-item-header');
        var h3HeaderTitle = createElementWithClassName('h3', 'gl-no-margin-h3');
        var titleText = document.createTextNode(title);
        h3HeaderTitle.appendChild(titleText);
        itemHeader.appendChild(h3HeaderTitle);

        return itemHeader;
    }

    function createItemContent(imgSrc, imgAlt) {
        var itemContent = createElementWithClassName('div', 'gl-item-content');

        var img = new Image();
        // ** src should be set AFTER registering the listeners like onclick...
        img.src = imgSrc;
        img.alt = imgAlt;

        itemContent.appendChild(img);

        return itemContent;
    }

    function createItemFooter() {
        var itemFooter = createElementWithClassName('div', 'gl-item-footer');

        var removeBtn = createElementWithClassName('BUTTON', 'gl-item-footer-button');
        removeBtn.textContent = 'Remove';
        removeBtn.dataset.id = itemId;

        var editBtn = createElementWithClassName('BUTTON', 'gl-item-footer-button');
        editBtn.textContent = 'Edit';

        itemFooter.appendChild(removeBtn);
        itemFooter.appendChild(editBtn);

        connectRemoveButtonClick(removeBtn);

        return itemFooter;
    }

    function connectRemoveButtonClick (removeBtn) {
        removeBtn.addEventListener('click', removeGalleryItem, false);
    }

    function removeGalleryItem(event) {
        var itemIdToRemove = event.target.dataset.id;
        var itemToRemove = document.getElementById(itemIdToRemove);
        itemsContainer.removeChild(itemToRemove);
    }

    function createElementWithClassName(elementType, className) {
        var itemHeader = document.createElement(elementType);
        itemHeader.classList.add(className);
        return itemHeader;
    }

    return {
        addGalleryItem: addGalleryItem
    }

}

var galleryItemsContainer = new GalleryItemsContainer();

galleryItemsContainer.addGalleryItem('my title1!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
galleryItemsContainer.addGalleryItem('my title2!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
galleryItemsContainer.addGalleryItem('my title3!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');
galleryItemsContainer.addGalleryItem('my title4!', 'http://dummyimage.com/200x142/0a0af5/fff.jpg', 'blue pic');