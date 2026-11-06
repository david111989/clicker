const GOAL = 1000000;
const items = [
  { name: "Лимонадный ларёк", cost: 15,     income: 0.1 },
  { name: "Кофейня",          cost: 100,    income: 1 },
  { name: "Магазин",          cost: 1100,   income: 8 },
  { name: "Завод",            cost: 12000,  income: 47 },
  { name: "Банк",             cost: 130000, income: 260 }
];

let state = JSON.parse(localStorage.getItem("save")) ||
  { money: 0, total: 0, owned: items.map(() => 0), time: Date.now() };
let won = false;

const elMoney = document.getElementById("money");
const elIncome = document.getElementById("income");
const elBar = document.getElementById("bar");
const shop = document.getElementById("shop");

const cost = i => Math.floor(items[i].cost * Math.pow(1.15, state.owned[i]));
const perSec = () => items.reduce((s, it, i) => s + it.income * state.owned[i], 0);
const fmt = n => "$" + Math.floor(n).toLocaleString("ru-RU");

function save() {
  state.time = Date.now();
  localStorage.setItem("save", JSON.stringify(state));
}

function earn(x) { state.money += x; state.total += x; }

const buttons = items.map((it, i) => {
  const b = document.createElement("button");
  b.className = "item";
  b.onclick = () => {
    if (state.money >= cost(i)) {
      state.money -= cost(i);
      state.owned[i]++;
      update(); save();
    }
  };
  shop.appendChild(b);
  return b;
});

function update() {
  elMoney.textContent = fmt(state.money);
  elIncome.textContent = "+" + perSec().toFixed(1) + " $/сек";
  elBar.style.width = Math.min(100, state.total / GOAL * 100) + "%";
  items.forEach((it, i) => {
    buttons[i].textContent =
      it.name + " (" + state.owned[i] + ") — " + fmt(cost(i)) + " · +" + it.income + "/сек";
    buttons[i].disabled = state.money < cost(i);
  });
  if (state.total >= GOAL && !won) {
    won = true;
    alert("🎉 Вы миллионер!");
  }
}

document.getElementById("tap").onclick = () => { earn(1); update(); };

document.getElementById("reset").onclick = () => {
  if (confirm("Сбросить весь прогресс?")) {
    localStorage.removeItem("save");
    location.reload();
  }
};

// офлайн-доход (максимум 8 часов)
const away = Math.min((Date.now() - state.time) / 1000, 8 * 3600);
const offlineGain = perSec() * away;
if (offlineGain >= 1) {
  earn(offlineGain);
  alert("Пока вас не было, вы заработали " + fmt(offlineGain));
}

setInterval(() => { earn(perSec() / 10); update(); }, 100);
setInterval(save, 5000);
update();