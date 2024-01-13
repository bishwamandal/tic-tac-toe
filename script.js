let btnRef = window.document.querySelectorAll('.button-option');
let popupRef = window.document.querySelector('.popup');
let newgameBtn = window.document.querySelector('#new-game');
let restartBtn = window.document.querySelector('#restart');
let msgRef = window.document.querySelector('#message');

let winningPattern = [
    [0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8], [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "'X' Wins";
    } else if (letter == "O") {
        msgRef.innerHTML = "'O' Wins";
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "It's a Draw";
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if (element1 && element1 === element2 && element2 === element3) {
            winFunction(element1);
            break;
        }
    }
};

const computerMove = () => {
    let emptyCells = Array.from(btnRef).filter((btn) => btn.innerText === "");
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].innerText = "O";
        emptyCells[randomIndex].disabled = true;
        xTurn = true;
        count += 1;
        winChecker();
        changeTurn();
    }
};

const changeTurn = () => {
    if (xTurn && count < 9) {
        computerMove();
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn && element.innerText === "") {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
            count += 1;
            winChecker();
            changeTurn();
        }
    });
});
