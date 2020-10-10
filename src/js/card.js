export default class Card {
    constructor (date, title, description, urlToImage, source) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.source = source;
    }
    create() {
        const markup = `
        <div class="result__item">
        <img class="result__item_image" src="<%=require('').default%>" alt="фото темы">
        <div class="result__text-container">
            <p class="result__item_date"></p>
            <h4 class="result__item_title"></h4>
            <p class="result__item_text"></p>
        </div>
        <p class="result__item_author"></p>
        </div>`;
        const element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', markup);
        const newCard = element.firstElementChild;
        newCard.querySelector('.result__item_date').textContent = this.date;
        newCard.querySelector('.result__item_title').textContent = this.title;
        newCard.querySelector('.result__item_text').textContent = this.description;
        newCard.querySelector('.result__item_author').textContent = this.source;
        newCard.querySelector('.result__item_image').src = this.urlToImage;
        this.newCard = newCard;
        return newCard;
    }

}