var palavrasDaFrase;
var c;
var usuario;
var qtLetrasFrase;
var plDigitada;
var plDigitadas = 0;
var contPl = 0 ;
var tempoDigitacao;
var spanAtual;
var fraseProp = "";
var pausado = true;
var opcao = document.getElementsByName('esc');
var frasesDisp = [
    'No principio era o verbo, e o verbo estava com Deus e o verbo era Deus. Ele estava no principio com Deus, todas as coisas foram feitas por ele e sem Ele nada do que foi feito se faria'
    ,
    'Portanto, agora já não há condenação para os que estão em Cristo Jesus, porque por meio de Cristo Jesus a lei do Espírito de vida me libertou da lei do pecado e da morte'
    ,
    'Tenho grande tristeza e constante angústia em meu coração. Pois eu até desejaria ser amaldiçoado e separado de Cristo por amor de meus irmãos, os de minha raça, o povo de Israel.'
    ,
    'Da mesma forma como Moises levantou a serpente no deserto, assim também é necessário que o filho do homem seja levantado, para que todo aquele que nele crer tenha a vida eterna. Porque Deus amou o mundo de tal maneira que deu o seu filho unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna'
    ,
    'Eu sou o pão vivo que desceu do céu; se alguém comer desse pão, viverá para sempre; e o pão que eu der é a minha carne, que eu darei pela vida do mundo. Disputavam, pois os Judeus... Jesus, pois lhes disse: Na verdade, na verdade vos digo que, se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis vida em vós mesmos'
    ,
    'é chegada a hora em que o Filho do Homem há de ser glorificado. Na verdade, na verdade vos digo que se o grão de trigo caindo na terra não morrer, fica ele só, mas se morrer dá muito fruto. Quem ama a sua vida perdê-la-a, e quem, neste mundo, aborrece a sua vida, guardá-la-a para a vida eterna.'
];

$(function(){
    $('#modalInicio').modal('show');
    // Trabalhando com temporizador
    class Data{
        constructor(minutos,segundos,milissegundos,idElemento){
            this.minutos = minutos;
            this.segundos = segundos;
            this.milissegundos = milissegundos;
            this.elemento = idElemento;
            this.intervalo;
        }
        loopDoTempo(){
            this.intervalo = setInterval(() => {
               this.milissegundos++;
               if(this.milissegundos == 100){
                   this.milissegundos = 0;
                   this.segundos++;
                   if(this.segundos == 60){
                       this.segundos = 0;
                       this.minutos++;
                   }
               }
               $(this.elemento).html(`${this.minutos}m:${this.segundos}s:${this.milissegundos}ms `);
            },10);
        }
        comeca(){
            this.loopDoTempo();
        }
        parar(){
            clearInterval(this.intervalo);
        }
    }
    class Digitador{
        constructor(nome,numPalavras,tempoDigit,nivel){
            this.nome = nome;
            this.numPalavras = numPalavras;
            this.tempoDigit = tempoDigit;
            this.minutosSeg = this.tempoDigit.minutos+"m : "+this.tempoDigit.segundos+"s"
            this.nivel = nivel;
        }
        nivelar(nivel){
            this.nivel = nivel;

            $("#nivel").removeClass();
            if(nivel == "Principiante"){
                $("#nivel").addClass('text-danger');
            }
            else if(nivel == "Amador"){
                $("#nivel").addClass('text-warning');
            }
            else if(nivel == "Normal"){
                $("#nivel").css("color","rgba(255, 68, 0, 0.658)");
            }
            else if(nivel == "Profissional"){
                $("#nivel").addClass('text-success');
            }
        }
    }
    $('#btnComeca').click(function(){
        if(opcao[0].checked){
            var posAleatoria = Math.floor(Math.random()*frasesDisp.length)
            fraseProp = frasesDisp[posAleatoria];
            comeca();
        }
        else if(opcao[1].checked){
            if($('#cxTexto').val().trim() != '' && $('#cxTexto').val().trim().length >= 5){
                fraseProp = $('#cxTexto').val().trim();
                comeca();
            }
            else{
                window.alert('Caixa de entrada vazia \n ou com poucos caracteres!\n 20 caracteres no minimo')
            }
        }
    })
    class classifica{
        constructor(qtdPal,tpIniciante,tpAmador,tpNormal,tpProfissional){
            this.qtdPal = qtdPal;
            this.tpIniciante = tpIniciante;
            this.tpAmador = tpAmador;
            this.tpNormal = tpNormal;
            this.tpProfissional = tpProfissional;
        }
    }
    var tempo1 = new classifica(
        '20 - 40',
        'mais de 1m:35s',
        '1m:35s',
        '1m:5s',
        '0m:45s'
    );
    var tempo2 = new classifica(
        '41 - 70',
        'mais de 2m:35s',
        '2m:35s',
        '1m:45s',
        '1m:25s'
    );
    var tempo3 = new classifica(
        '71 - 100',
        'mais de 3m:5s',
        '3m:5s',
        '2m:25s',
        '2m:5s'
    );
    function play(){
        $("#controla").removeClass();
        tempoDigitacao.comeca();
        $("textarea#texto").css("visibility","visible");
        $("#controla").addClass("glyphicon glyphicon-pause fa-lg");
        pausado = false;
    }
    function pausar(){
        $("#controla").removeClass();
        tempoDigitacao.parar();
        $("textarea#texto").css("visibility","hidden");
        pausado = true;
        $("#controla").addClass("glyphicon glyphicon-play fa-lg");
        $("body").focus();
}
    function comeca(){
        $('#modalInicio').modal('hide');

        insiraFrase(fraseProp);
        tempoDigitacao = new Data(0,0,0,'#time');
        $('#texto').keydown(function(){
            if(event.keyCode == 32){
                plDigitada = $('#texto').val().trim();
                spanAtual = $(`#frase span:eq(${contPl})`);
                if(plDigitada == spanAtual.text()){
                    if(contPl == 0){
                        play();
                    }
                    $('#texto').removeClass('errado');
                    $('#texto').addClass('text-primary');
    
                    $('#texto').val('');
                    spanAtual.css('color','white');
                    contPl++;
                    $('#plFalta').text(--qtLetrasFrase);
                    $('#plDigitadas').text(++plDigitadas);
                    if(qtLetrasFrase == 0){
                        terminar();
                    }
                }else{
                    $('#texto').removeClass('text-primary');
                    $('#texto').addClass('errado');
                    console.log('Esta errada');
                }
                console.log(event.which);
            }
        });
    }
    $('.entrada').slideUp(1);
        //ao carregar a pagina
        if(opcao[1].checked){
            $('.entrada').slideDown();
        }
    
    function inserindoClassificacao(obj){
        $('table #tr1 td:eq(0)').text(obj.qtdPal);

        $('table #tr1 td:eq(1)').text(obj.tpProfissional);
        $('table #tr2 td:eq(0)').text(obj.tpNormal);
        $('table #tr3 td:eq(0)').text(obj.tpAmador);
        $('table #tr4 td:eq(0)').text(obj.tpIniciante);
    }
    function terminar(){
        tempoDigitacao.parar();

        usuario = new Digitador(
        $('#nomeUS').val(),
        plDigitadas,
        {
            minutos:tempoDigitacao.minutos,
            segundos:tempoDigitacao.segundos,
        }
        )

        $('#digitador').text(usuario.nome);
        $('#qtdPalDigit').text(usuario.numPalavras+" palavras");

        $('#tempoPalDigit').text(usuario.minutosSeg);

        if(usuario.numPalavras >= 0 && usuario.numPalavras <= 40){
            inserindoClassificacao(tempo1);

            if(converteEmSegundos(usuario.minutosSeg)<= 45){
                usuario.nivelar("Profissional");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>45 && converteEmSegundos(usuario.minutosSeg)<=65){
                usuario.nivelar("Normal");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>65 && converteEmSegundos(usuario.minutosSeg)<=95){
                usuario.nivelar("Amador");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>95){
                usuario.nivelar("Principiante");
            }
        }
        else if(usuario.numPalavras >= 41 && usuario.numPalavras <= 70){
            inserindoClassificacao(tempo2);

            if(converteEmSegundos(usuario.minutosSeg)<= 85){
                usuario.nivelar("Profissional");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>85 && converteEmSegundos(usuario.minutosSeg)<=105){
                usuario.nivelar("Normal");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>105 && converteEmSegundos(usuario.minutosSeg)<=155){
                usuario.nivelar("Amador");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>155){
                usuario.nivelar("Principiante");
            }
        }
        else if(usuario.numPalavras >= 71 && usuario.numPalavras <= 100){
            inserindoClassificacao(tempo3);

            if(converteEmSegundos(usuario.minutosSeg)<= 125){
                usuario.nivelar("Profissional");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>125 && converteEmSegundos(usuario.minutosSeg)<=145){
                usuario.nivelar("Normal");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>145 && converteEmSegundos(usuario.minutosSeg)<=185){
                usuario.nivelar("Amador");
            }
            else if(converteEmSegundos(usuario.minutosSeg)>185){
                usuario.nivelar("Principiante");
            }
        }
        $('#nivel').text(usuario.nivel);
        $('#modal-final').modal('show');
    }

    function insiraFrase(frase){
        $('#frase').html(frase);
        // Separando cada palavra da frase
        palavrasDaFrase = $('#frase').text().split(' ');
        
        palavrasDaFrase = palavrasDaFrase.filter(function(elem){
            if(elem == ""){
                return false;
            }
            else{
                return true;
            }
        });
        // Inserindo cada palavra num 'span'
        palavrasDaFrase.forEach((elem,ind) => {
            elem = '<span>'+elem+'</span>';
            palavrasDaFrase[ind] = elem;
        });
        console.log(palavrasDaFrase);
        $('#frase').html(palavrasDaFrase.join(' '));
        //Exibindo informações sobre a frase na tela
        qtLetrasFrase = palavrasDaFrase.length;
        $('#plFalta').text(qtLetrasFrase);
        $('#plDigitadas').text(plDigitadas);
    
    }

    $(document).keydown(function(){
        if(event.which == 17){
            if(pausado){
                play();
            }else{
                pausar();
            }
        }
        // else if(event.which == 82){
        //    pausePlay(true);
        // }
        console.log(event.keyCode);
    });
    $('#esc1').click(function(){
        $('.entrada').slideUp();
    })
    $('#esc2').click(function(){
        $('.entrada').slideDown();
    })
//    tooltips do programa
$("[for='esc1'").tooltip({
    title:"<div class='glyphicon fa-lg glyphicon-info-sign'></div><br/> <span>Permita que o programa aleatoriamente escolha uma frase para que você digite ate um certo tempo!</span>",
    html:true,
    trigger:'hover',
    placement:'right',
    delay:{show:900,hide:300}
})
$("[for='esc2'").tooltip({
    title:"<div class='glyphicon fa-lg glyphicon-info-sign'></div><br/> <span>Permite que o usuario insira uma frase de <b>sua preferencia</b></span>",
    html:true,
    trigger:'hover',
    placement:'bottom',
    delay:{show:900,hide:300}
})
})
function converteEmSegundos(texto){
    var elems = texto.split(':');
    var min = +elems[0].replace('m','');
    var seg = +elems[1].replace('s','');

    for(let c = 0;c < min;c++){
        seg+=60;
    }
    return seg;
}
