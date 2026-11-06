const GOAL = 1000000;

const items = [
  { name: "Лимонадный ларёк", cost: 15,     income: 0.1 },
  { name: "Кофейня",          cost: 100,    income: 1 },
  { name: "Магазин",          cost: 1100,   income: 8 },
  { name: "Завод",            cost: 12000,  income: 47 },
  { name: "Банк",             cost: 130000, income: 260 }
];

/* ================= КАТАЛОГ МАГАЗИНА =================
   Новая вещь = одна строка C(id, название, цена, svg-код).
   Координаты персонажа: центр x=200, голова y≈95, ноги до y≈325. */
const C = (id, name, cost, svg, back) => ({ id, name, cost, svg, back });

const car = (c, top = 264, extra = "") => `
<rect x="365" y="284" width="145" height="28" rx="9" fill="${c}"/>
<path d="M390 286 L405 ${top} H465 L487 286Z" fill="${c}"/>
<path d="M398 284 L409 ${top + 5} H432 V284Z" fill="#bfdbfe"/>
<path d="M438 284 V${top + 5} H462 L478 284Z" fill="#bfdbfe"/>
<rect x="504" y="290" width="8" height="8" rx="2" fill="#fde047"/>
<rect x="364" y="290" width="6" height="8" rx="2" fill="#ef4444"/>
${extra}
<circle cx="392" cy="311" r="14" fill="#111"/><circle cx="392" cy="311" r="6" fill="#9ca3af"/>
<circle cx="485" cy="311" r="14" fill="#111"/><circle cx="485" cy="311" r="6" fill="#9ca3af"/>`;

const catalog = {
  top: { title: "Верх", items: [
    C("tshirt", "Футболка", 40, `<rect x="141" y="132" width="26" height="38" rx="11" fill="#ef4444"/><rect x="233" y="132" width="26" height="38" rx="11" fill="#ef4444"/><rect x="164" y="128" width="72" height="94" rx="12" fill="#ef4444"/>`),
    C("hoodie", "Худи", 400, `<rect x="141" y="132" width="26" height="90" rx="11" fill="#6b7280"/><rect x="233" y="132" width="26" height="90" rx="11" fill="#6b7280"/><rect x="164" y="128" width="72" height="108" rx="12" fill="#6b7280"/><rect x="180" y="200" width="40" height="24" rx="6" fill="#4b5563"/><path d="M178 126 Q200 150 222 126 L228 138 Q200 160 172 138Z" fill="#4b5563"/><path d="M193 140 V162 M207 140 V162" stroke="#e5e7eb" stroke-width="2"/>`),
    C("shirt", "Рубашка с галстуком", 3000, `<rect x="141" y="132" width="26" height="86" rx="11" fill="#f8fafc"/><rect x="233" y="132" width="26" height="86" rx="11" fill="#f8fafc"/><rect x="164" y="128" width="72" height="96" rx="12" fill="#f8fafc"/><path d="M186 128 L200 146 L214 128Z" fill="#e2e8f0"/><path d="M196 140 L204 140 L208 195 L200 207 L192 195Z" fill="#dc2626"/>`),
    C("suit", "Костюм", 25000, `<rect x="141" y="132" width="26" height="90" rx="11" fill="#1e293b"/><rect x="233" y="132" width="26" height="90" rx="11" fill="#1e293b"/><rect x="164" y="128" width="72" height="112" rx="12" fill="#1e293b"/><path d="M184 128 L200 180 L216 128Z" fill="#f8fafc"/><path d="M196 140 L204 140 L206 175 L200 182 L194 175Z" fill="#dc2626"/><path d="M184 128 L200 192 M216 128 L200 192" stroke="#0f172a" stroke-width="3"/>`)
  ]},
  bottom: { title: "Низ", items: [
    C("shorts", "Шорты", 30, `<rect x="167" y="212" width="66" height="12" fill="#f59e0b"/><rect x="167" y="216" width="33" height="56" rx="6" fill="#f59e0b"/><rect x="200" y="216" width="33" height="56" rx="6" fill="#f59e0b"/>`),
    C("jeans", "Джинсы", 300, `<rect x="167" y="212" width="66" height="12" fill="#1d4ed8"/><rect x="168" y="216" width="31" height="108" rx="6" fill="#2563eb"/><rect x="201" y="216" width="31" height="108" rx="6" fill="#2563eb"/><path d="M200 224 V324" stroke="#1e3a8a" stroke-width="2"/>`),
    C("pants", "Брюки", 2500, `<rect x="168" y="216" width="31" height="108" rx="6" fill="#334155"/><rect x="201" y="216" width="31" height="108" rx="6" fill="#334155"/><rect x="167" y="212" width="66" height="9" fill="#111"/><rect x="195" y="212" width="10" height="9" fill="#facc15"/>`)
  ]},
  shoes: { title: "Обувь", items: [
    C("sneakers", "Кроссовки", 80, `<ellipse cx="182" cy="322" rx="22" ry="9" fill="#f8fafc" stroke="#9ca3af"/><ellipse cx="218" cy="322" rx="22" ry="9" fill="#f8fafc" stroke="#9ca3af"/><path d="M166 322 H198 M202 322 H234" stroke="#ef4444" stroke-width="3"/>`),
    C("boots", "Ботинки", 800, `<rect x="168" y="298" width="31" height="26" rx="5" fill="#78350f"/><rect x="201" y="298" width="31" height="26" rx="5" fill="#78350f"/><ellipse cx="180" cy="324" rx="22" ry="8" fill="#451a03"/><ellipse cx="220" cy="324" rx="22" ry="8" fill="#451a03"/>`),
    C("dress", "Туфли", 6000, `<ellipse cx="182" cy="322" rx="22" ry="8" fill="#111"/><ellipse cx="218" cy="322" rx="22" ry="8" fill="#111"/><ellipse cx="176" cy="319" rx="8" ry="2" fill="#6b7280"/><ellipse cx="212" cy="319" rx="8" ry="2" fill="#6b7280"/>`)
  ]},
  hat: { title: "Головной убор", items: [
    C("cap", "Кепка", 60, `<path d="M169 90 A31 28 0 0 1 231 90 Z" fill="#2563eb"/><rect x="200" y="84" width="46" height="8" rx="4" fill="#1d4ed8"/>`),
    C("tophat", "Цилиндр", 5000, `<rect x="176" y="30" width="48" height="42" fill="#111"/><rect x="166" y="68" width="68" height="8" rx="4" fill="#111"/><rect x="176" y="58" width="48" height="8" fill="#b91c1c"/>`)
  ]},
  glasses: { title: "Очки", items: [
    C("sun", "Тёмные очки", 150, `<rect x="172" y="86" width="25" height="13" rx="5" fill="#111"/><rect x="203" y="86" width="25" height="13" rx="5" fill="#111"/><rect x="196" y="89" width="8" height="3" fill="#111"/>`),
    C("gold", "Золотые очки", 5000, `<rect x="172" y="86" width="25" height="13" rx="5" fill="#1e293b" stroke="#facc15" stroke-width="2.5"/><rect x="203" y="86" width="25" height="13" rx="5" fill="#1e293b" stroke="#facc15" stroke-width="2.5"/><rect x="196" y="89" width="8" height="3" fill="#facc15"/>`)
  ]},
  bling: { title: "Украшения", items: [
    C("chain", "Золотая цепь", 15000, `<path d="M178 138 Q200 190 222 138" fill="none" stroke="#facc15" stroke-width="4"/><circle cx="200" cy="176" r="7" fill="#facc15"/>`),
    C("diamond", "Цепь с бриллиантом", 100000, `<path d="M178 138 Q200 190 222 138" fill="none" stroke="#e5e7eb" stroke-width="4"/><polygon points="200,168 209,178 200,192 191,178" fill="#67e8f9" stroke="#fff" stroke-width="1.5"/>`)
  ]},
  hair: { title: "Причёска", items: [
    C("h_short", "Короткая", 20, c => `<path d="M169 92 Q166 58 200 60 Q234 58 231 92 Q222 74 200 74 Q178 74 169 92Z" fill="${c}"/>`),
    C("h_mohawk", "Ирокез", 150, c => `<path d="M188 68 L192 40 L198 62 L204 36 L209 62 L214 44 L214 68Z" fill="${c}"/><rect x="190" y="62" width="22" height="10" rx="4" fill="${c}"/>`),
    C("h_long", "Длинные", 400, c => `<path d="M169 92 Q166 58 200 60 Q234 58 231 92 Q222 74 200 74 Q178 74 169 92Z" fill="${c}"/>`, c => `<rect x="165" y="62" width="70" height="95" rx="30" fill="${c}"/>`),
    C("h_afro", "Афро", 600, c => `<path d="M172 88 Q200 60 228 88 Q200 74 172 88Z" fill="${c}"/>`, c => `<circle cx="200" cy="82" r="44" fill="${c}"/>`)
  ]},
  beard: { title: "Борода", items: [
    C("b_stubble", "Щетина", 30, c => `<path d="M171 98 Q172 124 200 125 Q228 124 229 98 Q222 116 200 116 Q178 116 171 98Z" fill="${c}" opacity=".6"/>`),
    C("b_goatee", "Эспаньолка", 120, c => `<ellipse cx="200" cy="126" rx="9" ry="10" fill="${c}"/><path d="M186 108 Q200 102 214 108 Q200 114 186 108Z" fill="${c}"/>`),
    C("b_full", "Борода", 200, c => `<path d="M169 96 Q168 142 200 144 Q232 142 231 96 Q222 120 200 118 Q178 120 169 96Z" fill="${c}"/><path d="M186 108 Q200 102 214 108 Q200 114 186 108Z" fill="${c}"/>`)
  ]},
  car: { title: "Транспорт", items: [
    C("bike", "Велосипед", 200, `<g stroke="#111" stroke-width="3" fill="none"><circle cx="395" cy="309" r="16"/><circle cx="455" cy="309" r="16"/><path d="M395 309 L412 285 H442 L455 309 M412 285 L425 309 H395 M442 285 L438 273 M432 273 H446"/></g>`),
    C("lada", "Старая «копейка»", 2500, car("#e5e7eb", 264, `<rect x="365" y="296" width="145" height="4" fill="#9ca3af"/>`)),
    C("sedan", "Седан", 20000, car("#2563eb")),
    C("sport", "Спорткар", 150000, car("#dc2626", 272)),
    C("super", "Суперкар", 600000, car("#facc15", 274, `<rect x="366" y="268" width="26" height="4" fill="#111"/><rect x="372" y="268" width="3" height="16" fill="#111"/>`))
  ]},
  house: { title: "Жильё", items: [
    C("box", "Картонная коробка", 0, `<rect x="215" y="285" width="90" height="40" fill="#b08968"/><path d="M215 285 L232 270 H288 L305 285Z" fill="#c9a27c"/><text x="260" y="312" font-size="12" text-anchor="middle" fill="#6b4a2f">ДОМ</text>`),
    C("tent", "Палатка", 300, `<path d="M170 325 L260 225 L350 325Z" fill="#f59e0b"/><path d="M260 225 L235 325 H285Z" fill="#92400e"/>`),
    C("house", "Домик", 8000, `<rect x="150" y="235" width="220" height="90" fill="#fde68a"/><path d="M135 238 L260 165 L385 238Z" fill="#b45309"/><rect x="170" y="262" width="40" height="34" fill="#93c5fd"/><rect x="310" y="262" width="40" height="34" fill="#93c5fd"/><rect x="240" y="270" width="40" height="55" fill="#78350f"/><rect x="330" y="180" width="20" height="40" fill="#7c2d12"/>`),
    C("cottage", "Коттедж", 60000, `<rect x="140" y="185" width="240" height="140" fill="#e5e7eb"/><path d="M125 188 L260 115 L395 188Z" fill="#7f1d1d"/><rect x="160" y="205" width="50" height="40" fill="#93c5fd"/><rect x="310" y="205" width="50" height="40" fill="#93c5fd"/><rect x="160" y="265" width="50" height="40" fill="#93c5fd"/><rect x="310" y="265" width="50" height="40" fill="#93c5fd"/><rect x="240" y="270" width="40" height="55" fill="#78350f"/>`),
    C("mansion", "Особняк", 400000, `<rect x="60" y="200" width="400" height="125" fill="#f3f4f6"/><path d="M45 203 L260 120 L475 203Z" fill="#ca8a04"/><g fill="#93c5fd"><rect x="85" y="225" width="45" height="40"/><rect x="155" y="225" width="45" height="40"/><rect x="320" y="225" width="45" height="40"/><rect x="390" y="225" width="45" height="40"/><rect x="85" y="280" width="45" height="30"/><rect x="390" y="280" width="45" height="30"/></g><g fill="#fff" stroke="#d1d5db"><rect x="205" y="205" width="12" height="120"/><rect x="303" y="205" width="12" height="120"/></g><rect x="235" y="265" width="50" height="60" fill="#78350f"/>`)
  ]}
};

const tabs = [
  { name: "Одежда",    slots: ["top", "bottom", "shoes", "hat", "glasses", "bling"] },
  { name: "Внешность", slots: ["hair", "beard"], colors: true },
  { name: "Транспорт", slots: ["car"] },
  { name: "Жильё",     slots: ["house"] }
];

const skins = ["#fde4c8", "#f1c27d", "#c68642", "#8d5524", "#5c3a1e"];
const hairs = ["#111111", "#3b2314", "#a0522d", "#e5c07b", "#d1d5db", "#dc2626", "#2563eb"];

/* ================= ДОСТИЖЕНИЯ ================= */
/* ================= ДОСТИЖЕНИЯ ================= */
const count = s => s.owned.reduce((a, b) => a + b, 0);
const boughtIn = (s, slot) => catalog[slot].items.some(i => i.cost > 0 && s.ownedItems[i.id]);
const itemsCount = s => Object.keys(s.ownedItems).filter(k => k !== "box").length;

const achievements = [
  { id: "tap1",    name: "Первый шаг",       desc: "Сделайте 1 тап",          reward: 1,  check: s => s.taps >= 1 },
  { id: "tap100",  name: "Разогрев",         desc: "Сделайте 100 тапов",      reward: 1,  check: s => s.taps >= 100 },
  { id: "tap1000", name: "Звонкие пальцы",   desc: "Сделайте 1000 тапов",     reward: 3,  check: s => s.taps >= 1000 },
  { id: "b1",      name: "Предприниматель",  desc: "Купите 1 бизнес",         reward: 1,  check: s => count(s) >= 1 },
  { id: "b10",     name: "Владелец сети",    desc: "Купите 10 бизнесов",      reward: 2,  check: s => count(s) >= 10 },
  { id: "b50",     name: "Магнат",           desc: "Купите 50 бизнесов",      reward: 5,  check: s => count(s) >= 50 },
  { id: "m100",    name: "Первая сотня",     desc: "Заработайте $100",        reward: 1,  check: s => s.total >= 100 },
  { id: "m1k",     name: "Тысячник",         desc: "Заработайте $1 000",      reward: 2,  check: s => s.total >= 1000 },
  { id: "m10k",    name: "Богач",            desc: "Заработайте $10 000",     reward: 3,  check: s => s.total >= 10000 },
  { id: "m100k",   name: "Почти у цели",     desc: "Заработайте $100 000",    reward: 5,  check: s => s.total >= 100000 },
  { id: "m1m",     name: "Миллионер!",       desc: "Заработайте $1 000 000",  reward: 10, check: s => s.total >= 1000000 },
  { id: "dress",   name: "Прикрыл срам",     desc: "Купите любую одежду",     reward: 1,  check: s => boughtIn(s, "top") || boughtIn(s, "bottom") },
  { id: "items5",  name: "Модник",           desc: "Купите 5 вещей",          reward: 3,  check: s => itemsCount(s) >= 5 },
  { id: "car",     name: "Водитель",         desc: "Купите транспорт",        reward: 3,  check: s => boughtIn(s, "car") },
  { id: "home",    name: "Новоселье",        desc: "Купите жильё",            reward: 3,  check: s => boughtIn(s, "house") }
];

const bizIcons = ["🍋", "☕", "🏪", "🏭", "🏦"];

/* ================= СОСТОЯНИЕ ================= */
const saved = JSON.parse(localStorage.getItem("save") || "{}");
let state = Object.assign({
  money: 0, total: 0, taps: 0, diamonds: 0, tapLevel: 0,
  owned: items.map(() => 0), done: [], time: Date.now(),
  skin: "#f1c27d", hairColor: "#3b2314",
  ownedItems: { box: true }, equip: { house: "box" }
}, saved);
items.forEach((_, i) => { state.owned[i] = state.owned[i] || 0; });
let won = false;

const $ = id => document.getElementById(id);
const elMoney = $("money"), elIncome = $("income"), elBar = $("bar"), elGoalTxt = $("goalTxt"),
      elDia = $("diamonds"), elTap = $("tap"), elTapUp = $("tapUp"),
      bizBox = $("biz"), achBox = $("achs"), toast = $("toast"),
      scene = $("scene"), sceneWrap = $("sceneWrap"),
      tabsBox = $("tabs"), chipsRow = $("chipsRow"), shopBody = $("shopBody"),
      left = $("left"), right = $("right");

const cost = i => Math.floor(items[i].cost * Math.pow(1.15, state.owned[i]));
const perSec = () => items.reduce((s, it, i) => s + it.income * state.owned[i], 0);
const tapPower = () => 1 + state.tapLevel * 2;
const tapCost = () => 1 + state.tapLevel;
const fmt = n => "$" + Math.floor(n).toLocaleString("ru-RU");

function save() {
  state.time = Date.now();
  localStorage.setItem("save", JSON.stringify(state));
}
function earn(x) { state.money += x; state.total += x; }

let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ================= КАРТИНА ================= */
const BG = `<rect width="640" height="380" fill="#7dd3fc"/>
<circle cx="70" cy="60" r="30" fill="#fde047"/>
<ellipse cx="470" cy="70" rx="46" ry="15" fill="#fff" opacity=".9"/>
<ellipse cx="260" cy="105" rx="36" ry="12" fill="#fff" opacity=".9"/>
<rect y="325" width="640" height="55" fill="#65a30d"/>
<rect y="352" width="640" height="28" fill="#57534e"/>`;

const bodySvg = s => `
<rect x="192" y="118" width="16" height="20" fill="${s}"/>
<rect x="143" y="136" width="24" height="90" rx="11" fill="${s}"/>
<rect x="233" y="136" width="24" height="90" rx="11" fill="${s}"/>
<circle cx="155" cy="228" r="11" fill="${s}"/><circle cx="245" cy="228" r="11" fill="${s}"/>
<rect x="167" y="130" width="66" height="96" rx="12" fill="${s}"/>
<rect x="170" y="215" width="29" height="108" rx="10" fill="${s}"/>
<rect x="201" y="215" width="29" height="108" rx="10" fill="${s}"/>
<ellipse cx="182" cy="322" rx="20" ry="8" fill="${s}"/><ellipse cx="218" cy="322" rx="20" ry="8" fill="${s}"/>`;

const BRIEFS = `<path d="M167 214 H233 V236 Q233 246 224 248 L201 248 L200 238 L199 248 L176 248 Q167 246 167 236Z" fill="#3b82f6"/><rect x="167" y="214" width="66" height="5" fill="#1d4ed8"/>`;

const headSvg = s => `
<circle cx="170" cy="97" r="6" fill="${s}"/><circle cx="230" cy="97" r="6" fill="${s}"/>
<circle cx="200" cy="95" r="30" fill="${s}"/>
<circle cx="190" cy="92" r="3" fill="#1f2937"/><circle cx="210" cy="92" r="3" fill="#1f2937"/>
<path d="M190 107 Q200 115 210 107" stroke="#7c2d12" fill="none" stroke-width="2.5" stroke-linecap="round"/>`;

function part(it, key) {
  if (!it) return "";
  const v = it[key];
  return typeof v === "function" ? v(state.hairColor) : (v || "");
}

// масштаб домов (чтобы любой дом помещался слева)
const HOUSE_SCALE = { box: 1.3, tent: 1.05, house: 0.85, cottage: 0.8, mansion: 0.58 };
function houseSvg(it) {
  if (!it) return "";
  const s = HOUSE_SCALE[it.id] || 0.8;
  return `<g transform="translate(140,325) scale(${s}) translate(-260,-325)">${it.svg}</g>`;
}

function renderScene() {
  const g = slot => catalog[slot].items.find(i => i.id === state.equip[slot]);
  const hair = g("hair");
  scene.innerHTML = BG +
    houseSvg(g("house")) +
    `<g transform="translate(110,0)">` + part(g("car"), "svg") + `</g>` +
    `<g transform="translate(160,0)">` +
      part(hair, "back") +
      bodySvg(state.skin) + BRIEFS +
      part(g("bottom"), "svg") +
      part(g("shoes"), "svg") +
      part(g("top"), "svg") +
      part(g("bling"), "svg") +
      headSvg(state.skin) +
      part(g("beard"), "svg") +
      part(hair, "svg") +
      part(g("glasses"), "svg") +
      part(g("hat"), "svg") +
    `</g>`;
}

/* ================= МАГАЗИН ================= */
const VB = {
  top: "130 118 140 130", bottom: "160 205 80 125", shoes: "155 292 90 40",
  hat: "150 20 100 100", glasses: "150 60 100 70", bling: "165 125 70 75",
  hair: "150 30 100 100", beard: "150 60 100 100",
  car: "355 255 165 70", house: "20 110 480 220"
};
const withHead = ["hat", "glasses", "hair", "beard"];

function preview(slot, it) {
  const back = slot === "hair" ? part(it, "back") : "";
  const head = withHead.includes(slot) ? headSvg(state.skin) : "";
  return `<svg viewBox="${VB[slot]}" xmlns="http://www.w3.org/2000/svg">${back}${head}${part(it, "svg")}</svg>`;
}

let currentTab = 0, currentSlot = 0;
let shopBtns = [];

function onItem(slot, it) {
  if (!state.ownedItems[it.id]) {
    if (state.money < it.cost) return;
    state.money -= it.cost;
    state.ownedItems[it.id] = true;
    state.equip[slot] = it.id;
    showToast("🛍 Куплено: " + it.name);
  } else if (slot === "house") {
    state.equip[slot] = it.id;
  } else {
    state.equip[slot] = state.equip[slot] === it.id ? null : it.id;
  }
  renderShop(); renderScene(); update(); save();
}

function swatchRow(title, colors, key) {
  const d = document.createElement("div");
  d.className = "sw";
  const t = document.createElement("b");
  t.textContent = title;
  d.appendChild(t);
  colors.forEach(c => {
    const b = document.createElement("button");
    b.style.background = c;
    if (state[key] === c) b.classList.add("sel");
    b.onclick = () => { state[key] = c; renderShop(); renderScene(); save(); };
    d.appendChild(b);
  });
  return d;
}

const tabIcons = ["👕", "💇", "🚗", "🏠"];

function renderShop() {
  const scrollTop = shopBody.scrollTop;
  tabsBox.innerHTML = ""; chipsRow.innerHTML = ""; shopBody.innerHTML = ""; shopBtns = [];

  tabs.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = i === currentTab ? "active" : "";
    b.innerHTML = "<span>" + tabIcons[i] + "</span>" + t.name;
    b.onclick = () => { currentTab = i; currentSlot = 0; renderShop(); };
    tabsBox.appendChild(b);
  });

  const tab = tabs[currentTab];
  if (currentSlot >= tab.slots.length) currentSlot = 0;
  const slot = tab.slots[currentSlot];

  if (tab.slots.length > 1) {
    tab.slots.forEach((s, i) => {
      const c = document.createElement("button");
      c.className = "chip" + (i === currentSlot ? " active" : "");
      c.textContent = catalog[s].title;
      c.onclick = () => { currentSlot = i; renderShop(); };
      chipsRow.appendChild(c);
    });
  }

  if (tab.colors) {
    shopBody.appendChild(swatchRow("Кожа", skins, "skin"));
    shopBody.appendChild(swatchRow("Волосы", hairs, "hairColor"));
  }

  const grid = document.createElement("div");
  grid.className = "grid";
  catalog[slot].items.forEach(it => {
    const owned = state.ownedItems[it.id];
    const on = state.equip[slot] === it.id;
    const card = document.createElement("div");
    card.className = "card" + (on ? " on" : "");
    const pv = document.createElement("div");
    pv.className = "pv";
    pv.innerHTML = preview(slot, it);
    const nm = document.createElement("div");
    nm.className = "nm";
    nm.textContent = it.name;
    const btn = document.createElement("button");
    btn.className = "buy";
    if (owned) {
      btn.textContent = on ? (slot === "house" ? "Здесь живёт ✓" : "Снять") : "Надеть";
      if (on) btn.classList.add("eq");
    } else {
      btn.textContent = fmt(it.cost);
      shopBtns.push({ btn, it });
    }
    btn.onclick = () => onItem(slot, it);
    card.append(pv, nm, btn);
    grid.appendChild(card);
  });
  shopBody.appendChild(grid);
  shopBody.scrollTop = scrollTop;
  update();
}

/* ================= БИЗНЕСЫ ================= */
const bizEls = items.map((it, i) => {
  const d = document.createElement("div");
  d.className = "biz";
  d.innerHTML = `<div class="ic">${bizIcons[i]}</div>
    <div class="info"><b>${it.name}</b><small></small></div>
    <button class="buy"></button>`;
  d.querySelector("button").onclick = () => {
    if (state.money >= cost(i)) {
      state.money -= cost(i);
      state.owned[i]++;
      update(); save();
    }
  };
  bizBox.appendChild(d);
  return { small: d.querySelector("small"), btn: d.querySelector("button") };
});

/* ================= ДОСТИЖЕНИЯ ================= */
function renderAchs() {
  achBox.innerHTML = "";
  $("achCount").textContent = state.done.length + "/" + achievements.length;
  const list = [...achievements].sort((a, b) =>
    state.done.includes(a.id) - state.done.includes(b.id));
  list.forEach(a => {
    const d = state.done.includes(a.id);
    const el = document.createElement("div");
    el.className = "ach" + (d ? " done" : "");
    el.innerHTML = `<div class="ic">${d ? "✅" : "🏆"}</div>
      <div class="info"><b>${a.name}</b><small>${a.desc}</small></div>
      <div class="reward">💎 ${a.reward}</div>`;
    achBox.appendChild(el);
  });
}

function checkAchievements() {
  let changed = false;
  achievements.forEach(a => {
    if (!state.done.includes(a.id) && a.check(state)) {
      state.done.push(a.id);
      state.diamonds += a.reward;
      showToast("🏆 " + a.name + "  +" + a.reward + " 💎");
      changed = true;
    }
  });
  if (changed) { renderAchs(); save(); }
}

/* ================= ТАП ================= */
elTapUp.onclick = () => {
  if (state.diamonds >= tapCost()) {
    state.diamonds -= tapCost();
    state.tapLevel++;
    update(); save();
  }
};

function floatText(t) {
  const f = document.createElement("div");
  f.className = "float";
  f.textContent = t;
  f.style.left = (30 + Math.random() * 40) + "%";
  sceneWrap.appendChild(f);
  setTimeout(() => f.remove(), 900);
}

elTap.onclick = () => {
  earn(tapPower()); state.taps++;
  floatText("+" + fmt(tapPower()));
  if (navigator.vibrate) navigator.vibrate(8);
  update();
};

/* ================= ПАНЕЛИ ================= */
function setLeftTab(t) {
  bizBox.hidden = t !== "biz";
  achBox.hidden = t !== "ach";
  document.querySelectorAll("#leftTabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.t === t));
}
document.querySelectorAll("#leftTabs button").forEach(b => b.onclick = () => setLeftTab(b.dataset.t));

function closePanels() {
  left.classList.remove("open");
  right.classList.remove("open");
  document.body.classList.remove("sheet");
}
function openPanel(name) {
  closePanels();
  if (name === "shop") right.classList.add("open");
  else { left.classList.add("open"); setLeftTab(name); }
  document.body.classList.add("sheet");
}
document.querySelectorAll("[data-open]").forEach(b => b.onclick = () => openPanel(b.dataset.open));
document.querySelectorAll("[data-close]").forEach(b => b.onclick = closePanels);
$("backdrop").onclick = closePanels;

/* ================= ОБНОВЛЕНИЕ ЭКРАНА ================= */
function update() {
  checkAchievements();
  elMoney.textContent = fmt(state.money);
  elIncome.textContent = "+" + perSec().toFixed(1) + " $/сек";
  elDia.textContent = "💎 " + state.diamonds;
  const pct = Math.min(100, state.total / GOAL * 100);
  elBar.style.width = pct + "%";
  elGoalTxt.textContent = "До миллиона: " + pct.toFixed(pct < 10 ? 1 : 0) + "%";
  elTap.textContent = "👆 +" + fmt(tapPower());
  elTapUp.innerHTML = "⚡ Сила тапа<br>→ +" + fmt(1 + (state.tapLevel + 1) * 2) + "<br>💎 " + tapCost();
  elTapUp.disabled = state.diamonds < tapCost();
  items.forEach((it, i) => {
    bizEls[i].small.textContent = "×" + state.owned[i] + " · +" + it.income + " $/сек";
    bizEls[i].btn.textContent = fmt(cost(i));
    bizEls[i].btn.disabled = state.money < cost(i);
  });
  shopBtns.forEach(({ btn, it }) => { btn.disabled = state.money < it.cost; });
  if (state.total >= GOAL && !won) {
    won = true;
    alert("🎉 Вы миллионер!");
  }
}

$("reset").onclick = () => {
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
renderAchs();
renderShop();
renderScene();
update();