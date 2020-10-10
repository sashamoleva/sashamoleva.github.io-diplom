export default class ItemsList {
    constructor(container, func) {
        this.container = container;
        this.func = func;
    }
    addNewItem(key, value) {
        this.container.appendChild(this.func(key, value))
      }
    render(result) {
        for (const elem of Object.values(result.articles)) {
            localStorage.setItem(elem.title, [dateFormat (elem), elem.description, elem.urlToImage, elem.source.name]);
        }
    }