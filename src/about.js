import "./style.css";
import Api from "./js/api.js";
// import Swiper JS
// import Swiper, { Navigation, Pagination } from 'swiper';
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';


// let objCommits = {};
// Формирование ссылки
const commitsLink= `https://api.github.com/repos/sashamoleva/sashamoleva.github.io-diplom/commits`;
// Создание экземпляра класса
let getCommits = new Api({
    url: `${commitsLink}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const swpCont = document.querySelector('.swiper-wrapper');    

// Swiper.use([Navigation, Pagination]);
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 30,
    // slidesPerGroup: 3,
    // loop: true,
    // loopFillGroupWithBlank: true,
    // slidesPerColumnFill: row,
    fadeEffect: {
        crossFade: true
      },
    mousewheel: true,
    keyboard: {
        enabled: true,
      },

    observer: true, 
    observeParents: true,
    autoHeight: true,
    preventInteractionOnTransition: true,

  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });

function dateFormat (obj){
    const months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
    const pubDate = new Date(obj.commit.author.date); // Преобразование даты новости
    const date = pubDate.getDate() + ' ' + months[pubDate.getUTCMonth()] +', ' + pubDate.getUTCFullYear();
    return date;
}

function showCommit(obj){
    for (const elem of Object.values(obj)){
        // <div class="history__item"></div>
        const markup = `
            <div class="swiper-slide"">
                <p class="swiper-slide__date">${dateFormat(elem)}</p>
                <div class="swiper-slide__text-container">
                    <img class="swiper-slide__image" src="${elem.author.avatar_url}" alt="фото автора">
                    <h4 class="swiper-slide__author">${elem.commit.author.name}</h4>
                    <p class="swiper-slide__mail">${elem.commit.author.email}</p>
                </div>
                <p class="swiper-slide__text">${elem.commit.message}</p>
            </div>`;
        swpCont.insertAdjacentHTML('afterbegin', markup);
    };
}

getCommits.getInfo()
    .then((result) => {
        showCommit(result);
        })
    .catch((err) => {
        console.log(err)
    });