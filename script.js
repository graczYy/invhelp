const players = [],
  idList = document.getElementById("idList"),
  commandOutput = document.getElementById("commandOutput"),
  errorBox = document.getElementById("errorBox"),
  resetBtn = document.getElementById("resetBtn");

function showError(msg) {
  errorBox.innerHTML = `<div class="error">${msg}</div>`;
  setTimeout(() => (errorBox.innerHTML = ""), 3000);
}

function addPlayer() {
  const input = document.getElementById("playerIdInput"),
    id = input.value.trim();
  if (!/^\d+$/.test(id)) {
    showError("ID игрока должен содержать только цифры.");
    input.value = "";
    return;
  }
  if (players.includes(id)) {
    showError("Такой ID уже добавлен.");
    input.value = "";
    return;
  }
  players.push(id);
  const span = document.createElement("span");
  span.textContent = id;
  span.onclick = () => removePlayer(id, span);
  idList.appendChild(span);
  input.value = "";
}

function removePlayer(id, el) {
  const i = players.indexOf(id);
  if (i !== -1) {
    players.splice(i, 1);
    el.remove();
  }
}

function clearPlayers() {
  players.length = 0;
  idList.innerHTML = "";
  commandOutput.innerHTML = "";
  resetBtn.style.display = "none";
}

function resetCommands() {
  commandOutput.innerHTML = "";
  resetBtn.style.display = "none";
}

function generateCommands() {
  commandOutput.innerHTML = "";
  resetBtn.style.display = "none";
  const skin1 = document.getElementById("skin1").value.trim(),
    skin2 = document.getElementById("skin2").value.trim(),
    weaponId = document.getElementById("weaponId").value.trim();
  let ammo = document.getElementById("ammo").value.trim();

  if (skin1 && !/^\d+$/.test(skin1)) {
    showError("Skin 1 должен содержать только цифры.");
    return;
  }
  if (skin2 && !/^\d+$/.test(skin2)) {
    showError("Skin 2 должен содержать только цифры.");
    return;
  }

  if (ammo === "") ammo = 0;
  ammo = parseInt(ammo);
  if (ammo > 2000) {
    showError("Максимум патронов — 2000.");
    return;
  }

  if (skin1) {
    const half = Math.floor(players.length / 2);
    players.forEach((id, idx) =>
      addCommand(`/tempskin ${id} ${(skin2 && idx >= half) ? skin2 : skin1}`)
    );
  }
  if (weaponId && ammo > 0) {
    players.forEach((id) => {
      addCommand(`/weapongive ${id} ${weaponId} ${ammo}`);
    });
  }

  if (commandOutput.children.length) resetBtn.style.display = "inline-block";
}

function addCommand(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = "command-line";
  div.onclick = () => {
    navigator.clipboard.writeText(text);
    div.classList.add("fade-out");
    setTimeout(() => {
      div.remove();
      checkDone();
    }, 400);
  };
  commandOutput.appendChild(div);
}

function checkDone() {
  if (!commandOutput.children.length) {
    commandOutput.innerHTML = `<div class="done-text">✅ Все выдано</div>`;
    resetBtn.style.display = "none";
  }
}
