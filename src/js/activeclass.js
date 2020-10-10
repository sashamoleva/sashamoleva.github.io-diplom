export default class ActiveClass {
    constructor(popup) {
        this.popup = popup;
    }
    open() {
        this.popup.classList.add('header_menu_active');
    }
    close() {
        this.popup.classList.remove('header_menu_active');
    }
   }