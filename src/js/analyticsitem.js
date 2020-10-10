export default class AnalyticsItem {
    constructor (key, value) {
        this.key = key;
        this.value = value;
    }
    create() {
            const markup = `
                <div class="tabel__item">
                    <p class="tabel__item_date"></p>
                    <div class="tabel__item_strip">
                        <div class="tabel__item_size">
                            <p class="tabel__item_size-text"></p>
                        </div>
                    </div>
                </div>`;
            const element = document.createElement('div');
            element.insertAdjacentHTML('afterbegin', markup);
            const newItem = element.firstElementChild;
            newItem.querySelector('.tabel__item_date').textContent = key;
            // document.querySelector('.tabel__item_strip').textContent = this.title;
            newItem.querySelector('.tabel__item_size').textContent = value;
            newItem.querySelector('.tabel__item_size-text').textContent = value;
            this.newItem = newItem;
            return newItem;
    }

}