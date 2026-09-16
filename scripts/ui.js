import { POSITIONS, POSITION_CATEGORY, FORMATIONS } from "./team.js";


const CATEGORY_STYLE = {
  ATA: { icon: "target", dot: "bg-ata", text: "text-ata", color: "#00c2ff" },
  MEI: { icon: "share-2", dot: "bg-mei", text: "text-mei", color: "#6100ff" },
  DEF: { icon: "shield", dot: "bg-def", text: "text-def", color: "#80ff00" },
  GOL: { icon: "hand", dot: "bg-gol", text: "text-gol", color: "#ff0000" },
};

const TEMPLATE_IDS = {
  poolCard: "tpl-pool-card",
  poolEmpty: "tpl-pool-empty",
  slot: "tpl-slot",
  slotEmpty: "tpl-slot-empty",
  slotFilled: "tpl-slot-filled",
};

const ACTIVE_FILTER = ["bg-white", "text-slate-900"];
const IDLE_FILTER = ["bg-white/10", "text-white"];
const DRAGGING = "opacity-40";
const DRAG_MIME = "text/plain";

const styleOf = (pos) => CATEGORY_STYLE[POSITION_CATEGORY[pos]];

export default class UI {
  constructor(els) {
    this.els = els;
    this.templates = UI.collectTemplates();
    this.handlers = {};
    this.draggingId = null;
  }

  static collectTemplates() {
    const missing = [];
    const templates = Object.entries(TEMPLATE_IDS).reduce((acc, [key, id]) => {
      const node = document.getElementById(id);
      if (!node) missing.push(id);
      acc[key] = node;
      return acc;
    }, {});

    if (missing.length) {
      throw new Error(`Templates ausentes no HTML: #${missing.join(", #")}`);
    }

    return templates;
  }


  fragment(key) {
    return this.templates[key].content.cloneNode(true);
  }

  root(key) {
    return this.fragment(key).firstElementChild;
  }

  static addClasses(el, classNames) {
    if (!el || !classNames) return;
    el.classList.add(...classNames.split(/\s+/).filter(Boolean));
  }


  buildPoolCard(player) {
    const item = this.root("poolCard");
    const button = item.querySelector("[data-card]");
    const image = item.querySelector("[data-img]");

    button.dataset.player = player.id;
    button.title = player.name;
    image.src = player.img;
    image.alt = player.name;

    UI.addClasses(item.querySelector("[data-dot]"), styleOf(player.positions[0]).dot);
    item.querySelector("[data-name]").textContent = player.name;
    item.querySelector("[data-positions]").textContent = player.positions.join(" · ");

    return item;
  }

  renderPool({ players }) {
    const fragment = document.createDocumentFragment();

    if (players.length) {
      players.forEach((player) => fragment.appendChild(this.buildPoolCard(player)));
    } else {
      fragment.appendChild(this.root("poolEmpty"));
    }

    this.els.pool.replaceChildren(fragment);

    const { singular, plural } = this.els.poolCount.dataset;
    this.els.poolCount.textContent = `${players.length} ${players.length === 1 ? singular : plural}`;
  }


  buildSlotEmpty(pos) {
    const fragment = this.fragment("slotEmpty");
    const icon = fragment.querySelector("[data-icon]");
    const style = styleOf(pos);

    icon.setAttribute("data-lucide", style.icon);
    UI.addClasses(icon, style.text);
    fragment.querySelector("[data-pos]").textContent = pos;

    return fragment;
  }

  buildSlotFilled(player) {
    const fragment = this.fragment("slotFilled");
    const image = fragment.querySelector("[data-img]");

    image.src = player.img;
    image.alt = player.name;
    fragment.querySelector("[data-name]").textContent = player.name;

    return fragment;
  }

  buildSlot({ slot, player, isActive }) {
    const button = this.root("slot");
    const { label } = POSITIONS[slot.pos];

    button.dataset.slot = slot.id;
    button.style.left = `${slot.x}%`;
    button.style.top = `${slot.y}%`;
    button.style.setProperty("--pos-color", styleOf(slot.pos).color);

    UI.addClasses(button, isActive ? "slot-active z-20 scale-110" : "hover:z-10 hover:scale-105");

    if (player) {
      button.draggable = true;
      button.dataset.player = player.id;
      button.appendChild(this.buildSlotFilled(player));
    } else {
      button.appendChild(this.buildSlotEmpty(slot.pos));
    }

    button.setAttribute(
      "aria-label",
      `${label} — ${player ? player.name : button.dataset.labelEmpty}`,
    );

    return button;
  }

  renderPitch({ slots }) {
    const fragment = document.createDocumentFragment();
    slots.forEach((entry) => fragment.appendChild(this.buildSlot(entry)));
    this.els.pitch.replaceChildren(fragment);
  }


  renderFilters({ filter }) {
    this.els.filters.querySelectorAll("[data-filter]").forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.remove(...(isActive ? IDLE_FILTER : ACTIVE_FILTER));
      button.classList.add(...(isActive ? ACTIVE_FILTER : IDLE_FILTER));
    });
  }

  renderCounter({ filled, total }) {
    this.els.counter.textContent = `${filled}/${total}`;
    this.els.progress.style.width = `${(filled / total) * 100}%`;
  }

  renderFormations({ formationIndex }) {
    if (!this.els.formation.options.length) {
      this.els.formation.replaceChildren(
        ...FORMATIONS.map((formation, index) => {
          const option = document.createElement("option");
          option.value = String(index);
          option.textContent = formation.name;
          return option;
        }),
      );
    }
    this.els.formation.value = String(formationIndex);
  }

  render(view) {
    this.renderFormations(view);
    this.renderPool(view);
    this.renderPitch(view);
    this.renderFilters(view);
    this.renderCounter(view);
    window.lucide?.createIcons();
  }

  clearSearch() {
    this.els.search.value = "";
  }


  onDragStart(event) {
    const origin = event.target.closest?.("[data-player]");
    if (!origin) return;
    this.draggingId = origin.dataset.player;
    event.dataTransfer.setData(DRAG_MIME, this.draggingId);
    event.dataTransfer.effectAllowed = "move";
    origin.classList.add(DRAGGING);
  }

  onDragEnd(event) {
    event.target.closest?.("[data-player]")?.classList.remove(DRAGGING);
    this.draggingId = null;
  }

  onSlotDragOver(event) {
    const slotEl = event.target.closest?.("[data-slot]");
    if (!slotEl || !this.draggingId) return;
    if (!this.handlers.canDrop(slotEl.dataset.slot, this.draggingId)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onSlotDrop(event) {
    const slotEl = event.target.closest?.("[data-slot]");
    if (!slotEl) return;
    event.preventDefault();
    const playerId = event.dataTransfer.getData(DRAG_MIME) || this.draggingId;
    this.handlers.onDropOnSlot(slotEl.dataset.slot, playerId);
  }

  onPoolDragOver(event) {
    if (!this.draggingId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onPoolDrop(event) {
    event.preventDefault();
    const playerId = event.dataTransfer.getData(DRAG_MIME) || this.draggingId;
    if (playerId) this.handlers.onDropOnPool(playerId);
  }

  bind(handlers) {
    this.handlers = handlers;
    const { pitch, pool, filters, search, reset, formation } = this.els;

    pitch.addEventListener("click", (event) => {
      const slotEl = event.target.closest?.("[data-slot]");
      if (slotEl) handlers.onSlotActivate(slotEl.dataset.slot);
    });
    pitch.addEventListener("dragstart", (event) => this.onDragStart(event));
    pitch.addEventListener("dragend", (event) => this.onDragEnd(event));
    pitch.addEventListener("dragover", (event) => this.onSlotDragOver(event));
    pitch.addEventListener("drop", (event) => this.onSlotDrop(event));

    pool.addEventListener("click", (event) => {
      const cardEl = event.target.closest?.("[data-player]");
      if (cardEl) handlers.onPlayerPick(cardEl.dataset.player);
    });
    pool.addEventListener("dragstart", (event) => this.onDragStart(event));
    pool.addEventListener("dragend", (event) => this.onDragEnd(event));
    pool.addEventListener("dragover", (event) => this.onPoolDragOver(event));
    pool.addEventListener("drop", (event) => this.onPoolDrop(event));

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (button) handlers.onFilterChange(button.dataset.filter);
    });
    search.addEventListener("input", (event) => handlers.onSearch(event.target.value));
    reset.addEventListener("click", () => handlers.onReset());
    formation.addEventListener("change", (event) =>
      handlers.onFormationChange(Number(event.target.value)),
    );
  }
}
