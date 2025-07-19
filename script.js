const bannedGuns = [7,8,12,11,16,17,18,35,36,37,39,40,42,44];

let playerIds = [];

const idList = document.getElementById('idList');
const commandOutput = document.getElementById('commandOutput');
const errorBox = document.getElementById('errorBox');
const resetBtn = document.getElementById('resetBtn');
const tpCheck = document.getElementById('tpCheck');
const generateBtn = document.getElementById('generateBtn');
const fileInput = document.getElementById('fileInput');
const themeToggleBtn = document.getElementById('themeToggle');

function showError(msg) {
  errorBox.style.display = 'block';
  errorBox.textContent = msg;
}

function clearError() {
  errorBox.style.display = 'none';
  errorBox.textContent = '';
}

function updateGenerateState() {
  generateBtn.disabled = playerIds.length === 0;
}

function addPlayer() {
  const input = document.getElementById('playerIdInput');
  const id = input.value.trim();
  if (!/^\d+$/.test(id)) {
    showError('ID должен содержать только цифры');
    input.value = '';
    return;
  }
  if (playerIds.includes(id)) {
    showError('Такой ID уже добавлен');
    input.value = '';
    return;
  }
  playerIds.push(id);
  updateIdList();
  input.value = '';
  clearError();
  updateGenerateState();
}

function updateIdList() {
  idList.innerHTML = '';
  playerIds.forEach(id => {
    const span = document.createElement('span');
    span.textContent = id;
    span.title = 'Кликните, чтобы удалить';
    span.onclick = () => {
      playerIds = playerIds.filter(x => x !== id);
      updateIdList();
      updateGenerateState();
      clearError();
    };
    idList.appendChild(span);
  });
}

function clearPlayers() {
  playerIds = [];
  updateIdList();
  resetCommands();
  clearError();
  updateGenerateState();
}

function validateNumber(value, min, max) {
  if (!value) return null;
  if (!/^\d+$/.test(value)) return false;
  const num = parseInt(value, 10);
  if (num < min || num > max) return false;
  return num;
}

function generateCommands() {
  clearError();
  commandOutput.innerHTML = '';

  if (playerIds.length === 0) {
    showError('Добавьте хотя бы одного игрока');
    return;
  }

  const skin1 = document.getElementById('skin1').value.trim();
  const skin2 = document.getElementById('skin2').value.trim();
  const weaponIdStr = document.getElementById('weaponId').value.trim();
  const ammoStr = document.getElementById('ammo').value.trim();
  const hpStr = document.getElementById('health').value.trim();
  const armorStr = document.getElementById('armor').value.trim();

  if (skin1 && !/^\d+$/.test(skin1)) {
    showError('Скин 1 должен содержать только цифры');
    return;
  }
  if (skin2 && !/^\d+$/.test(skin2)) {
    showError('Скин 2 должен содержать только цифры');
    return;
  }

  if (weaponIdStr && !/^\d+$/.test(weaponIdStr)) {
    showError('ID оружия должен быть числом');
    return;
  }

  let weaponId = weaponIdStr ? parseInt(weaponIdStr, 10) : null;
  if (weaponId !== null && bannedGuns.includes(weaponId)) {
    showError('Выбранное оружие запрещено к выдаче.');
    return;
  }
  if (weaponId === 38) {
    alert('Внимание: при использовании оружия ID 38 несколькими игроками возможен вылет.');
  }
  if (weaponId === 23) {
    alert('Внимание: у игроков вне силовых структур будет кик античитом при ударе тайзером.');
  }

  const ammo = validateNumber(ammoStr, 0, 2000);
  if (ammo === false) {
    showError('Патроны должны быть числом от 0 до 2000');
    return;
  }

  const hp = validateNumber(hpStr, 0, 150);
  if (hp === false) {
    showError('HP должно быть числом от 0 до 150');
    return;
  }

  const armor = validateNumber(armorStr, 0, 320);
  if (armor === false) {
    showError('Броня должна быть числом от 0 до 320');
    return;
  }

  const half = Math.ceil(playerIds.length / 2);
  const commands = [];

  // Все /get <id> идут вначале, если выбран ТП
  if (tpCheck.checked) {
    playerIds.forEach(id => commands.push(`/get ${id}`));
  }

  playerIds.forEach((id, idx) => {
    if (skin1) {
      const skin = (skin2 && idx >= half) ? skin2 : skin1;
      commands.push(`/tempskin ${id} ${skin}`);
    }
    if (weaponId !== null && ammo > 0) {
      commands.push(`/weapongive ${id} ${weaponId} ${ammo}`);
    }
    if (hp !== null) {
      commands.push(`/sethp ${id} ${hp}`);
    }
    if (armor !== null) {
      commands.push(`/setarmor ${id} ${armor}`);
    }
  });

  if (commands.length === 0) {
    showError('Нет данных для генерации команд');
    return;
  }

  commands.forEach(addCommand);
  resetBtn.style.display = 'inline-block';
}

function addCommand(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = 'command-line';
  div.title = 'Клик для копирования и удаления';
  div.onclick = () => {
    navigator.clipboard.writeText(text);
    div.style.transition = 'opacity 0.4s';
    div.style.opacity = '0';
    setTimeout(() => {
      div.remove();
      if (commandOutput.childElementCount === 0) {
        commandOutput.innerHTML = '<div class="done-text">Все выдано</div>';
        resetBtn.style.display = 'none';
      }
    }, 400);
  };
  commandOutput.appendChild(div);
}

function resetCommands() {
  commandOutput.innerHTML = '';
  resetBtn.style.display = 'none';
}

function applyPreset(name) {
  switch (name) {
    case 'cs':
      document.getElementById('skin1').value = '43';
      document.getElementById('skin2').value = '6840';
      document.getElementById('weaponId').value = '57';
      document.getElementById('ammo').value = '1000';
      document.getElementById('health').value = '150';
      document.getElementById('armor').value = '320';
      break;
    case 'ffa':
      document.getElementById('skin1').value = '45';
      document.getElementById('skin2').value = '';
      document.getElementById('weaponId').value = '57';
      document.getElementById('ammo').value = '1000';
      document.getElementById('health').value = '150';
      document.getElementById('armor').value = '320';
      break;
    case 'bats':
      document.getElementById('skin1').value = '107';
      document.getElementById('skin2').value = '';
      document.getElementById('weaponId').value = '5';
      document.getElementById('ammo').value = '1';
      document.getElementById('health').value = '100';
      document.getElementById('armor').value = '';
      break;
    default:
      break;
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
  // Можно добавить сохранение в localStorage, если нужно
}

function loadFromFile() {
  fileInput.click();
}

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const lines = event.target.result.split(/\r?\n/);
    lines.forEach(line => {
      const id = line.trim();
      if (id && /^\d+$/.test(id) && !playerIds.includes(id)) {
        playerIds.push(id);
      }
    });
    updateIdList();
    updateGenerateState();
  };
  reader.readAsText(file);
});

document.getElementById('addPlayerBtn').onclick = addPlayer;
document.getElementById('clearPlayersBtn').onclick = clearPlayers;
document.getElementById('generateBtn').onclick = generateCommands;
document.getElementById('resetBtn').onclick = resetCommands;
document.getElementById('loadFileBtn').onclick = loadFromFile;
document.getElementById('themeToggle').onclick = toggleTheme;
document.getElementById('presetCS').onclick = () => applyPreset('cs');
document.getElementById('presetFFA').onclick = () => applyPreset('ffa');
document.getElementById('presetBats').onclick = () => applyPreset('bats');
