import {
  SQUAD,
  FORMATIONS,
  DEFAULT_FORMATION_INDEX,
  POSITION_CATEGORY,
  findPlayer,
  canPlay,
} from "./team.js";
import { emptyLineup, lineupWithout, normalize } from "./utils.js";
import UI from "./ui.js";

const FILTER_ALL = "ALL";


export default class Game {
  constructor(els) {
    this.ui = new UI(els);
    this.state = {
      formationIndex: DEFAULT_FORMATION_INDEX,
      lineup: emptyLineup(DEFAULT_FORMATION_INDEX),
      filter: FILTER_ALL,
      query: "",
      activeSlot: null,
    };
  }

  init() {
    this.ui.bind({
      canDrop: (slotId, playerId) => this.canDrop(slotId, playerId),
      onDropOnSlot: (slotId, playerId) => this.assignPlayer(slotId, playerId),
      onDropOnPool: (playerId) => this.releasePlayer(playerId),
      onSlotActivate: (slotId) => this.activateSlot(slotId),
      onPlayerPick: (playerId) => this.pickPlayer(playerId),
      onFilterChange: (filter) => this.setState({ filter, activeSlot: null }),
      onSearch: (query) => this.setState({ query }),
      onFormationChange: (index) => this.changeFormation(index),
      onReset: () => this.reset(),
    });

    this.render();
  }

  setState(patch) {
    this.state = { ...this.state, ...patch };
    this.render();
  }

  render() {
    this.ui.render(this.buildView());
  }


  get formation() {
    return FORMATIONS[this.state.formationIndex];
  }

  slotById(slotId) {
    return this.formation.slots.find((slot) => slot.id === slotId) || null;
  }

  usedPlayerIds() {
    return Object.values(this.state.lineup).filter(Boolean);
  }

  fits(slot, player) {
    return Boolean(slot && player && canPlay(player, slot.pos));
  }

  canDrop(slotId, playerId) {
    return this.fits(this.slotById(slotId), findPlayer(playerId));
  }

  assignPlayer(slotId, playerId) {
    const slot = this.slotById(slotId);
    const player = findPlayer(playerId);
    if (!this.fits(slot, player)) return;

    const lineup = lineupWithout(this.state.lineup, player.id);
    lineup[slot.id] = player.id;
    this.setState({ lineup, activeSlot: null });
  }

  releasePlayer(playerId) {
    this.setState({ lineup: lineupWithout(this.state.lineup, playerId) });
  }

  clearSlot(slotId) {
    this.setState({
      lineup: { ...this.state.lineup, [slotId]: null },
      activeSlot: null,
    });
  }

  firstFreeSlotFor(player) {
    const slot = this.formation.slots.find(
      (candidate) => !this.state.lineup[candidate.id] && canPlay(player, candidate.pos),
    );
    return slot ? slot.id : null;
  }

  pickPlayer(playerId) {
    const player = findPlayer(playerId);
    if (!player) return;

    const active = this.slotById(this.state.activeSlot);
    const target = this.fits(active, player) ? active.id : this.firstFreeSlotFor(player);

    if (target) this.assignPlayer(target, player.id);
  }

  activateSlot(slotId) {
    const slot = this.slotById(slotId);
    if (!slot) return;

    if (this.state.lineup[slotId]) {
      this.clearSlot(slotId);
      return;
    }

    const wasActive = this.state.activeSlot === slotId;
    this.setState({
      activeSlot: wasActive ? null : slotId,
      filter: wasActive ? FILTER_ALL : POSITION_CATEGORY[slot.pos],
    });
  }

  changeFormation(index) {
    if (!FORMATIONS[index]) return;

    const lineup = emptyLineup(index);
    FORMATIONS[index].slots.forEach((slot) => {
      const player = findPlayer(this.state.lineup[slot.id]);
      if (this.fits(slot, player)) lineup[slot.id] = player.id;
    });

    this.setState({ formationIndex: index, lineup, activeSlot: null });
  }

  reset() {
    this.ui.clearSearch();
    this.setState({
      lineup: emptyLineup(this.state.formationIndex),
      filter: FILTER_ALL,
      query: "",
      activeSlot: null,
    });
  }

  matchesFilter(player) {
    if (this.state.filter === FILTER_ALL) return true;
    return player.positions.some((pos) => POSITION_CATEGORY[pos] === this.state.filter);
  }

  visiblePlayers() {
    const used = this.usedPlayerIds();
    const query = normalize(this.state.query.trim());

    return SQUAD.filter((player) => {
      if (used.includes(player.id)) return false;
      if (!this.matchesFilter(player)) return false;
      return !query || normalize(player.name).includes(query);
    });
  }

  buildView() {
    return {
      players: this.visiblePlayers(),
      filter: this.state.filter,
      formationIndex: this.state.formationIndex,
      filled: this.usedPlayerIds().length,
      total: this.formation.slots.length,
      slots: this.formation.slots.map((slot) => ({
        slot,
        player: findPlayer(this.state.lineup[slot.id]),
        isActive: this.state.activeSlot === slot.id,
      })),
    };
  }
}
