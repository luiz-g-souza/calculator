const temaClaro = '#ffd64e';
const temaEscuro = '#221933';

const numeros = Array.from(document.querySelectorAll('.numeros'))
const controles = Array.from(document.querySelectorAll('.controles-btn'))
const campo = document.getElementById('txt')
const log = document.querySelector('.sinal')

const togle = document.querySelector('.togle')
const tema_btn = document.querySelector('.tema-btn')
const calculadora = criarCalculadora()


// * Seta os listnners nos botões e atribui as funções
controles.forEach((ele)=>{
    ele.addEventListener("click", bt_controle);
})

numeros.forEach((ele)=>{
    ele.addEventListener("click", bt_numero);
})
numeros.forEach((ele)=>{
    ele.addEventListener("touchend", bt_numero);
})

numeros.forEach((ele)=>{
    ele.addEventListener("touchend", r);
})
controles.forEach((ele)=>{
    ele.addEventListener("touchend", r);
})

tema_btn.addEventListener('click', ()=>{
    
    if(togle.style.left=='0%' || togle.style.left=='') {
        togle.style.left='49.9%'
        document.documentElement.style.cssText=`--cor-de-fundo: ${temaEscuro}`
    }
    else{
        togle.style.left='0%'
        document.documentElement.style.cssText=`--cor-de-fundo: ${temaClaro}`
    }
})

// * fim do bloco de listnners


// * inica o bloco de funções
function r(){
    this.removeEventListener("click", bt_numero)
}
/*
function t(ev){
    console.log(ev.touches, ev.type)
}
*/


function bt_numero(){
    let out = ['1','2','3','4','5','6','7','8','9','0']
    let bt = this.innerText

    if(out.includes(bt)){
        campo.value += bt

    } else if(bt == ".") {
        if(!campo.value.includes('.')){
            if(campo.value.length == 0){
                campo.value += `0${bt}`
            }else{
                campo.value += bt
            }
        }

    } else if(bt == "C E") {
        campo.value = ""
        log.innerText=""
    } /*else{
        campo.value += bt
    }*/
    
}

function bt_controle(){
    let simb = ['/','*','-','+'];
    let teste = /[\*,\-,\/,\+]/;
    let bt = this.innerText;
    let valor = '0';
    var check = false;
    //verifica se já há um simbolo no log
    /*for (let a of simb) {
        if(log.innerText.includes(a)){
            var check = true
            break
        }
    }*/
    if(teste.test(log.innerText)){
        //var check = true
    }

    if(bt == '='){
        let preValor = log.innerText;
        let sinal = preValor.replaceAll(/[\d\.]/g,'');
        valor = Number(preValor.replace(/[\*,\-,\/,\+,\=]/,''));
        valorPosterior = Number(campo.value);
        let valorFinal;

        if(sinal == '/'){
            valorFinal = calculadora.divisao(valor, valorPosterior)
        } else if(sinal == '*'){
            valorFinal = calculadora.multiplicacao(valor, valorPosterior)
        } else if(sinal == '+') {
            valorFinal = calculadora.soma(valor, valorPosterior)
        } else if(sinal == '-') {
            valorFinal = calculadora.subtracao(valor, valorPosterior)
        } else{
            console.error('Erro no calculo!')
            console.error(preValor +' prevalor')
            console.error(sinal+' sinal')
            console.error(valor+' valor')
        } 

        if(valorFinal){
            log.innerText = String(valor).concat(sinal,valorPosterior,'=')
            campo.value = valorFinal
        } else log.innerText = '' 
    } else if(check == true){
    //alert(String(valor).concat(campo.value))
    console.log(`o valor de 'check' agora é ${check}`)
    } else {
        valor = campo.value
        log.innerText = valor.concat(bt) 
        campo.value = ""
    }
}


// * Encerra o Bloco de funções



function criarCalculadora(){
    let calculadora = {
        soma(a,b){
            return a + b
        },
        multiplicacao(a,b){
            return a * b
        },
        subtracao(a,b){
            return a - b
        },
        divisao(a,b){
            return a / b
        }
    }
    return calculadora
}