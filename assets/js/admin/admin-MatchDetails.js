(() => {
  const winner_btn = document.querySelectorAll(".btn--winner");
  const team_name = document.getElementById("team_name");
  const user_id = document.getElementById("user_id");
  const member_one_name = document.getElementById("member_one_name_input");
  const member_one_char = document.getElementById("member_one_char");
  const member_two_name = document.getElementById("member_two_name_input");
  const member_two_char = document.getElementById("member_two_char");
  const member_three_name = document.getElementById("member_three_name_input");
  const member_three_char = document.getElementById("member_three_char");
  const member_four_name = document.getElementById("member_four_name_input");
  const member_four_char = document.getElementById("member_four_char");

  const btn_discard = document.querySelector(".btn-discard");
  const btn_updateWinners = document.querySelector(".btn-update--details");
  const btn_updateMatchStatus = document.getElementById("btn-match--update");
  const btn_updateWinners_spinner = document.getElementById("btn--update--details-spinner");
  const btn_updateMatchStatus_spinner = document.getElementById("btn-match--update-spinner");

  winner_btn.forEach((el, i) => {
    el.addEventListener("click", function () {
      const winning_team_name = document.querySelectorAll(".team-name");
      const winner_user_id = document.querySelectorAll(".winner_user_id");
      const winning_member_one_name = document.querySelectorAll("#member_one_name");
      const winning_member_one_char = document.querySelectorAll("#member_one_charId");
      const winning_member_two_name = document.querySelectorAll("#member_two_name");
      const winning_member_two_char = document.querySelectorAll("#member_two_charId");
      const winning_member_three_name = document.querySelectorAll("#member_three_name");
      const winning_member_three_char = document.querySelectorAll("#member_three_charId");
      const winning_member_four_name = document.querySelectorAll("#member_four_name");
      const winning_member_four_char = document.querySelectorAll("#member_four_charId");

      team_name.value = winning_team_name[i].textContent.trim();
      user_id.value = winner_user_id[i].textContent.trim();
      member_one_name.value = winning_member_one_name[i].textContent.trim();
      member_one_char.value = winning_member_one_char[i].textContent.trim();
      member_two_name.value = winning_member_two_name[i].textContent.trim();
      member_two_char.value = winning_member_two_char[i].textContent.trim();
      member_three_name.value = winning_member_three_name[i].textContent.trim();
      member_three_char.value = winning_member_three_char[i].textContent.trim();
      member_four_name.value = winning_member_four_name[i].textContent.trim();
      member_four_char.value = winning_member_four_char[i].textContent.trim();

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  });

  btn_discard.addEventListener("click", () => {
    team_name.value = "";
    user_id.value = "";
    member_one_name.value = "";
    member_one_char.value = "";
    member_two_name.value = "";
    member_two_char.value = "";
    member_three_name.value = "";
    member_three_char.value = "";
    member_four_name.value = "";
    member_four_char.value = "";
  });

  btn_updateWinners.addEventListener("click", () => {});
  btn_updateMatchStatus.addEventListener("click", () => {});
})();
