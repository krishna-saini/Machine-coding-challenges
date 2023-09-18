/**
 * create an auto suggestion box in vanilla JS
 * create a suggestion area bottom to the input box that show the list
 * the list is visible when input is in focus
 * on typing, show result with 0-200 ms latency and may fail
 * if a suggestion is clicked, populate the input box with its value
 * and bring input box in focus
 */

// IIFE to encapsulate the variables as variables are function
// scoped and this will keep code abstracted so that it does not
// conflict
(function () {
  const searchEl = document.querySelector(".search");
  const suggestionArea = document.querySelector(".suggestion-area");

  const onFocus = (e) => {
    suggestionArea.style.display = "block";
  };

  const onOverlayClick = (e) => {
    suggestionArea.style.display = "none";
  };

  const processData = async (value) => {
    // base case
    if (!value) {
      suggestionArea.innerHTML = "";
      return;
    }
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
      );
      const data = await response.json();

      if (data.length > 0) {
        const list = document.createElement("ul");
        data.forEach((el) => {
          const listItems = document.createElement("li");
          listItems.innerText = el.title;
          list.appendChild(listItems);
        });
        suggestionArea.appendChild(list);
      }
    } catch (error) {
      console.log("error occurred while making network call", error);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    processData(value);
  };

  searchEl.addEventListener("focus", onFocus);
  searchEl.addEventListener("blur", onOverlayClick);
  searchEl.addEventListener("keyup", onChange);
})();
