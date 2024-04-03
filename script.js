let player = document.getElementById('eplayer')
let lista = document.getElementById('elista')
let res = document.getElementById('res')
let optionsSelect = document.getElementById('listaSelect')
let inputPlayers = document.getElementById('eplayer')
let valores = []
const sort = document.querySelector(".btn-sort")
let strg = ''
let eqlTeam = false
let time1 = []
let time2 = []
let bots = []

let botsCheck = []

// Verifica se ja tem na lista
function inLista(n, l) {
  if (l.indexOf(n) != -1) {
    return true
  } else {
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

inputPlayers.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionar()
  }
});
// Função para adicionar
function adicionar() {
  if (player.value == '' || !player.value.trim()) {   //Verifica se há um nome inserido
    alert('Insirá o nome do criminoso!')
  } else if (!inLista(player.value, valores)) { //Verifica se tem na lista
    valores.push(player.value)
    let item = document.createElement('option')
    item.text = ` ${player.value} `
    lista.appendChild(item)


  } else {
    window.alert('Valor Inválido, ou já está na lista!') //Aviso caso já tenha o nome
  }


  //Reseta o campo e deixa selecionado
  player.value = ''
  player.focus()



}


function equilibrarTime() {
  strg += `Selecione até 4 bagres para jogarem em times separados na mesma lane: <br>`
  if (eqlTeam === false) {
    eqlTeam = true
  }

  for (let j = 0; j < valores.length; j++) {
    strg += `<label>
        <input type="checkbox" id="${valores[j]}" value="${valores[j]}"> ${valores[j]}
        </label><br>`
  }

  optionsSelect.innerHTML += strg
}

function limpar() {  //Limpa os campos da lista e dos times para gerar novos times
  if (eqlTeam === true) {
    window.location.reload(true);
  } else {
    valores.length = 0
    document.getElementById('elista').innerText = null;
    document.getElementById('res').innerText = null;
    player.value = ''
    player.focus()
    sort.value = 'Sortear'
  }

}

// Função antiga com Erros
// function sortear(l) {

//   if (eqlTeam === true) {
//     if (sort.value.length == 7) {
//       sort.value = 'Sortear Novamente'
//     }
//     let bots = separarBot()
//     let laneBot = Math.round((Math.random() * 10 + 1) / 2)
//     let indexBot0 = valores.indexOf(bots[0])
//     let indexBot1 = valores.indexOf(bots[1])

//     if (indexBot0 != -1) {
//       valores.splice(valores.indexOf(bots[0]), 1);
//     }

//     if (indexBot1 != -1) {
//       valores.splice(valores.indexOf(bots[1]), 1);
//     }
//     let currentIndex = valores.length, randomIndex;
//     // embaralha a lista enquanto houver elementos nas posições
//     while (currentIndex != 0) {

//       // Seleciona um elemento aleatoriamente
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       // troca o elemento selecionado com o elemento que possui a posição
//       let aux = valores[currentIndex];
//       valores[currentIndex] = valores[randomIndex];
//       valores[randomIndex] = aux
//     }


//     //Separa os times e loga no // console os times
//     let time1 = valores.slice(0, (valores.length / 2));
//     let time2 = valores.slice((valores.length / 2), valores.length);
//     // console.log("lane bot -> " + laneBot);

//     for (let i = 0; i < 5; i++) {
//       if (i == laneBot) {
//         timeF1[i] = bots[0]
//       } else if (i > laneBot) {
//         timeF1[i] = time1[i - 1]
//       } else {
//         timeF1[i] = time1[i]
//       }
//     }
//     for (let i = 0; i < 5; i++) {
//       if (i == laneBot) {
//         timeF2[i] = bots[1]
//       } else if (i > laneBot) {
//         timeF2[i] = time2[i - 1]
//       } else {
//         timeF2[i] = time2[i]
//       }
//     }
//     // console.log(timeF1);
//     // console.log(time1);
//     // console.log(timeF2);
//     // console.log(time2);

//     printTeams()



//   } else {
//     if (sort.value.length == 7) {
//       sort.value = 'Sortear Novamente'
//     }
//     // verifica se a tamanho da lista esta correto
//     if (valores.length < 10 || valores.length > 10) {
//       alert('Insira 10 players!')
//       // console.error('Insira mais 1 player!');
//     } else {
//       let currentIndex = valores.length, randomIndex;
//       // embaralha a lista enquanto houver elementos nas posições
//       while (currentIndex != 0) {

//         // Seleciona um elemento aleatoriamente
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         // troca o elemento selecionado com o elemento que possui a posição
//         let aux = valores[currentIndex];
//         valores[currentIndex] = valores[randomIndex];
//         valores[randomIndex] = aux
//       }


//       //Separa os times e loga no // console os times
//       timeF1 = valores.slice(0, (valores.length / 2));
//       timeF2 = valores.slice((valores.length / 2), valores.length);
//       // console.log("time 1:" + timeF1)
//       // console.log("time 2:" + timeF2)

//       printTeams()

//     }
//   }

//   function separarBot() {
//     const checkboxes = document.querySelectorAll('input[type=checkbox]')
//     checkboxes.forEach((checkbox) => {
//       if (checkbox.checked) {
//         botsCheck.push(checkbox.value);
//       }
//     })
//     // console.log(botsCheck);
//     return (botsCheck)
//   }
// }
// Função antiga com Erros

function teamSort(l) {



  if (eqlTeam === true) {

    bots = separarBot()
    bots = shuffle(bots)
    let laneBots = gerarLanes(bots.length / 2)
    if (bots.length > 2) {

    }


    if (valores.length == 10) {
      for (let i = 0; i < bots.length; i++) {
        valores.splice(valores.indexOf(bots[i]), 1)
      }
    }
    valores = shuffle(valores)

    time1 = valores.slice(0, (valores.length / 2));
    time2 = valores.slice((valores.length / 2), valores.length);


    time1.splice(laneBots[0], 0, bots[0])
    time2.splice(laneBots[0], 0, bots[1])


    if (laneBots.length > 1) {
      time1.splice(laneBots[1], 0, bots[2])
      time2.splice(laneBots[1], 0, bots[3])

    }

    printTeams()




  } else {

    // verifica se a tamanho da lista esta correto
    if (valores.length < 10 || valores.length > 10) {
      alert('Insira 10 players!')
    } else {

      valores = shuffle(valores)
      time1 = valores.slice(0, (valores.length / 2));
      time2 = valores.slice((valores.length / 2), valores.length);

      printTeams()

    }

  }

  function separarBot() {

    if (botsCheck.length > 0) {
      return botsCheck
    } else {
      const checkboxes = document.querySelectorAll('input[type=checkbox]')
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          botsCheck.push(checkbox.value);
        }
      })
      return (botsCheck)
    }

  }

  if (sort.value.length == 7) {
    sort.value = 'Sortear Novamente'
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // gera um número aleatório entre 0 e i
    [array[i], array[j]] = [array[j], array[i]]; // troca os elementos de posição
  }
  return array;
}

function gerarLanes(j) {
  var arrayLanes = []
  for (let i = 0; i < j; i++) {
    arrayLanes.push(Math.floor((Math.random() * 5))); // gera um número aleatório entre 0 e 4)
  }
  return arrayLanes
}



function printTeams() {
  res.innerHTML = ''
  res.innerHTML += `--------------------<br>`
  res.innerHTML += `
    \u{2B07}TIME 1\u{2B07} <br>
    TOP ${time1[0]}<br>
    JG  ${time1[1]}<br>
    MID ${time1[2]}<br>
    ADC ${time1[3]}<br>
    SUP ${time1[4]}<br> `
  res.innerHTML += `--------------------<br>`

  res.innerHTML += `
    \u{2B07}TIME 2\u{2B07} <br>
    TOP ${time2[0]}<br>
    JG  ${time2[1]}<br>
    MID ${time2[2]}<br>
    ADC ${time2[3]}<br>
    SUP ${time2[4]}<br> `
  res.innerHTML += `--------------------<br>`

  res.innerHTML += `<button onclick="copyToClipBoard()" class="btn-copy">Copy Teams</button>`
  //Procurar saber como fazer a posição do vetor dos times imprimir em cada role a posição no vetor
}

function copyToClipBoard() {
  let strgToCopy = ''
  strgToCopy = `
    \u{2B07}TIME 1\u{2B07}
    TOP ${time1[0]}
    JG  ${time1[1]}
    MID ${time1[2]}
    ADC ${time1[3]}
    SUP ${time1[4]}
    -----------------
    \u{2B07}TIME 2\u{2B07}
    TOP ${time2[0]}
    JG  ${time2[1]}
    MID ${time2[2]}
    ADC ${time2[3]}
    SUP ${time2[4]}`

  navigator.clipboard.writeText(strgToCopy);

}