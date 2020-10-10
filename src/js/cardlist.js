import dateFormat from "../index.js";
export default class CardList {
    constructor(container, func) {
        this.container = container;
        this.func = func;
    }
    addNewCard(date, title, description, urlToImage, source) {
        this.container.appendChild(this.func(date, title, description, urlToImage, source))
      }
    render(result) {
        for (const elem of Object.values(result.articles)) {
            localStorage.setItem(elem.title, [dateFormat (elem), elem.description, elem.urlToImage, elem.source.name]);
        }
    }
    // showMore(){
    //     let nwsArr = this.articles; // копирование массива с новостями, без totalResults
    //     if ((cntShMore + 3) >= Object.keys(nwsArr).length) { // скрытие кнопки "показать еще" при достижении конца массива
    //         resultButton.classList.add('hidden');
    //     }
    //     for (let i = cntShMore; i <= shMore && i <= pSize-1; i++){
    //         if (nwsArr[i].urlToImage == null) {nwsArr[i].urlToImage = './src/images/image_08.jpg';} // если нет изображения то подставить стандартную картинку
    //         cardsList.addNewCard(dateFormat(nwsArr[i]), nwsArr[i].title, nwsArr[i].description, nwsArr[i].urlToImage, nwsArr[i].source.name,);
    //     }
    //     cntShMore = shMore + 1; // увеличение счетчика для количества нажатия кнопки "показать еще"
    // }
}