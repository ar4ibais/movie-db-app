/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


const ads = document.querySelectorAll('.promo__adv img'),
    genre = document.querySelector('.promo__genre'),
    bg = document.querySelector('.promo__bg'),
    movieList = document.querySelector('.promo__interactive-list'),
    movies = document.querySelectorAll('.promo__interactive-item'),
    form = document.querySelector('.add'),
    subBtn = form.querySelector('button'),
    input = form.querySelector('input'),
    checkBox = form.querySelector('[type="checkbox"]');

ads.forEach(ad => {
    ad.remove();
});

genre.textContent = 'драма';

bg.style.cssText = `
    background: url(img/bg.jpg) center center/cover no-repeat;
`;

function sortMovies() {
    movieDB.movies.sort();
}

function removeMovies() {
    movieList.innerHTML = '';
}


function addMovie() {
    removeMovies();
    sortMovies();
    movieDB.movies.forEach((movie, i) => {
        movieList.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${movie}
                <div class="delete"></div>
            </li>
        `;
    });
}

addMovie();


subBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value != '' && input.value.length <= 21) {
        movieDB.movies.push(input.value);
        addMovie();
    }
    if (input.value.length > 21) {
        movieDB.movies.push(`${input.value.slice(0, 22)}...`);
        addMovie();
    }
    if (checkBox.checked) {
        console.log('Добавляем любимый фильм');
    }
    input.value = '';
});


movieList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete')) {
        movieDB.movies.splice(+target.parentElement.textContent[0] - 1, 1);
        addMovie();
    }
});