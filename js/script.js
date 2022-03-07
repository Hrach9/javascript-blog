'use strict'; //Dzięki niej nasz kod będzie uruchamiany w "trybie ścisłym". Pomyłki, które normalnie nie wywołałyby błędu, teraz będą traktowane jak błąd i wyświetlane na czerwono w konsoli, znajdującej się w narzędziach developerskich przeglądarki.

function titleClickHandler(event) {
    console.log('Link was clicked!');

    event.preventDefault(); //wyłączenie domyślnego zachowania przeglądarki przy kliknięciu w linki

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active'); //znaleźć wszystkie linki z klasą active,

    for (let activeLink of activeLinks) { //zastosować pętlę, aby dla każdego z nich:
        activeLink.classList.remove('active'); // usunąć klasę active.
    }

    /* [IN PROGRTES] add class 'active' to the clicked link */
    const clickedElement = this; //Dzięki temu w całej funkcji będziemy mogli używać clickedElement, bez zastanawiania się, co w tym miejscu oznacza this.
    console.log('clickedElement:', clickedElement);
    clickedElement.add('active'); // dodajemy klasę active.


    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.post.active');

    for (let activeArticle of activeArticles) { //zastosować pętlę, aby dla każdego z nich:
        activeArticle.classList.remove('active'); // usunąć klasę active. 
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href"); // Zadeklarujemy nową stałą o nazwie articleSelector i Znajdziemy teraz jego atrybut href

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.add('active'); // dodajemy klasę active na poprawny artykuł
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}