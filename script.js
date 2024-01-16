let btnRef = window.document.querySelectorAll('.button-option');
let popupRef = window.document.querySelector('.popup');
let newgameBtn = window.document.querySelector('#new-game');
let restartBtn = window.document.querySelector('#restart');
let msgRef = window.document.querySelector('#message');

let toggleBtn = document.getElementById("toggle-btn");
let changeTheme = document.querySelector(".text-wrapper");
let topTitle = document.querySelector(".toptitle");

let winningPattern = [[0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8], [3, 4, 5],[1, 4, 7], [0, 4, 8], [2, 4, 6],];

let xTurn = true;
let count = 0

toggleBtn.addEventListener("change", () => {
    if (toggleBtn.checked) {
        document.body.style.backgroundColor = '#2b2b2b';
    } else {
        document.body.style.backgroundColor = 'wheat';
    }
});

toggleBtn.addEventListener("change", () => {
    if (toggleBtn.checked) {
        changeTheme.style.color = '#ecc040';
        topTitle.style.color = '#ecc040';
        btnRef.forEach((element) => {
            element.style.backgroundColor = '#ee5a5a';
            element.style.color = 'wheat';
            element.style.boxShadow = '5px 5px 0 0 #ecc040';
        });
        document.documentElement.style.setProperty('--hover-border-color', '#ecc040');
    } else {
        changeTheme.style.color = '#ee5a5a';
        topTitle.style.color = '#ee5a5a';
        btnRef.forEach((element) => {
            element.style.backgroundColor = '#ecc040';
            element.style.color = '#ee5a5a';
            element.style.boxShadow = '5px 5px 0 0 #ee5a5a';
        });
        document.documentElement.style.setProperty('--hover-border-color', '#ee5a5a');
    }
});

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
    } else {
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

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        winChecker();
        changeTurn();
    });
});