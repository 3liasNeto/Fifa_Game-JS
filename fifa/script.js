$('.ataque').click(
    function() { 
        $('.J-Ataque').show(); 
        $('.J-Meia').hide(); 
        $('.J-Defesa').hide(); 
        $('.J-Goleiro').hide(); 
 }
);

$('.meio').click(
    function() { 
        $('.J-Meia').show(); 
        $('.J-Ataque').hide(); 
        $('.J-Defesa').hide(); 
        $('.J-Goleiro').hide(); 
 }
);

$('.zaga').click(
    function() { 
        $('.J-Defesa').show(); 
        $('.J-Ataque').hide(); 
        $('.J-Meia').hide(); 
        $('.J-Goleiro').hide(); 
 }
);

$('.goleiro').click(
    function() { 
        $('.J-Goleiro').show(); 
        $('.J-Ataque').hide(); 
        $('.J-Meia').hide(); 
        $('.J-Defesa').hide(); 
 }
);

$('.player').on ('click',function(){
        $('.player').toggleClass("mark");
 }
);

const Ataque = document.querySelectorAll(".atacantes");
const Meio = document.querySelectorAll(".meiocampo");
const Defesa = document.querySelectorAll(".zagueiros");
const Goleiro =document.querySelectorAll(".gol");
const players = document.querySelectorAll(".drag");
const caixa = document.querySelectorAll(".player");

players.forEach((players) =>{
    players.addEventListener("dragstart", startP);
    players.addEventListener('dragend', dragEnd);
    players.addEventListener('drag', pDrag);
});

function startP(){
    this.classList.add("arrastando");
}

function dragEnd(){
    this.classList.remove("arrastando");
    this.classList.add("playerAdded");
    
}

function pDrag(){

}


// DropZone 
caixa.forEach((caixa) => {
caixa.addEventListener("dragover",soltarPlayer);
caixa.addEventListener("drop",dropPlayer);
caixa.addEventListener('dragenter', enterPlayer);
caixa.addEventListener('dragleave', leavePlayer);
caixa.addEventListener('click',removePl);
});

function soltarPlayer(e){
    const arrastado = document.querySelector(".arrastando");
    this.appendChild(arrastado);
    this.classList.remove("player");

}

function dropPlayer(){
    
}

function enterPlayer(){

}

function leavePlayer(){

}

function removePl(){
    const playerPronto = document.querySelector('.playerAdded');

        
}

        

