const inputName = document.querySelector('.name');
const checked = document.querySelector('.checked');
const btnConfirmar = document.querySelector('.btn-confirmar');
const containerLogin = document.querySelector('.container-login');
const divBlur = document.querySelector('.div-blur');
const user = document.querySelector('.user')
const containerFinishWeek = document.querySelector('.container-finish-week')

// Definindo como a página principal vai abrir
const choicePag = () => {

  const whatName = localStorage.getItem('whatName');
  const isTraining = localStorage.getItem('isTraining')
  const diasSemanas = document.querySelectorAll('.dia')
  
  if (whatName) {
    containerLogin.style.display = 'none'
    divBlur.style.filter = 'none'
    user.textContent = `Olá, ${whatName}`
  } else {
    containerLogin.style.display = 'flex'
    divBlur.style.filter = 'blur(3px)'
  }
  if (isTraining) {
    diasSemanas.forEach((diaSemana, ind) => {
    diaSemana.classList.remove('dia-disabled')
    });
    const msgUser = document.querySelector('.msg-user')
    const info = document.querySelector('.info')
    msgUser.textContent = 'Aqui está o seu treino personalizado'
    info.innerHTML = '• Clique no <strong>dia da semana</strong> para vizualizar o treino diário.<br>• Ao finalizar cada exercício, pode <strong>clicar</strong> nele para dar o <strong>"check"</strong> de concluído.<br>• Ao concluir todos os exercícios do dia, o sinal de <strong>"check"</strong> vai ser adicionado ao <strong>dia da semana</strong>.<br>• Clique no botão de <strong>desfazer treino</strong> caso deseje <strong>refazer</strong> o treino semanal.'
  }
  const whatPag = localStorage.getItem('pag')
  if (whatPag == 2) {
    const whatDay = JSON.parse(localStorage.getItem('whatDay'))
    whatDay.pop()
    localStorage.setItem('whatDay', JSON.stringify(whatDay))
    localStorage.removeItem('diaSemana')
    localStorage.setItem('pag', 1)
    location.reload()
  }

}

// Criador de elementos
const creatElement = (tag, nClass, className1, className2, className3) => {
  const element = document.createElement(tag)
  if (nClass == 1) {
    element.classList.add(className1)
  } else if (nClass == 2) {
    element.classList.add(className1)
    element.classList.add(className2)
  } else if (nClass == 3) {
    element.classList.add(className1)
    element.classList.add(className2)
    element.classList.add(className3)
  }
  
  return element;
}

// Removendo OnClick quando o isTraining estiver True e ativando dropDown
const removendoOnclick = () => {
  const nodeLDias = document.querySelectorAll('.dia')
  const dias = Array.from(nodeLDias)
  const btnDesfazerTreino = document.querySelector('#btnDesfazer')
  listDropDownIsOpen = []
  dias.forEach(dia => {
    dia.removeAttribute('onclick')
    dia.addEventListener('click', () => {
      const containerDropDown = dia.nextElementSibling
      if (containerDropDown.style.display == 'none' || containerDropDown.style.display == '') {
        containerDropDown.style.display = 'flex'
        btnDesfazerTreino.classList.add('disabled')
        if (!listDropDownIsOpen.includes(dia.textContent)) {
          listDropDownIsOpen.push(dia.textContent)
        }
        if (listDropDownIsOpen.length > 1) {
          const toCloseDropDown = listDropDownIsOpen.shift()
          const diatoCloseDropDown = dias.find(elemento => elemento.textContent === toCloseDropDown)
          diatoCloseDropDown.nextElementSibling.style.display = 'none'
        }
      } else {
        containerDropDown.style.display = 'none'
        btnDesfazerTreino.classList.remove('disabled')
      }
    })
  })
}

// Verificando botão de desfazer treino
const desfazerTreino = () => {
  const divDesfazer = document.querySelector('.menu-rodape')
  const isTraining = localStorage.getItem('isTraining')
  if (isTraining) {
    divDesfazer.style.display = 'flex'
  } else if (!isTraining) {
    divDesfazer.style.display = 'none'
  }
}

// Removendo disabled do dia
const removeDisableDay = () => {
  const isTraining = localStorage.getItem('isTraining')
  const whatDay = JSON.parse(localStorage.getItem('whatDay'))
  const ter = document.querySelector('.ter')
  const qua = document.querySelector('.qua')
  const qui = document.querySelector('.qui')
  const sex = document.querySelector('.sex')
  const sab = document.querySelector('.sab')
  const dom = document.querySelector('.dom')
  if (isTraining == 'true') {
    removendoOnclick()
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
    qui.classList.remove('day-disabled')
    sex.classList.remove('day-disabled')
    sab.classList.remove('day-disabled')
    dom.classList.remove('day-disabled')
  }
  if (whatDay.length == 1) {
    ter.classList.remove('day-disabled')
  } else if (whatDay.length == 2) {
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
  } else if (whatDay.length == 3) {
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
    qui.classList.remove('day-disabled')
  } else if (whatDay.length == 4) {
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
    qui.classList.remove('day-disabled')
    sex.classList.remove('day-disabled')
  } else if (whatDay.length == 5) {
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
    qui.classList.remove('day-disabled')
    sex.classList.remove('day-disabled')
    sab.classList.remove('day-disabled')
  } else if (whatDay.length == 6) {
    ter.classList.remove('day-disabled')
    qua.classList.remove('day-disabled')
    qui.classList.remove('day-disabled')
    sex.classList.remove('day-disabled')
    sab.classList.remove('day-disabled')
    dom.classList.remove('day-disabled')
  }
}

// Mantendo o OK no dia caso a página seja recarregada
const diaOkReloadPag = () => {
  const listDayOk = JSON.parse(localStorage.getItem('listDayOk'))
  const listDayOkRest = JSON.parse(localStorage.getItem('listDayOkRest'))
  const btnReiniciar = document.querySelector('#btnReiniciar')
  const tagsP = document.querySelectorAll('.dia')
  const listaTagsP = Array.from(tagsP)
  if (listDayOk.length != 0) {
    listaTagsP.forEach((tagP, ind) => {

      listDayOk.forEach((dayOk, ind) => {
        if (tagP.textContent == dayOk) {
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'
          tagP.appendChild(imgOk)
          tagP.classList.add('day-concluido')
          btnReiniciar.classList.remove('disabled')
        }
      })
    })
  }

  if (listDayOkRest.length != 0) {
    listaTagsP.forEach((tagP, ind) => {

      listDayOkRest.forEach((dayOkRest, ind) => {
        if (tagP.textContent == dayOkRest) {
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'
          tagP.appendChild(imgOk)
          tagP.classList.add('day-concluido-rest')
          btnReiniciar.classList.remove('disabled')
        }
      })
    })
  }
  
}

// Evento de carregar página
document.addEventListener('DOMContentLoaded', () => {
  choicePag()
  desfazerTreino()
  removeDisableDay()
  criandoTreino()
  diaOkReloadPag()
})

const whatDay = localStorage.getItem('whatDay')

// Verificando se o input e o checked está preenchido
const alternandoButton = () => {

  const isInputName = inputName.value.trim() !== '';
  const isChecked = checked.checked;
  if (isInputName && isChecked) {
    btnConfirmar.classList.remove('btn-confirmar-disabled')
  } else {
    btnConfirmar.classList.add('btn-confirmar-disabled')
  }

}
inputName.addEventListener('input', alternandoButton);
checked.addEventListener('click', alternandoButton);

// Clicando botão de Confirmar (div-login)
const clicandoBtnConfirmar = () => {

  containerLogin.style.display = 'none'
  divBlur.style.filter = 'none'
  localStorage.setItem('whatName', inputName.value)
  user.textContent = `Olá, ${inputName.value}!`

}

// Clicando no dia da semana
const clickDia = (dia) => {
  const whatDay = JSON.parse(localStorage.getItem('whatDay'))
  if (whatDay) {
    whatDay.push(dia)
    localStorage.setItem('whatDay', JSON.stringify(whatDay))
  } else {
    const whatDay = []
    whatDay.push(dia)
    localStorage.setItem('whatDay', JSON.stringify(whatDay))
  }
  localStorage.setItem('diaSemana', dia)
  localStorage.setItem('pag', 2)
  window.location.href = "pages/treino-grupamento.html";

}

let contTotalCheck = 0
// Ativando botão de Reiniciar Semana e Desfazer Treino (Evitar repetir código)
const removeDisabledBtn = () => {
  const btnDesfazer = document.querySelector('#btnDesfazer')
  const btnReiniciar = document.querySelector('#btnReiniciar')
  btnDesfazer.classList.remove('disabled')
  btnReiniciar.classList.remove('disabled')
  contTotalCheck = Number(localStorage.getItem('contTotalCheck'))
  localStorage.removeItem('contTotalCheck')
  contTotalCheck += 1
  localStorage.setItem('contTotalCheck', contTotalCheck)
}

// Verificando botão de confirmar finish week
const checkBtnFinishWeek = () => {
  contTotalCheck = Number(localStorage.getItem('contTotalCheck'))
  if (contTotalCheck == 7) {
    containerFinishWeek.style.display = 'flex'
    divBlur.style.filter = 'blur(3px)'
    const btnReiniciar = document.querySelector('#btnReiniciar')
    const btnDesfazer = document.querySelector('#btnDesfazer')
    btnReiniciar.classList.add('disabled')
    btnDesfazer.classList.add('disabled')
  }
}

// Colocando os dias da semana que estão com OK no local storage
const setDayOkLocalStorage = (day, type) => {
  if (type == 'training') {
    let listDayOk = JSON.parse(localStorage.getItem('listDayOk'))
    if (listDayOk) {
      if (!listDayOk.includes(day)) {
        listDayOk.push(day)
        localStorage.setItem('listDayOk', JSON.stringify(listDayOk))
      }
    } else {
      listDayOk = []
      listDayOk.push(day)
      localStorage.setItem('listDayOk', JSON.stringify(listDayOk))
    }
  }

  if (type == 'rest') {
    let listDayOkRest = JSON.parse(localStorage.getItem('listDayOkRest'))
    if (listDayOkRest) {
      if (!listDayOkRest.includes(day)) {
        listDayOkRest.push(day)
        localStorage.setItem('listDayOkRest', JSON.stringify(listDayOkRest))
      }
    } else {
      listDayOkRest = []
      listDayOkRest.push(day)
      localStorage.setItem('listDayOkRest', JSON.stringify(listDayOkRest))
    }
  }
}

// Criando treino dinamicamente
const criandoTreino = () => {
  const listaTreino = []
  const treinoSegunda = JSON.parse(localStorage.getItem('treinoSegunda'))
  const treinoTerça = JSON.parse(localStorage.getItem('treinoTerça'))
  const treinoQuarta = JSON.parse(localStorage.getItem('treinoQuarta'))
  const treinoQuinta = JSON.parse(localStorage.getItem('treinoQuinta'))
  const treinoSexta = JSON.parse(localStorage.getItem('treinoSexta'))
  const treinoSabado = JSON.parse(localStorage.getItem('treinoSábado'))
  const treinoDomingo = JSON.parse(localStorage.getItem('treinoDomingo'))
  listaTreino.push(treinoSegunda, treinoTerça, treinoQuarta, treinoQuinta, treinoSexta, treinoSabado, treinoDomingo)

  listaTreino.forEach((diaTreino, ind) => {

    const isTraining = localStorage.getItem('isTraining')
    const divContainerPrincipal  = document.querySelectorAll('.container-dia')
    const listaDivContainer = Array.from(divContainerPrincipal)
    const divContainerP = listaDivContainer[ind]
    const tagsP = document.querySelectorAll('.dia')
    const listatagsP = Array.from(tagsP)
    const tagP = listatagsP[ind]


    if (diaTreino[0] == 'descanso' && isTraining) {

      const divContainerDropDown = creatElement('div', 1, 'containerDropDownRest')
      const imgRest = creatElement('img', 1, 'imgRest')
      imgRest.src = '../assets/img/rest.png'
      const captionRest = creatElement('p', 1, 'captionRest')
      captionRest.textContent = 'Hoje é dia de descanso!'
      const btnConfirmRest = creatElement('button', 1, 'btnConfirmRest')
      btnConfirmRest.textContent = 'Confirmar'
      const imgOk = creatElement('img', 1, 'img-dia')
      imgOk.src = '../assets/img/concluido.png'
      divContainerDropDown.appendChild(imgRest)
      divContainerDropDown.appendChild(captionRest)
      divContainerDropDown.appendChild(btnConfirmRest)
      divContainerDropDown.style.display = 'none'
      divContainerP.appendChild(divContainerDropDown)

      btnConfirmRest.addEventListener('click', () => {

        divContainerDropDown.style.display = 'none'
        tagP.appendChild(imgOk)
        tagP.classList.add('day-concluido-rest')
        removeDisabledBtn()
        checkBtnFinishWeek()
        setDayOkLocalStorage(tagP.textContent, 'rest')
      })

    } else if (diaTreino && isTraining) {

      const divContainerDropDown = creatElement('div', 1, 'containerDropDown')
      const lengthTreino = diaTreino[2].length
      if (lengthTreino == 1) {

        let contCheck = 0
        const divTesteira = creatElement('div', 1, 'divTesteira')
        divTesteira.textContent = `${diaTreino[1][0].charAt(0).toUpperCase() + diaTreino[1][0].slice(1)}`
        divContainerDropDown.appendChild(divTesteira)
        const lengthCheck = diaTreino[2][0].length
        diaTreino[2][0].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][0][ind][0]
          caption = diaTreino[2][0][ind][1]
          qntSeries = diaTreino[2][0][ind][2]
          qntReps = diaTreino[2][0][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)
      } else if (lengthTreino == 2) {

        let contCheck = 0
        const divTesteira = creatElement('div', 1, 'divTesteira')
        divTesteira.textContent = `${diaTreino[1][0].charAt(0).toUpperCase() + diaTreino[1][0].slice(1)}`
        divContainerDropDown.appendChild(divTesteira)
        const lengthCheck = diaTreino[2][0].length + diaTreino[2][1].length
        diaTreino[2][0].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][0][ind][0]
          caption = diaTreino[2][0][ind][1]
          qntSeries = diaTreino[2][0][ind][2]
          qntReps = diaTreino[2][0][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)
        
        const divTesteira2 = creatElement('div', 1, 'divTesteira')
        divTesteira2.textContent = `${diaTreino[1][1].charAt(0).toUpperCase() + diaTreino[1][1].slice(1)}`
        divContainerDropDown.appendChild(divTesteira2)
        diaTreino[2][1].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][1][ind][0]
          caption = diaTreino[2][1][ind][1]
          qntSeries = diaTreino[2][1][ind][2]
          qntReps = diaTreino[2][1][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

      } else if (lengthTreino == 3) {

        let contCheck = 0
        const divTesteira = creatElement('div', 1, 'divTesteira')
        divTesteira.textContent = `${diaTreino[1][0].charAt(0).toUpperCase() + diaTreino[1][0].slice(1)}`
        divContainerDropDown.appendChild(divTesteira)
        const lengthCheck = diaTreino[2][0].length + diaTreino[2][1].length + diaTreino[2][2].length
        diaTreino[2][0].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][0][ind][0]
          caption = diaTreino[2][0][ind][1]
          qntSeries = diaTreino[2][0][ind][2]
          qntReps = diaTreino[2][0][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

        const divTesteira2 = creatElement('div', 1, 'divTesteira')
        divTesteira2.textContent = `${diaTreino[1][1].charAt(0).toUpperCase() + diaTreino[1][1].slice(1)}`
        divContainerDropDown.appendChild(divTesteira2)
        diaTreino[2][1].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][1][ind][0]
          caption = diaTreino[2][1][ind][1]
          qntSeries = diaTreino[2][1][ind][2]
          qntReps = diaTreino[2][1][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

        const divTesteira3 = creatElement('div', 1, 'divTesteira')
        divTesteira3.textContent = `${diaTreino[1][2].charAt(0).toUpperCase() + diaTreino[1][2].slice(1)}`
        divContainerDropDown.appendChild(divTesteira3)
        diaTreino[2][2].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][2][ind][0]
          caption = diaTreino[2][2][ind][1]
          qntSeries = diaTreino[2][2][ind][2]
          qntReps = diaTreino[2][2][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

      } else if (lengthTreino == 4) {

        let contCheck = 0
        const divTesteira = creatElement('div', 1, 'divTesteira')
        divTesteira.textContent = `${diaTreino[1][0].charAt(0).toUpperCase() + diaTreino[1][0].slice(1)}`
        divContainerDropDown.appendChild(divTesteira)
        const lengthCheck = diaTreino[2][0].length + diaTreino[2][1].length + diaTreino[2][2].length
        diaTreino[2][0].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][0][ind][0]
          caption = diaTreino[2][0][ind][1]
          qntSeries = diaTreino[2][0][ind][2]
          qntReps = diaTreino[2][0][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

        const divTesteira2 = creatElement('div', 1, 'divTesteira')
        divTesteira2.textContent = `${diaTreino[1][1].charAt(0).toUpperCase() + diaTreino[1][1].slice(1)}`
        divContainerDropDown.appendChild(divTesteira2)
        diaTreino[2][1].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][1][ind][0]
          caption = diaTreino[2][1][ind][1]
          qntSeries = diaTreino[2][1][ind][2]
          qntReps = diaTreino[2][1][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

        const divTesteira3 = creatElement('div', 1, 'divTesteira')
        divTesteira3.textContent = `${diaTreino[1][2].charAt(0).toUpperCase() + diaTreino[1][2].slice(1)}`
        divContainerDropDown.appendChild(divTesteira3)
        diaTreino[2][2].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][2][ind][0]
          caption = diaTreino[2][2][ind][1]
          qntSeries = diaTreino[2][2][ind][2]
          qntReps = diaTreino[2][2][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

        const divTesteira4 = creatElement('div', 1, 'divTesteira')
        divTesteira4.textContent = `${diaTreino[1][3].charAt(0).toUpperCase() + diaTreino[1][3].slice(1)}`
        divContainerDropDown.appendChild(divTesteira4)
        diaTreino[2][3].forEach((element, ind) => {
          
          const divContainerMed = creatElement('div', 1, 'divContainerMed')
          const divContainerSmall = creatElement('div', 3, 'cardStyle', 'cardStyleTreino', 'efeitoCard')
          const img = creatElement('img', 2, 'cardImg', 'imgStyle')
          const p = creatElement('p', 2, 'cardCaption', 'caption')
          const divSersReps = creatElement('div', 1, 'divSersReps')
          src = diaTreino[2][3][ind][0]
          caption = diaTreino[2][3][ind][1]
          qntSeries = diaTreino[2][3][ind][2]
          qntReps = diaTreino[2][3][ind][3]
          img.src = `${src}`
          p.textContent = `${caption}`
          divSersReps.innerHTML = `${qntSeries}<br>${qntReps}`
          divContainerSmall.appendChild(img)
          divContainerSmall.appendChild(p)
          divContainerMed.appendChild(divContainerSmall)
          divContainerMed.appendChild(divSersReps)
          divContainerDropDown.appendChild(divContainerMed)
          divContainerDropDown.style.display = 'none'
          const imgOk = creatElement('img', 1, 'img-dia')
          imgOk.src = '../assets/img/concluido.png'

          divContainerSmall.addEventListener('click', () => {
            if (divContainerSmall.classList.contains("cardComCheck", "::before")) {
              divContainerSmall.classList.remove("cardComCheck", "::before")
              contCheck -= 1
              if (lengthCheck != contCheck) {
                divContainerDropDown.style.display = 'flex'
              }
            } else {
              divContainerSmall.classList.add("cardComCheck", "::before")
              contCheck += 1
              if (lengthCheck == contCheck) {
                divContainerDropDown.style.display = 'none'
                tagP.appendChild(imgOk)
                tagP.classList.add('day-concluido')
                contCheck = 0
                removeDisabledBtn()
                checkBtnFinishWeek()
                setDayOkLocalStorage(tagP.textContent, 'training')
              }
            }
          })

        })
        divContainerP.appendChild(divContainerDropDown)

      } 
    }
  })
}

// Clicando no botão de desfazer treino semanal
const clickDesfazerTreino = () => {
  localStorage.removeItem('treinoSegunda')
  localStorage.removeItem('treinoTerça')
  localStorage.removeItem('treinoQuarta')
  localStorage.removeItem('treinoQuinta')
  localStorage.removeItem('treinoSexta')
  localStorage.removeItem('treinoSábado')
  localStorage.removeItem('treinoDomingo')
  localStorage.removeItem('whatDay')
  localStorage.removeItem('diaSemana')
  localStorage.removeItem('isTraining')
  localStorage.removeItem('listDayOk')
  localStorage.removeItem('listDayOkRest')
  localStorage.removeItem('contTotalCheck')
  const msgUser = document.querySelector('.msg-user')
  const info = document.querySelector('.info')
  msgUser.textContent = 'Construa seu treino personalizado'
  info.innerHTML = '• Selecione o <strong>dia da semana um a um</strong> para montar seu treino personalizado, ao final, o treino ficará <strong>disponível para vizualização</strong>.'
  location.reload()
}

// Clicando no botão de info
function clickInfo() {
  const divInfo = document.querySelector('.div-info')
  if (divInfo.style.display == "block") {
      divInfo.style.display = "none";
  } else {
      divInfo.style.display = "block";
  }
}

// Clicando no botão de reiniciar semana
const clickReiniciarSemana = () => {
  const tagsP = document.querySelectorAll('.dia')
  const listatagsP = Array.from(tagsP)
  listatagsP.forEach((tagP, ind) => {
    const tag = tagP
    const imgOk = tag.children[0]
    if (imgOk) {
      imgOk.parentNode.removeChild(imgOk)
      tagP.classList.remove('day-concluido')
      tagP.classList.remove('day-concluido-rest')
    }
  })
  const tagsCheck = document.querySelectorAll('.cardStyle')
  const tagsCheckL = Array.from(tagsCheck)
  tagsCheckL.forEach((tagCheck, ind) => {
    const tag = tagCheck
    if (tag.classList.contains("cardComCheck", "::before")) {
      tag.classList.remove("cardComCheck", "::before")
    }
  })
  const btnReiniciar = document.querySelector('#btnReiniciar')
  btnReiniciar.classList.add('disabled')
  contTotalCheck = 0
  localStorage.removeItem('listDayOk')
  localStorage.removeItem('listDayOkRest')
  localStorage.removeItem('contTotalCheck')
}

// Clicando no botão de confimar finish week
const clickBtnFinishWeek = () => {
  clickReiniciarSemana()
  const btnDesfazer = document.querySelector('#btnDesfazer')
  btnDesfazer.classList.remove('disabled')
  containerFinishWeek.style.display = 'none'
  divBlur.style.filter = 'none'
}