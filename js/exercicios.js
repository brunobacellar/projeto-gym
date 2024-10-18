const btnConfirm = document.querySelector("#btn");
const imgInfo = document.querySelector(".img-info");
const divInfo = document.querySelector(".div-info");
let totalSelectCards = 0;
let exercicios = [];

// Clicando no botão de voltar
const clickBtnBack = () => {
    const grupamentos = JSON.parse(localStorage.getItem('grupamentos'))
    grupamentos.pop()
    localStorage.setItem('grupamentos', JSON.stringify(grupamentos))
    localStorage.setItem('pag', 2)
    window.location.href = 'treino-grupamento.html';
}

// Verificando botão de confirmar treino
function verificandoBtnConfirm() {
    if (totalSelectCards > 0 && totalSelectCards < 8) {
        btnConfirm.classList.remove("disabled");
    } else if (totalSelectCards > 7) {
        btnConfirm.classList.add("disabled");
    } else if (totalSelectCards < 3) {
        btnConfirm.classList.add("disabled");
    }
}

// Clicando no botão de info
function clickInfo() {
    if (divInfo.style.display == "block") {
        divInfo.style.display = "none";
    } else {
        divInfo.style.display = "block";
    }
}

// Declarando variáveis
function variaveis(n) {
    const card = document.querySelector(`.card${n}`);
    const inputS = document.querySelector(`.inputS${n}`);
    const inputR = document.querySelector(`.inputR${n}`);
    const dropDownS = document.querySelector(`.dropDownS${n}`);
    const dropDownR = document.querySelector(`.dropDownR${n}`);
    const btn = document.querySelector(`.btn${n}`);
    const btnDesfazer = document.querySelector(`.divDesfazer${n}`);

    return [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer];
}

// Clicando no card
function selectCard(n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    if (card.style.opacity == "0.8") {
        card.style.opacity = "1";
    } else {
        card.style.opacity = "0.8";
    }
    if (inputS.style.display == "inline") {
        inputS.style.display = "none";
        inputS.value = "";
    } else {
        inputS.style.display = "inline";
    }
    if (inputR.style.display == "inline") {
        inputR.style.display = "none";
        inputR.value = "";
    } else {
        inputR.style.display = "inline";
    }
    if (dropDownS.style.display == "block") {
        dropDownS.style.display = "none";
    }
    if (dropDownR.style.display == "block") {
        dropDownR.style.display = "none";
    }
    if (btn.style.display == "inline") {
        btn.style.display = "none";
    } else {
        btn.style.display = "inline";
    }
}

// Revelando opções de Séries
function revelandoInputS(n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    if (dropDownR.style.display == "block") {
        dropDownR.style.display = "none";
    }
    if (dropDownS.style.display == "block") {
        dropDownS.style.display = "none";
    } else {
        dropDownS.style.position = "absolute";
        dropDownS.style.display = "block";
    }
}

// Revelando opções de Repetições
function revelandoInputR(n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    if (dropDownS.style.display == "block") {
        dropDownS.style.display = "none";
    }
    if (dropDownR.style.display == "block") {
        dropDownR.style.display = "none";
    } else {
        dropDownR.style.position = "absolute";
        dropDownR.style.display = "block";
    }
}

// Selecionando opção de Série
function choiceS(c, n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    const itemS = document.querySelector(`#itemS${n}-${c}`).innerHTML;
    inputS.value = itemS;
    dropDownS.style.display = "none";
    dropDownS.style.position = "static";
    verificandoBtn(n);
}

// Selecionando opção de Repetições
function choiceR(c, n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    const itemR = document.querySelector(`#itemR${n}-${c}`).innerHTML;
    inputR.value = itemR;
    dropDownR.style.display = "none";
    dropDownR.style.position = "static";
    verificandoBtn(n);
}

// Ativando Botão
function verificandoBtn(n) {
    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    if (inputS.value !== "" && inputR.value !== "") {
        btn.removeAttribute("disabled");
        btn.classList.remove("btnDesabilitado");
        btn.classList.add("btnActive");
    }
}

// Clicando no Botão
function clickBtn(n) {

    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    card.classList.add("cardComCheck", "::before");
    card.removeAttribute("onclick");
    card.classList.remove("efeitoCard");
    inputS.style.display = "none";
    inputR.style.display = "none";
    btn.style.display = "none";
    totalSelectCards += 1;
    verificandoBtnConfirm();
    btnDesfazer.style.display = "flex";
    imgCardC = document.querySelector(`.imgCardC${n}`);
    capCardC = document.querySelector(`.cap${n}`);
    const cardSave = [
        imgCardC.src,
        capCardC.textContent,
        inputS.value,
        inputR.value,
    ];
    exercicios.push(cardSave)

}

// Clicando no botão de desfazer
function clickBtnDesfazer(n) {

    const [card, inputS, inputR, dropDownS, dropDownR, btn, btnDesfazer] =
        variaveis(n);

    inputS.value = "";
    inputR.value = "";
    btnDesfazer.style.display = "none";
    card.style.opacity = "1";
    card.classList.remove("cardComCheck", "::before");
    card.setAttribute("onclick", `selectCard(${n})`);
    card.classList.add("efeitoCard");
    totalSelectCards -= 1;
    verificandoBtnConfirm();
    capCardC = document.querySelector(`.cap${n}`).textContent;
    const clearExercicios = exercicios.filter(
        (innerArray) => innerArray[1] !== capCardC
    );
    exercicios = clearExercicios

}

// Clicando no botão de salvar treino
function salvarTreino() {
    const getdiaSemana = localStorage.getItem("diaSemana");
    const getGrupamentos = JSON.parse(localStorage.getItem("grupamentos"));
    const getBuildingExercicios = JSON.parse(localStorage.getItem("buildingExercicios"));

    if (getdiaSemana && getGrupamentos && exercicios.length > 0) {
        localStorage.setItem('btnGrupamentoActive', 'true');
    }
    if (getBuildingExercicios) {
        getBuildingExercicios.push(exercicios)
        localStorage.setItem("buildingExercicios", JSON.stringify(getBuildingExercicios))
    } else {
        const buildingExercicios = []
        buildingExercicios.push(exercicios)
        localStorage.setItem("buildingExercicios", JSON.stringify(buildingExercicios))
    }

    localStorage.setItem('pag', 2)
    window.location.href = 'treino-grupamento.html';

}
