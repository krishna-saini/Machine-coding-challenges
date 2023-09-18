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
    console.log(e.target, e.target.type, e.type);
    if (e.target.tagName === "INPUT" || e.target === suggestionArea) {
      return;
    }
    suggestionArea.style.display = "none";
  };

  const processData = async (value) => {
    // base case
    suggestionArea.innerHTML = "";
    if (!value) {
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
          const listItem = document.createElement("li");
          listItem.innerText = el.title;
          list.appendChild(listItem);
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

  const onListItemClick = (e) => {
    console.log("cloickjasdklfj", e.target.tagName);
    if (e.target.tagName === "LI") {
      searchEl.value = e.target.innerText;
      input.focus();
    }
  };

  searchEl.addEventListener("focus", onFocus);
  window.addEventListener("blur", onOverlayClick);
  searchEl.addEventListener("keyup", onChange);

  // clicking on any searched result should populate the input box with that result
  // use event delegation
  suggestionArea.addEventListener("click", onListItemClick);
})();
