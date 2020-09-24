import moment from "../../../node_modules/moment/moment";
(() => {
  const btn_search = document.querySelector(".btn-search");
  const search_field = document.getElementById("search-input--field");

  btn_search.addEventListener("click", async function (e) {
    const inputData = search_field.value;
    const isValidDate = moment(inputData, "YYYY-MM-DD", true).isValid();
    console.log(isValidDate);
    // fetch("/admin");
  });
})();
