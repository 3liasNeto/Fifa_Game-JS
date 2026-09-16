const CARDS_DIR = "assets/players/";

const SQUAD_ORDER = ["ATA", "MEI", "DEF", "GOL"];

const POSITION_CATEGORY = {
  GOL: "GOL",

  LE: "DEF",
  LD: "DEF",
  ZAG: "DEF",

  VOL: "MEI",
  MC: "MEI",
  CAM: "MEI",

  PE: "ATA",
  PD: "ATA",
  CA: "ATA",
};

const POSITIONS = {
  GOL: {
    category: "GOL",
    label: "Goleiro",
  },

  LE: {
    category: "DEF",
    label: "Lateral esquerdo",
  },

  LD: {
    category: "DEF",
    label: "Lateral direito",
  },

  ZAG: {
    category: "DEF",
    label: "Zagueiro",
  },

  VOL: {
    category: "MEI",
    label: "Volante",
  },

  MC: {
    category: "MEI",
    label: "Meio-campista",
  },

  CAM: {
    category: "MEI",
    label: "Meia ofensivo",
  },

  PE: {
    category: "ATA",
    label: "Ponta esquerda",
  },

  PD: {
    category: "ATA",
    label: "Ponta direita",
  },

  CA: {
    category: "ATA",
    label: "Centroavante",
  },
};

const SQUAD = [
  {
    id: "v-jr",
    name: "Vini Jr.",
    positions: ["PE", "PD"],
  },
  {
    id: "pele",
    name: "Pelé",
    positions: ["CA", "CAM"],
  },
  {
    id: "jesus",
    name: "G. Jesus",
    positions: ["CA", "PD"],
  },
  {
    id: "neymar",
    name: "Neymar",
    positions: ["PE", "CAM", "CA"],
  },
  {
    id: "m-cunha",
    name: "M. Cunha",
    positions: ["CA", "CAM"],
  },
  {
    id: "rodrygo",
    name: "Rodrygo",
    positions: ["PD", "PE"],
  },
  {
    id: "ronaldo",
    name: "Ronaldo",
    positions: ["CA"],
  },
  {
    id: "coutinho",
    name: "Coutinho",
    positions: ["CAM", "PE"],
  },
  {
    id: "raphinha",
    name: "Raphinha",
    positions: ["PD", "PE"],
  },
  {
    id: "garrincha",
    name: "Garrincha",
    positions: ["PD", "PE"],
  },
  {
    id: "richarlison",
    name: "Richarlison",
    positions: ["CA", "PE"],
  },
  {
    id: "g-martinelli",
    name: "G. Martinelli",
    positions: ["PE", "CA"],
  },
  {
    id: "fred",
    name: "Fred",
    positions: ["MC", "VOL"],
  },
  {
    id: "kaka",
    name: "Kaká",
    positions: ["CAM", "MC"],
  },
  {
    id: "fabinho",
    name: "Fabinho",
    positions: ["VOL", "ZAG"],
  },
  {
    id: "rivaldo",
    name: "Rivaldo",
    positions: ["CAM", "PE"],
  },
  {
    id: "casemiro",
    name: "Casemiro",
    positions: ["VOL"],
  },
  {
    id: "l-paqueta",
    name: "L. Paquetá",
    positions: ["MC", "CAM"],
  },
  {
    id: "ronaldinho",
    name: "Ronaldinho",
    positions: ["CAM", "PE"],
  },
  {
    id: "bruno-guimaraes",
    name: "Bruno Guimarães",
    positions: ["MC", "VOL"],
  },
  {
    id: "cafu",
    name: "Cafu",
    positions: ["LD"],
  },
  {
    id: "danilo",
    name: "Danilo",
    positions: ["LD", "ZAG"],
  },
  {
    id: "t-silva",
    name: "T. Silva",
    positions: ["ZAG"],
  },
  {
    id: "marquinhos",
    name: "Marquinhos",
    positions: ["ZAG"],
  },
  {
    id: "alex-sandro",
    name: "Alex Sandro",
    positions: ["LE", "ZAG"],
  },
  {
    id: "alex-telles",
    name: "Alex Telles",
    positions: ["LE"],
  },
  {
    id: "daniel-alves",
    name: "Daniel Alves",
    positions: ["LD"],
  },
  {
    id: "eder-militao",
    name: "Éder Militão",
    positions: ["ZAG", "LD"],
  },
  {
    id: "r-carlos",
    name: "R. Carlos",
    positions: ["LE"],
  },
  {
    id: "alisson",
    name: "Alisson",
    positions: ["GOL"],
  },

  {
    id: "ederson",
    name: "Ederson",
    positions: ["GOL"],
  },
].map((player) =>
  Object.freeze({
    ...player,
    img: `${CARDS_DIR}${player.id}.png`,
  }),
);

const FORMATIONS = [
  {
    name: "4-3-3",
    slots: [
      { id: "p1", pos: "PE", x: 20, y: 13 },
      { id: "p2", pos: "CA", x: 50, y: 8 },
      { id: "p3", pos: "PD", x: 80, y: 13 },
      { id: "p4", pos: "MC", x: 26, y: 38 },
      { id: "p5", pos: "VOL", x: 50, y: 33 },
      { id: "p6", pos: "MC", x: 74, y: 38 },
      { id: "p7", pos: "LE", x: 13, y: 62 },
      { id: "p8", pos: "ZAG", x: 38, y: 65 },
      { id: "p9", pos: "ZAG", x: 62, y: 65 },
      { id: "p10", pos: "LD", x: 87, y: 62 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
  {
    name: "4-4-2",
    slots: [
      { id: "p1", pos: "CA", x: 37, y: 12 },
      { id: "p2", pos: "CA", x: 63, y: 12 },
      { id: "p3", pos: "PE", x: 15, y: 35 },
      { id: "p4", pos: "MC", x: 38, y: 39 },
      { id: "p5", pos: "MC", x: 62, y: 39 },
      { id: "p6", pos: "PD", x: 85, y: 35 },
      { id: "p7", pos: "LE", x: 13, y: 62 },
      { id: "p8", pos: "ZAG", x: 38, y: 65 },
      { id: "p9", pos: "ZAG", x: 62, y: 65 },
      { id: "p10", pos: "LD", x: 87, y: 62 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
  {
    name: "4-2-3-1",
    slots: [
      { id: "p1", pos: "CA", x: 50, y: 12 },
      { id: "p2", pos: "PE", x: 22, y: 31 },
      { id: "p3", pos: "CAM", x: 50, y: 27 },
      { id: "p4", pos: "PD", x: 78, y: 31 },
      { id: "p5", pos: "VOL", x: 38, y: 46 },
      { id: "p6", pos: "VOL", x: 62, y: 46 },
      { id: "p7", pos: "LE", x: 13, y: 64 },
      { id: "p8", pos: "ZAG", x: 38, y: 67 },
      { id: "p9", pos: "ZAG", x: 62, y: 67 },
      { id: "p10", pos: "LD", x: 87, y: 64 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
  {
    name: "3-5-2",
    slots: [
      { id: "p1", pos: "CA", x: 37, y: 12 },
      { id: "p2", pos: "CA", x: 63, y: 12 },
      { id: "p3", pos: "PE", x: 12, y: 34 },
      { id: "p4", pos: "MC", x: 32, y: 42 },
      { id: "p5", pos: "CAM", x: 50, y: 35 },
      { id: "p6", pos: "MC", x: 68, y: 42 },
      { id: "p7", pos: "PD", x: 88, y: 34 },
      { id: "p8", pos: "ZAG", x: 25, y: 65 },
      { id: "p9", pos: "ZAG", x: 50, y: 68 },
      { id: "p10", pos: "ZAG", x: 75, y: 65 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
  {
    name: "3-4-3",
    slots: [
      { id: "p1", pos: "PE", x: 20, y: 13 },
      { id: "p2", pos: "CA", x: 50, y: 9 },
      { id: "p3", pos: "PD", x: 80, y: 13 },
      { id: "p4", pos: "PE", x: 20, y: 38 },
      { id: "p5", pos: "MC", x: 38, y: 43 },
      { id: "p6", pos: "MC", x: 62, y: 43 },
      { id: "p7", pos: "PD", x: 80, y: 38 },
      { id: "p8", pos: "ZAG", x: 25, y: 66 },
      { id: "p9", pos: "ZAG", x: 50, y: 69 },
      { id: "p10", pos: "ZAG", x: 75, y: 66 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
  {
    name: "5-3-2",
    slots: [
      { id: "p1", pos: "CA", x: 37, y: 12 },
      { id: "p2", pos: "CA", x: 63, y: 12 },
      { id: "p3", pos: "MC", x: 27, y: 40 },
      { id: "p4", pos: "CAM", x: 50, y: 35 },
      { id: "p5", pos: "MC", x: 73, y: 40 },
      { id: "p6", pos: "LE", x: 10, y: 60 },
      { id: "p7", pos: "ZAG", x: 30, y: 66 },
      { id: "p8", pos: "ZAG", x: 50, y: 68 },
      { id: "p9", pos: "ZAG", x: 70, y: 66 },
      { id: "p10", pos: "LD", x: 90, y: 60 },
      { id: "p11", pos: "GOL", x: 50, y: 87 },
    ],
  },
];

const DEFAULT_FORMATION_INDEX = 0;
const DEFAULT_FORMATION = FORMATIONS[DEFAULT_FORMATION_INDEX];

const findPlayer = (id) =>
  SQUAD.find((player) => player.id === id) || null;

const canPlay = (player, pos) => player.positions.includes(pos);

export {
  CARDS_DIR,
  SQUAD_ORDER,
  POSITION_CATEGORY,
  POSITIONS,
  SQUAD,
  DEFAULT_FORMATION,
  FORMATIONS,
  DEFAULT_FORMATION_INDEX,
  findPlayer,
  canPlay
};