(() => {
  const btn_logout = document.querySelector(".logout-wrapper");

  btn_logout.addEventListener("click", function () {
    fetch("/logout", {
      method: "GET"
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });
})();
