import "./style.css"
import ItemsList from "./js/api.js";
import AnalyticsItem from "./js/api.js";

const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
let analytics = {}; // Массив объектов { дата : количество упоминаний }
let dayZ = []; // Массив дат для аналитики
const kWord = document.querySelector('.answer__title');
const newsText = document.querySelector('.answer__news-text');
const newsTitles = document.querySelector('.answer__news-titles');
const tabCont = document.querySelector('.tabel__container');

// Функция формирования массива дат для отрисовки графика аналитики
function dayZAnalistycs(){
    for (let i = 0; i <= 6; i++ ){
        let currDate = new Date(new Date().getTime() - (86400000*i));
        dayZ[i] = currDate.getDate() + ',' + getWeekDay(currDate);
    }
}

// Функция определения дня недели
function getWeekDay(date) {
    return days[date.getDay()];
  }
  
// Функция подсчета вхождений keyword в зааголовки и содержание, расчета аналитики
function countMember(obj, kwrd){
    let word = kwrd.replace(/"/g,''); // очистка значения от "
    let countAll = 0; // Счетчик упоминаний
    for (const elem of Object.values(obj.articles)){
        if ((elem.title.indexOf(word)) || (elem.description.indexOf(word))) {
            countAll++;
        }
        let date = new Date(elem.publishedAt); // Создание объекта даты
        let day_date = date.getDate() + ',' + getWeekDay(date); // Формирование значений ключей для аналитики дата + день недели
        // Наполнение объекта днями недели и количеством упоминаний
        if (day_date in analytics) {
            analytics[day_date] += 1;
        }
        else {
            analytics[day_date] = 1;
        }
    }
    return countAll;
}

// Вывод аналитики
kWord.textContent = 'Вы спросили: «' + localStorage.getItem('keyword').replace(/"/g,'') + '»';
newsText.textContent = 'Новостей за неделю: ' + JSON.parse(localStorage.getItem('object')).totalResults;
newsTitles.textContent = 'Упоминаний в заголовках: ' + countMember(JSON.parse(localStorage.getItem('object')), localStorage.getItem('keyword'));

dayZAnalistycs(); // Вызов функции формирования массива дат для графика аналитики
dayZ.reverse(); // Вызов функции переворота массива для вывода даты от меньшей к большей

// Цикл орисовки элементов аналитики и их наполнение
dayZ.forEach(element => {
    const markup = `
        <div class="tabel__item">
            <p class="tabel__item_date">${element}</p>
            <div class="tabel__item_strip">
                <div style="width:${analytics[element]}%"; class="tabel__item_size">
                    <p class="tabel__item_size-text">${analytics[element]}</p>
                </div>
            </div>
        </div>`;
    tabCont.insertAdjacentHTML('beforeEnd', markup);
});