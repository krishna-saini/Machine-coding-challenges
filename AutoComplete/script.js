(function () {
    const searchEl = document.querySelector('.search')
    // const suggestionArea = document.getElementByClassName('suggestion-area');

    console.log(searchEl);


    const onFocus = (e) => {
        suggestionArea.style.display = 'block'
    }

    searchEl.addEventListener('focus', onFocus);
})();

