'use strict'; //Dzięki niej nasz kod będzie uruchamiany w "trybie ścisłym". Pomyłki, które normalnie nie wywołałyby błędu, teraz będą traktowane jak błąd i wyświetlane na czerwono w konsoli, znajdującej się w narzędziach developerskich przeglądarki.

function titleClickHandler(event) {
    console.log('Link was clicked!');

    event.preventDefault(); //wyłączenie domyślnego zachowania przeglądarki przy kliknięciu w linki

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active'); //znaleźć wszystkie linki z klasą active,

    for (let activeLink of activeLinks) { //zastosować pętlę, aby dla każdego z nich:
        activeLink.classList.remove('active'); // usunąć klasę active. (usuwamy podświetlenie linku z lewej kolumny)
    }

    /* [DONE] add class 'active' to the clicked link */
    const clickedElement = this; //Dzięki temu w całej funkcji będziemy mogli używać clickedElement, bez zastanawiania się, co w tym miejscu oznacza this.
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active'); // dodajemy klasę active. (dla kliknących linków z lewej kolumny zostaja one podświetlone/pogróbione)


    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.post.active');

    for (let activeArticle of activeArticles) { //zastosować pętlę, aby dla każdego z nich:
        activeArticle.classList.remove('active'); // usunąć klasę active. - Czyli usuwamy active z środkowego ekranu/texstu spowoduje to ze artykul po srodku się nie włączy podczas kliknięcia na artykuł z lewej kolumny
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href"); // Zadeklarujemy nową stałą o nazwie articleSelector i Znajdziemy teraz jego atrybut href.  czyli przy kliknięciu na link artykul pobieramy jego atrybut 'href'

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector); // znajdujemy poprawny dopasowany atrybut href do artykułu

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active'); // i dodajemy klasę active na poprawny artykuł. i tutaj dopiero zmienia się tekst na środku blogu 
}



//---------

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList - Usunięcie zawartości listy linków:*/
    const titleList = document.querySelector(optTitleListSelector) //.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector);
    let linkHTML = "";

    /* for each article */

    let interation = 1;

    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute("id"); //odczytujemy atrybuty elementu - Zadeklarowaliśmy nową stałą o nazwie id i przypisz jej wartość argumentu id

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerText; //odnalezienia elementu oraz odczytania jego zawartości.

        /* create HTML of the link */
        // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


        if (interation === 1) {
            linkHTML += `<li> <a href = "#${articleId}" class = "active"><span> ${articleTitle} </span></a></li>`;
        } else {
            linkHTML += `<li> <a href = "#${articleId}"><span> ${ articleTitle } </span></a></li>`;
        }
        interation++;
        /* insert link into html variable */
        //titleList.innerHTML = titleList.innerHTML + linkHTML;

    }

    titleList.innerHTML = linkHTML;



}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}