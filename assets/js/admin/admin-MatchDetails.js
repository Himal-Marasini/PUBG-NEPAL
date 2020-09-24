(() => {
  const winner_btn = document.querySelectorAll(".btn--winner");

  // Update Match Form Input Variables
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const match_type = document.getElementById("match-type");
  const match_device = document.getElementById("match-device");
  const match_map = document.getElementById("match-map");
  const fee = document.getElementById("fee");
  const winning_prize = document.getElementById("winning_prize");
  const match_status = document.getElementById("match-status");
  const match_id = document.querySelector(".match_id");

  // Winning Team Form Input Variable
  let team_name = document.getElementById("team_name");
  let user_id = document.getElementById("user_id");
  let member_one_name = document.getElementById("member_one_name_input");
  let member_one_char = document.getElementById("member_one_char");
  let member_two_name = document.getElementById("member_two_name_input");
  let member_two_char = document.getElementById("member_two_char");
  let member_three_name = document.getElementById("member_three_name_input");
  let member_three_char = document.getElementById("member_three_char");
  let member_four_name = document.getElementById("member_four_name_input");
  let member_four_char = document.getElementById("member_four_char");

  const winning_team_error_wrapper = document.getElementById("winningTeam-error--wrapper");
  const winning_team_success_wrapper = document.getElementById("winningTeam-success--wrapper");

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

  btn_updateWinners.addEventListener("click", async () => {
    // Front End Validate
    if (!validateInput(team_name.value)) return false;
    if (!validateInput(user_id.value)) return false;

    const inputData = {
      match_id: match_id.textContent,
      winners: {
        user_id: user_id.value,
        team_name: team_name.value,
        members: [
          { name: member_one_name.value, character_id: member_one_char.value },
          { name: member_two_name.value, character_id: member_two_char.value },
          { name: member_three_name.value, character_id: member_three_char.value },
          { name: member_four_name.value, character_id: member_four_char.value }
        ]
      }
    };

    try {
      // Show Spinner
      btn_updateWinners_spinner.style.display = "block";
      btn_updateWinners.style.display = "none";

      const res = await fetch("/admin/v1/update-match/winner-highlights/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(inputData)
      });

      const data = await res.json();

      if (res.status !== 200) {
        // Hide Spinner
        btn_updateWinners_spinner.style.display = "none";
        btn_updateWinners.style.display = "block";
        console.log(data);
        winning_team_error_wrapper.style.display = "block";
        winning_team_error_wrapper.textContent = data.message;
        return;
      }
      // Hide Spinner
      btn_updateWinners_spinner.style.display = "none";
      btn_updateWinners.style.display = "block";

      winning_team_success_wrapper.style.display = "block";
      winning_team_success_wrapper.textContent = data.message;
    } catch (err) {
      // Hide Spinner
      btn_updateWinners_spinner.style.display = "none";
      btn_updateWinners.style.display = "block";

      winning_team_error_wrapper.style.display = "block";
      winning_team_error_wrapper.textContent = err;
    }
  });

  btn_updateMatchStatus.addEventListener("click", () => {
    const date_val = date.value;
    const time_val = time.value;
    const match_type_val = match_type.value;
    const match_device_val = match_device.value;
    const match_map_val = match_map.value;
    const fee_val = fee.value;
    const winning_prize_val = winning_prize.value;
    const match_status_val = match_status.value;
    console.log(match_type_val);
  });

  function validateInput(inputData) {
    if (inputData == "" || inputData.length == 0) {
      winning_team_error_wrapper.textContent =
        "No winner has been selected !! Please select the winner.";
      winning_team_error_wrapper.style.display = "block";
      setTimeout(function () {
        winning_team_error_wrapper.style.display = "none";
      }, 9000);
      return false;
    }
    return true;
  }
})();
