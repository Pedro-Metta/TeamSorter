let player = document.getElementById('eplayer')
let lista = document.getElementById('elista')
let res = document.getElementById('res')
let optionsSelect = document.getElementById('listaSelect')
let valores = []
const sort = document.getElementById("btn-sort")
let strg = ''
let eqlTeam = false
let timeF1 = []
let timeF2 = []

let botsCheck = []

// Verifica se ja tem na lista
function inLista(n, l){
    if(l.indexOf(n) != -1){
        return true
    }else {
        return false
    }
}

// function isSpace(n){
//     if(player.length <= 2){
//         return n = 0
//     } else {
//         return n = 1
//     }
// }

// Função para adicionar
function adicionar(){
    if(player.value == ''|| !player.value.trim()){   //Verifica se há um nome inserido
        alert('Insirá o nome do criminoso!')
    } else if(!inLista(player.value, valores)){ //Verifica se tem na lista
        valores.push(player.value)
        let item = document.createElement('option')
        item.text = ` ${player.value} `
        lista.appendChild(item)


    }else {
        window.alert('Valor Inválido, ou já está na lista!') //Aviso caso já tenha o nome
    }

    
    //Reseta o campo e deixa selecionado
    player.value = ''
    player.focus()

    

}


function equilibrarTime() {
    strg += `Selecione 2 bots para jogarem em times separados na mesma lane: <br>`
    if(eqlTeam === false) {
        eqlTeam = true
    }

    for (let j = 0 ; j < valores.length ; j++) {
        strg += `<label>
        <input type="checkbox" id="${valores[j]}" value="${valores[j]}"> ${valores[j]}
        </label><br>`
    }

    optionsSelect.innerHTML+= strg

    // console.log(strg);
}

function limpar(){  //Limpa os campos da lista e dos times para gerar novos times
    
    valores.length = 0
    document.getElementById('elista').innerText = null;
    document.getElementById('res').innerText = null;
    document.getElementById('optionsSelect').innerText = null;
    player.value = ''
    player.focus()
    sort.value = 'Sortear'

}

function sortear(l){

    if(eqlTeam === true) {
        if (sort.value.length == 7) {
            sort.value = 'Sortear Novamente'
        } 
        let bots = separarBot()
        let laneBot =  Math.round((Math.random() * 10 + 1) / 2)
        let indexBot0 = valores.indexOf(bots[0])
        let indexBot1 = valores.indexOf(bots[1])

        if ( indexBot0 != -1 ){
            valores.splice(valores.indexOf(bots[0]), 1);
        }

        if ( indexBot1 != -1 ){
            valores.splice(valores.indexOf(bots[1]), 1);
        }
        let currentIndex = valores.length, randomIndex;
        // embaralha a lista enquanto houver elementos nas posições
        while (currentIndex != 0) {
    
          // Seleciona um elemento aleatoriamente
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          // troca o elemento selecionado com o elemento que possui a posição
          let aux = valores[currentIndex];
          valores[currentIndex] = valores[randomIndex];
          valores[randomIndex] = aux
        }
    
       
        //Separa os times e loga no // console os times
        let time1 = valores.slice(0, (valores.length / 2));
        let time2 = valores.slice((valores.length / 2), valores.length);
        // console.log("lane bot -> " + laneBot);

        for(let i = 0; i < 5; i++){
            if(i == laneBot){
                timeF1[i] = bots[0]
            } else if (i > laneBot ){
                timeF1[i] = time1[ i - 1]
            } else {
                timeF1[i] = time1[i]
            }
        }
        for(let i = 0; i < 5; i++){
            if(i == laneBot){
                timeF2[i] = bots[1]
            } else if (i > laneBot ){
                timeF2[i] = time2[ i - 1]
            } else {
                timeF2[i] = time2[i]
            }
        }
        // console.log(timeF1);
        // console.log(time1);
        // console.log(timeF2);
        // console.log(time2);

        printTeams()
        


    } else {
        if (sort.value.length == 7) {
            sort.value = 'Sortear Novamente'
        } 
        // verifica se a tamanho da lista esta correto
        if (valores.length % 2 != 0) {
            alert('Insira mais 1 player')
            // console.error('Insira mais 1 player!');
        } else{
            let currentIndex = valores.length, randomIndex;
            // embaralha a lista enquanto houver elementos nas posições
            while (currentIndex != 0) {
        
              // Seleciona um elemento aleatoriamente
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
        
              // troca o elemento selecionado com o elemento que possui a posição
              let aux = valores[currentIndex];
              valores[currentIndex] = valores[randomIndex];
              valores[randomIndex] = aux
            }
        
           
            //Separa os times e loga no // console os times
            timeF1 = valores.slice(0, (valores.length / 2));
            timeF2 = valores.slice((valores.length / 2), valores.length);
            // console.log("time 1:" + timeF1)
            // console.log("time 2:" + timeF2)

            printTeams()
           
        }
    }
             
    function separarBot(){
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            botsCheck.push(checkbox.value);
        }
      })
      // console.log(botsCheck);
      return(botsCheck)
    }
}

function printTeams(){
    res.innerHTML = ''
    res.innerHTML += `--------------------<br>`
    res.innerHTML += `
    \u{2B07}TIME 1\u{2B07} <br>
    TOP ${timeF1[0]}<br>
    JG  ${timeF1[1]}<br>
    MID ${timeF1[2]}<br>
    ADC ${timeF1[3]}<br>
    SUP ${timeF1[4]}<br> `
    res.innerHTML += `--------------------<br>`

    res.innerHTML += `
    \u{2B07}TIME 2\u{2B07} <br>
    TOP ${timeF2[0]}<br>
    JG  ${timeF2[1]}<br>
    MID ${timeF2[2]}<br>
    ADC ${timeF2[3]}<br>
    SUP ${timeF2[4]}<br> `
    res.innerHTML += `--------------------<br>`
    //Procurar saber como fazer a posição do vetor dos times imprimir em cada role a posição no vetor
}

const button = document.getElementById("btn-add");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});
