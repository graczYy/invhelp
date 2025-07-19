const css = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial;
}

html, body {
  height: 100%;
  background: #0f0f0f;
  color: #f0f0f0;
  transition: background 0.3s, color 0.3s;
}

body.light {
  background: #f9f9f9;
  color: #222;
}

.container {
  display: flex;
  min-height: 100vh;
  padding: 30px 40px;
  gap: 30px;
  box-sizing: border-box;
}

.main {
  flex: 1 1 0;
  max-width: 720px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #4caf50;
}

body.light h1 {
  color: #2e7d32;
}

h3 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #ccc;
}

body.light h3 {
  color: #555;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  max-width: 320px;
  padding: 12px 15px;
  margin: 6px 0 15px 0;
  border-radius: 8px;
  border: 1.5px solid #333;
  background-color: #1e1e1e;
  color: #eee;
  font-size: 1rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

body.light input[type="text"],
body.light input[type="number"],
body.light select {
  background-color: #fff;
  border-color: #bbb;
  color: #222;
}

input:focus {
  border-color: #4caf50;
  outline: none;
}

button {
  background-color: #4caf50;
  border: none;
  color: #fff;
  padding: 12px 20px;
  margin: 8px 8px 8px 0;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #777;
  cursor: not-allowed;
}

.id-list {
  margin-top: 10px;
  max-width: 320px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.id-list span {
  background-color: #222;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

body.light .id-list span {
  background-color: #ddd;
  color: #222;
}

.id-list span:hover {
  background-color: #3a0000;
  color: #fff;
}

body.light .id-list span:hover {
  background-color: #c00;
  color: #fff;
}

.commands {
  margin-top: 20px;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.command-line {
  background-color: #1c1c1c;
  padding: 12px 15px;
  border-radius: 6px;
  border: 1px solid #2e2e2e;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.4s ease;
  user-select: none;
  font-family: calibri;
  word-break: break-word;
}

body.light .command-line {
  background-color: #eee;
  border-color: #ccc;
  color: #222;
}

.command-line:hover {
  background-color: #333;
}

body.light .command-line:hover {
  background-color: #ccc;
}

.fade-out {
  opacity: 0 !important;
  transition: opacity 0.4s ease !important;
}

#errorBox {
  margin-top: 10px;
  max-width: 320px;
  min-height: 26px;
  font-weight: 600;
  color: #ff4c4c;
  background: rgba(255, 76, 76, 0.1);
  border-left: 4px solid #ff4c4c;
  border-radius: 6px;
  padding: 10px 15px;
  display: none;
  user-select: none;
  animation: fadeIn 0.3s ease forwards;
}

.done-text {
  color: #4caf50;
  font-size: 1.1rem;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
  animation: fadeIn 0.3s ease forwards;
}

.sidebar {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
}

.link-button {
  background-color: #222;
  color: #fff;
  text-align: center;
  padding: 12px 15px;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid #444;
  transition: background-color 0.3s ease;
}

.link-button:hover {
  background-color: #333;
}

body.light .link-button {
  background-color: #eee;
  color: #222;
  border-color: #ccc;
}

body.light .link-button:hover {
  background-color: #ddd;
}

#resetBtn {
  display: none;
  margin-top: 20px;
}

.presets {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.presets button {
  flex: 1 1 calc(33% - 12px);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  user-select: none;
  font-weight: 600;
  font-size: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
    padding: 20px;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .main {
    max-width: 100%;
  }
  input[type="text"],
  input[type="number"],
  select,
  .id-list {
    max-width: 100%;
  }
  .presets button {
    flex: 1 1 100%;
  }
}

.input {
  width: 100%;
  max-width: 320px;
  padding: 12px 15px;
  margin: 6px 0 15px 0;
  border-radius: 8px;
  border: 1.5px solid #333;
  background-color: #1e1e1e;
  color: #eee;
  font-size: 1rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

body.light .input {
  background-color: #fff;
  border-color: #bbb;
  color: #222;
}

.input:focus {
  border-color: #4caf50;
  outline: none;
}

