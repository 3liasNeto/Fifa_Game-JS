$('.ataque').click(
    function () {
        $('.J-Ataque').show();
        $('.J-Meia').hide();
        $('.J-Defesa').hide();
        $('.J-Goleiro').hide();
    }
);

$('.meio').click(
    function () {
        $('.J-Meia').show();
        $('.J-Ataque').hide();
        $('.J-Defesa').hide();
        $('.J-Goleiro').hide();
    }
);

$('.zaga').click(
    function () {
        $('.J-Defesa').show();
        $('.J-Ataque').hide();
        $('.J-Meia').hide();
        $('.J-Goleiro').hide();
    }
);

$('.goleiro').click(
    function () {
        $('.J-Goleiro').show();
        $('.J-Ataque').hide();
        $('.J-Meia').hide();
        $('.J-Defesa').hide();
    }
);

$('.player').on('click', function () {
    $('.player').toggleClass("mark");
});

//push
const playerAt = document.querySelectorAll(".dragAt");
const playerMe = document.querySelectorAll(".dragMe");
const playerZa = document.querySelectorAll(".dragZa");
const playerGl = document.querySelectorAll(".dragGl");


//caixas
const caixaAt = document.querySelectorAll(".ataque");
const caixaMe = document.querySelectorAll(".meio");
const caixaZa = document.querySelectorAll(".zaga");
const caixaGl = document.querySelectorAll(".goleiro");

const Ataque = document.querySelectorAll(".atacantes");
const Meio = document.querySelectorAll(".meiocampo");
const Defesa = document.querySelectorAll(".zagueiros");
const Goleiro = document.querySelectorAll(".gol");


playerAt.forEach((jogadores) => {
    jogadores.addEventListener("dragstart", startAt);
    jogadores.addEventListener('dragend', dragEndAt);
});

function startAt() {
    this.classList.add("arrastandoAt");
    this.classList.add("playerAddedAt");
}

function dragEndAt() {
    this.classList.remove("arrastandoAt");

}

playerMe.forEach((players) => {
    players.addEventListener("dragstart", startMe);
    players.addEventListener('dragend', dragEndMe);
});

function startMe() {
    this.classList.add("arrastandoMe");
    this.classList.add("playerAddedMe");
}

function dragEndMe() {
    this.classList.remove("arrastandoMe");
}

playerZa.forEach((players) => {
    players.addEventListener("dragstart", startZa);
    players.addEventListener('dragend', dragEndZa);
});

function startZa() {
    this.classList.add("arrastandoZa");
    this.classList.add("playerAddedZa");
}

function dragEndZa() {
    this.classList.remove("arrastandoZa");
}

playerGl.forEach((players) => {
    players.addEventListener("dragstart", startGl);
    players.addEventListener('dragend', dragEndGl);
});

function startGl() {
    this.classList.add("arrastandoGl");
    this.classList.add("playerAddedGl");
}

function dragEndGl() {
    this.classList.remove("arrastandoGl");
}



// DropZone 
caixaAt.forEach((caixa) => {
    caixa.addEventListener("dragover", soltarPlayerAt);
    caixa.addEventListener("dragend", Dragend);
    caixa.addEventListener('click', removePlAt);
});

function soltarPlayerAt() {
    const arrastado = document.querySelector(".arrastandoAt");
    this.appendChild(arrastado);
    this.classList.toggle("AtaPlayer");
    const iconpl = document.querySelector(".AtaPlayer");
    iconpl.style.background ='none';
}

function Dragend(){
   
}

function removePlAt() {
    const playerPronto = document.querySelector('.playerAdded');
}

caixaMe.forEach((caixa) => {
    caixa.addEventListener("dragover", soltarPlayerMe);
    caixa.addEventListener('click', removePlMe);
});

function soltarPlayerMe() {
    const arrastado = document.querySelector(".arrastandoMe");
    this.appendChild(arrastado);
}

function removePlMe() {
    const playerPronto = document.querySelector('.playerAdded');
}

caixaZa.forEach((caixa) => {
    caixa.addEventListener("dragover", soltarPlayerZa);
    caixa.addEventListener('click', removePlZa);
});

function soltarPlayerZa() {
    const arrastado = document.querySelector(".arrastandoZa");
    this.appendChild(arrastado);
}

function removePlZa() {
    const playerPronto = document.querySelector('.playerAdded');
}

caixaGl.forEach((caixa) => {
    caixa.addEventListener("dragover", soltarPlayerGl);
    caixa.addEventListener('click', removePlGl);
});

function soltarPlayerGl() {
    const arrastado = document.querySelector(".arrastandoGl");
    this.appendChild(arrastado);
}

function removePlGl() {
    const playerPronto = document.querySelector('.playerAdded');
}


Ataque.forEach((caixa) => {
    caixa.addEventListener("dragover", AtsoltarPlayer);
    caixa.addEventListener("dragend", AtDragEnd);
    caixa.addEventListener('click', AtremovePl);
});

function AtsoltarPlayer() {
    const arrastadoAt = document.querySelector(".playerAddedAt");
    this.appendChild(arrastadoAt);
}

function AtremovePl() {
    const playerPronto = document.querySelector('.playerAdded');
}

function AtDragEnd(){
    this.classList.remove("playerAddedAt");
}

Meio.forEach((caixa) => {
    caixa.addEventListener("dragover", MesoltarPlayer);
    caixa.addEventListener("dragend", MeDragEnd);
    caixa.addEventListener('click', MeremovePl);
});

function MesoltarPlayer() {
    const arrastadoMe = document.querySelector(".playerAddedMe");
    this.appendChild(arrastadoMe);
}

function MeremovePl() {
    const playerPronto = document.querySelector('.playerAdded');
}

function MeDragEnd(){
    this.classList.remove("playerAddedMe");
}

Defesa.forEach((caixa) => {
    caixa.addEventListener("dragover", DefsoltarPlayer);
    caixa.addEventListener("dragend", DefDragEnd);
    caixa.addEventListener('click', DefremovePl);
});

function DefsoltarPlayer() {
    const arrastadoZa = document.querySelector(".playerAddedZa");
    this.appendChild(arrastadoZa);
}

function DefremovePl() {
    const playerPronto = document.querySelector('.playerAdded');
}

function DefDragEnd(){
    this.classList.remove("playerAddedZa");
}

Goleiro.forEach((caixa) => {
    caixa.addEventListener("dragover", GlsoltarPlayer);
    caixa.addEventListener("dragend", GlDragEnd);
});

function GlsoltarPlayer() {
    const arrastadoGl = document.querySelector(".playerAddedGl");
    this.appendChild(arrastadoGl);
}

function GlDragEnd(){
    this.classList.remove("playerAddedGl");
}