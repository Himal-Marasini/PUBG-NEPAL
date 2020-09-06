(() => {
  const btn = document.getElementById("btn-submit");
  const errorContainer = document.querySelector(".error-wrapper");
  const errorText = document.querySelector(".text-message");

  btn.addEventListener("click", async function (e) {
    const email = document.getElementById("email");
    const emailValue = email.value;

    if (emailValue == " " || emailValue.length == 0) {
      errorContainer.style.display = "block";
      errorText.textContent = "Please enter your email address";
      setTimeout(function () {
        errorContainer.style.display = "none";
      }, 5000);
      return;
    }

    const res = await fetch("/login/identity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailValue })
    });

    const data = await res.json();

    if (res.status !== 200) {
      errorContainer.style.display = "block";
      errorText.innerHTML = data.message;
      setTimeout(function () {
        errorContainer.style.display = "none";
      }, 10000);
      throw new Error(data.message);
    }

    errorContainer.classList = "success-wrapper";
    errorContainer.style.display = "block";
    errorText.innerHTML = data.message;

    setTimeout(function () {
      errorContainer.classList = "error-wrapper";
      errorContainer.style.display = "none";
    }, 7000);
  });
})();
