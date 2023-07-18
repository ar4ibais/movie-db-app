/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

window.addEventListener('DOMContentLoaded', () => {
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
        addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('input'),
        checkBox = addForm.querySelector('[type="checkbox"]');


    const deleteAds = arr => {
        arr.forEach(item => {
            item.remove();
        });
    };

    deleteAds(ads);

    const makeChanges = () => {
        genre.textContent = 'драма';

        bg.style.cssText = `
            background: url(img/bg.jpg) center center/cover no-repeat;
        `;
    };

    const sortArr = arr => {
        arr.sort();
    };

    makeChanges();


    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(movieDB.movies);

        films.forEach((movie, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${movie}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }


    createMovieList(movieDB.movies, movieList);

    addForm.addEventListener('submit', e => {
        e.preventDefault();

        let newFilm = addInput.value,
            favourite = checkBox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substr(0, 22)}...`;
            }
            if (favourite) {
                console.log('Добавляем новый фильм');
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        addForm.reset();
    });

});