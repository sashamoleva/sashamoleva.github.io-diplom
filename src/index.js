import "./style.css"
import Api from "./js/api.js";
import FormValidator from "./js/formvalidator.js";
import Card from "./js/card.js";
import CardList from "./js/cardlist.js";

//Переменные
let q = ''; // Переменная для ключевого слова
const pSize = '100'; // Размер статей
const nowDate = new Date().getTime() - (86400000*6); // Текущая дата - 7 дней в секундах
const fromDate = new Date(nowDate).toISOString().substr(0,10); // Обрезка даты для подстановки в запрос
const toDate = new Date().toISOString().substr(0,10); // Обрезка даты для подстановки в запрос
const newsToken = '88b65c0b211c44abb48c7786b6b29848'; // Токен для подстановки в запрос
let shMore = 0; // Счетчик кол-ва отображаемых карточек
let cntShMore = 0; // Счетчик количества нажатий на "показать еще"
let newsObj = ''; // Копия объекта для обработки новостей поштучно
const submitButton = document.querySelector('.main__field-button');
const submitInput = document.querySelector('.main__field-input');
const menuItem = document.querySelector('.header__menu');
const placesList = document.querySelector('.result__container');
const resultButton = document.querySelector('.result__button');
const noResult = document.querySelector('.zero-result');
const loadingResult = document.querySelector('.loading');
const blockResult = document.querySelector('.result');

const newCard = (date, title, description, urlToImage, source) => {
    const card = new Card(date, title, description, urlToImage, source);
    return card.create();
  };

const cardsList = new CardList (placesList, newCard);
//Переменные для валидации
const searchInput = document.forms.searchInput;
// const fieldInput = searchInput.elements;
const validText = new FormValidator(searchInput);

function addCard(event) {
    event.preventDefault();
    cardsList.addNewCard(inputText.value, inputImg.value)
    cardsList.addNewCard(inputText.value, inputImg.value)
  };

// Функция для фомирования ссылки
function linkCreation(){
    // Формирование ссылки
    const newsLink= `https://nomoreparties.co/news/v2/everything?q=${q}&from=${fromDate}&to=${toDate}&pageSize=${pSize}&apiKey=${newsToken}`;
    // Создание экземпляра класса
    let objRequest = new Api({
        url: `${newsLink}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return objRequest;
}

export default function dateFormat (obj){
    const months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
    const pubDate = new Date(obj.publishedAt); // Преобразование даты новости
    const date = pubDate.getDate() + ' ' + months[pubDate.getUTCMonth()] +', ' + pubDate.getUTCFullYear();
    return date;
}

// Функция увеличения счетчика количества уже отображенных на странице новостей
function numberPlus () {
    shMore = shMore + 3;
    return shMore;
  }

// Функция добавления первых 3х карточек массива и добавления послежующих при нажатии "показать еще"
function showMore(obj){
    let nwsArr = obj.articles; // Копирование массива с новостями, без totalResults
    if ((cntShMore + 3) >= Object.keys(nwsArr).length) { // скрытие кнопки "показать еще" при достижении конца массива
        resultButton.classList.add('hidden');
    }
    for (let i = cntShMore; i <= shMore && i <= pSize-1; i++){
        if (nwsArr[i].urlToImage == null) {nwsArr[i].urlToImage = './src/images/image_08.jpg';} // Если нет изображения то подставить стандартную картинку
        cardsList.addNewCard(dateFormat(nwsArr[i]), nwsArr[i].title, nwsArr[i].description, nwsArr[i].urlToImage, nwsArr[i].source.name,);
    }
    cntShMore = shMore + 1; // Увеличение счетчика для количества нажатия кнопки "показать еще"
}

validText.setEventListeners();

// Слушатели событий
menuItem.addEventListener('click', () => popUpImage.close());

resultButton.addEventListener('click', () => { // Событие нажатия кнопки "показать еще"
    numberPlus();
    showMore(newsObj);
  });

submitButton.addEventListener('click', function (event) { // Событие нажатия кнопки "искать"
    event.preventDefault();
    // Скрытие и отображение блоков
    blockResult.classList.add('hidden');
    noResult.classList.add('hidden');
    loadingResult.classList.remove('hidden');
    shMore = 2; // Изменяем счетчик для количества отображаемых карточек в массиве с 0 по 2
    cntShMore = 0; // Обнуляем счетчик для количества нажатия кнопки "показать еще"
    q = submitInput.value; // Присвоение ключевого слова для формирования ссылки
    while(placesList.firstChild){ // Удаление отрисованных новостей
        placesList.removeChild(placesList.firstChild);
    }
    linkCreation().getInfo() // Запрос новостей с свойствами полученными при формировании ссылки
        .then((result) => {
            if (result.totalResults == 0){
                // Скрытие и отображение блоков
                loadingResult.classList.add('hidden');
                noResult.classList.remove('hidden');
                return result;  
            }
            else {
                localStorage.clear();
                localStorage.setItem('keyword',JSON.stringify(q)); // Запись ключевого слова в localStorage
                localStorage.setItem('object',JSON.stringify(result)); // Запись ключевого слова в localStorage
                return result;
            }
            })
        .then((result) => {
            // Скрытие и отображение блоков
            loadingResult.classList.add('hidden');
            blockResult.classList.remove('hidden'); // Отображение блока результатов при поиске
            newsObj = result; // Создание копии объекта для поштучной обработки новостей
            if (result.totalResults != 0){
                showMore(newsObj); // Вызов функции для отрисовки первых shMore с 0 по 2 карточек
                resultButton.classList.remove('hidden'); // Отображение кнопки "показать еще"
            }
            else{
                blockResult.classList.add('hidden'); // Отображение кнопки "показать еще"
            }
            
        })
        .catch((err) => {
                console.log(err)
            });
});