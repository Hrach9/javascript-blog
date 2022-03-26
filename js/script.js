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
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

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



        if (interation === 1) {
            linkHTML += `<li> <a href = "#${articleId}" class = "active"><span> ${articleTitle} </span></a></li>`;
        } else {
            linkHTML += `<li> <a href = "#${articleId}"><span> ${ articleTitle } </span></a></li>`;
        }
        interation++;
        /* insert link into html variable */

    }

    titleList.innerHTML = linkHTML;



}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

//--------

function generateTags() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
        const articleId = article.getAttribute("id");
        /* find tags wrapper */
        const titleList = article.querySelector(optArticleTagsSelector);
        505

        /* make html variable with empty string */
        let html = "";

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute("data-tags");

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');

        /* START LOOP: for each tag */
        let linkHTML = '';
        for (let tag of articleTagsArray) {



            /* generate HTML of the link */
            linkHTML += `<li> <a href = "#${tag}" class = "active"><span> ${articleTags} </span></a></li>`; //nie wiem czy dobrze 


            /* add generated code to html variable */

        }
        titleList.innerHTML = linkHTML;
        /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

    }
    /* END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('clicked tag');
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }
    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let tagLinkHref of tagLinksHref) {
        tagLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(allLinksToTags);
    for (let link of allLinksToTags) {
        link.addEventListener('click', tagClickHandler);
    }
}
addClickListenersToTags();

function calculateAuthorParams(authors) {
    const authorParams = { max: 0, min: 999999 };
    for (let author in authors) {
        console.log(author + ' is used ' + authors[author] + ' times');
        if (authors[author] > authorParams.max) {
            authorParams.max = authors[author];
        }
        if (authors[author] < authorParams.min) {
            authorParams.min = authors[author];
        }
    }
    return authorParams;
}

function generateAuthors() {
    //NEW
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const titleList = article.querySelector(optArticleAuthorSelector);
        let html = '';
        const authorTags = article.getAttribute('data-author');
        //const authorLinkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
        const authorLinkHTMLData = { id: authorTags, title: authorTags };
        const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
        html = html + authorLinkHTML;
        //NEW
        if (!allAuthors[authorTags]) {
            allAuthors[authorTags] = 1;
        } else {
            allAuthors[authorTags]++;
        }
        titleList.innerHTML = html;
    }
    const authorsList = document.querySelector(optAuthorsListSelector);
    const authorParams = calculateAuthorParams(allAuthors);
    console.log('authorParams', authorParams);
    const allAuthorsData = { authors: [] };
    for (let author in allAuthors) {
        //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorParams) + '" href="#author-' + author + '">' + author + '</a></li>';
        //const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] +') ' + '</a></li> ';
        //allAuthorsHTML += authorLinkHTML;
        allAuthorsData.authors.push({
            author: author,
            count: allAuthors[author],
        });
    }
    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#author-', '');
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.remove('active');
    }
    const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLinkHref of authorLinksHref) {
        authorLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
    for (let link of allLinksToAuthors) {
        link.addEventListener('click', authorClickHandler);
    }
}
addClickListenersToAuthors();