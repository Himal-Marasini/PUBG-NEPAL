(() => {
  const btn_search = document.querySelector(".btn-search");
  const search_field = document.getElementById("search-input--field");
  const matchSearch_error_wrapper = document.getElementById("matchSearch-error--wrapper");

  btn_search.addEventListener("click", async function (e) {
    const inputData = search_field.value;
    const isValid = moment(inputData, "YYYY-MM-DD", true).isValid();

    if (!isValid) {
      matchSearch_error_wrapper.textContent =
        "Invalid date format: The date format should be YYYY-MM-DD (2020-09-21)";
      matchSearch_error_wrapper.style.display = "block";
      setTimeout(function () {
        matchSearch_error_wrapper.style.display = "none";
      }, 6000);
      return;
    }
    location.replace(`/admin/dashboard?date=${inputData}`);
  });
})();
