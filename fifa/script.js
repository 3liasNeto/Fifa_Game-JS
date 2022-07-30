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

$('.pl1').on ('click',function(){
    $('.p1').attr("src","ataque.png");
}
);

const players = document.querySelectorAll("[draggable='true']");
const caixa = document.querySelector(".player");

function startP(){
    console.log("certo");
    this.classList.add("arrastando");
}

function soltarPlayer(){
    this.classList.add("hover");
    const arrastado = document.querySelector(".arrastando");
    this.appendChild(arrastado);
}

players.forEach((players) =>{
    players.addEventListener("dragstart", startP);
});

caixa.addEventListener("dragover",soltarPlayer);