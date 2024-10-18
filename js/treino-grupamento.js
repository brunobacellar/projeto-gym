// Verificando página
const verificandoPag = () => {
    const whatPag = localStorage.getItem('pag')
    if (whatPag == 3) {
        const grupamentos = JSON.parse(localStorage.getItem('grupamentos'))
        grupamentos.pop()
        localStorage.setItem('grupamentos', JSON.stringify(grupamentos))
        localStorage.setItem('pag', 2)
        location.reload()
      }
}

// Verificando se o grupamento já foi selecionado
const verificandoGrupamento = () => {
    const getGrupamentos = JSON.parse(localStorage.getItem('grupamentos'))
    const grupamentos = document.querySelectorAll('.grupo')
    const valueGrupamentos = Array.from(grupamentos).map(grupamentos => grupamentos.textContent);
    getGrupamentos.forEach(grupamento => {
        grupamentos.forEach((grupo, ind) => {
            if(valueGrupamentos[ind].toUpperCase() === grupamento.toUpperCase()) {
                grupo.classList.add('disabledGrupo')
            }
        })
    })
}

// Verificando botão salvar treino e descanso
const verificandoBtn = () => {
    const btnGrupamentoActive = localStorage.getItem('btnGrupamentoActive')
    const btnSalvarTreino = document.querySelector('#btnSave')
    const btnRest = document.querySelector('#rest')

    if (btnGrupamentoActive === "true") {
        btnSalvarTreino.classList.remove('disabled')
        btnRest.classList.add('disabled')
        localStorage.setItem('btnGrupamentoActive', 'false')
    } else {
        btnSalvarTreino.classList.add('disabled')
        btnRest.classList.remove('disabled')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    verificandoPag()
    verificandoBtn()
    verificandoGrupamento()
})

// Clicando no botão de info
function clickInfo() {
    const divInfo = document.querySelector(".div-info");
    if (divInfo.style.display == "block") {
        divInfo.style.display = "none";
    } else {
        divInfo.style.display = "block";
    }
}

// Clicando no botão de voltar
const clickBtnBack = () => {
    const whatDay = JSON.parse(localStorage.getItem('whatDay'))
    whatDay.pop()
    localStorage.setItem('whatDay', JSON.stringify(whatDay))
    localStorage.removeItem("diaSemana")
    localStorage.removeItem("grupamentos")
    localStorage.removeItem("buildingExercicios")
    localStorage.setItem('pag', 1)
    window.location.href = '../index.html';
}

// Clicando no grupo muscular
const clickGrupo = (grupo) => {

    let grupamentos = []
  
    const getGrupamentos = JSON.parse(localStorage.getItem('grupamentos'))

    if (JSON.parse(localStorage.getItem('grupamentos'))) {
        grupamentos = getGrupamentos
        grupamentos.push(grupo)
    } else {
        grupamentos = [grupo]
    }
    
    localStorage.setItem('grupamentos', JSON.stringify(grupamentos))
    localStorage.setItem('pag', 3)
    window.location.href = `exercicios-${grupo}.html`;

}

// Clicando no botão de salvar treino
const salvarTreino = () => {
    const whatDay = JSON.parse(localStorage.getItem('whatDay'))
    if (whatDay.length == 7) {
        localStorage.setItem('isTraining', 'true')
    }

    const getdiaSemana = localStorage.getItem("diaSemana");
    const getGrupamentos = JSON.parse(localStorage.getItem("grupamentos"));
    const getBuildingExercicios = JSON.parse(localStorage.getItem("buildingExercicios"));
    if (getdiaSemana == 'segunda-feira') {
        const treinoSegunda = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoSegunda', JSON.stringify(treinoSegunda));
    } else if (getdiaSemana == 'terça-feira') {
        const treinoTerça = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoTerça', JSON.stringify(treinoTerça));
    } else if (getdiaSemana == 'quarta-feira') {
        const treinoQuarta = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoQuarta', JSON.stringify(treinoQuarta));
    } else if (getdiaSemana == 'quinta-feira') {
        const treinoQuinta = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoQuinta', JSON.stringify(treinoQuinta));
    } else if (getdiaSemana == 'sexta-feira') {
        const treinoSexta = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoSexta', JSON.stringify(treinoSexta));
    } else if (getdiaSemana == 'sábado') {
        const treinoSabado = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoSábado', JSON.stringify(treinoSabado));
    } else if (getdiaSemana == 'domingo') {
        const treinoDomingo = [getdiaSemana, getGrupamentos, getBuildingExercicios]
        localStorage.setItem('treinoDomingo', JSON.stringify(treinoDomingo));
    }
    localStorage.removeItem("diaSemana")
    localStorage.removeItem("grupamentos")
    localStorage.removeItem("buildingExercicios")

    localStorage.setItem('pag', 1)
    window.location.href = '../index.html';
}

// Clicando no botão de descanso
const rest = () => {
    const whatDay = JSON.parse(localStorage.getItem('whatDay'))
    const descanso = ['descanso']
    if (whatDay.length == 1) {
        localStorage.setItem('treinoSegunda', JSON.stringify(descanso))
    } else if (whatDay.length == 2) {
        localStorage.setItem('treinoTerça', JSON.stringify(descanso))
    } else if (whatDay.length == 3) {
        localStorage.setItem('treinoQuarta', JSON.stringify(descanso))
    } else if (whatDay.length == 4) {
        localStorage.setItem('treinoQuinta', JSON.stringify(descanso))
    } else if (whatDay.length == 5) {
        localStorage.setItem('treinoSexta', JSON.stringify(descanso))
    } else if (whatDay.length == 6) {
        localStorage.setItem('treinoSábado', JSON.stringify(descanso))
    } else if (whatDay.length == 7) {
        localStorage.setItem('treinoDomingo', JSON.stringify(descanso))
        localStorage.setItem('isTraining', 'true')
    }

    localStorage.setItem('pag', 1)
    window.location.href = '../index.html';
}
