let btnRef = document.querySelectorAll(".button-option");
        let popupRef = document.querySelector(".popup");
        let newgameBtn = document.getElementById("new-game");
        let restartBtn = document.getElementById("restart");
        let msgRef = document.getElementById("message");
        let xImageURL = "https://via.placeholder.com/80x80?text=X";
        let oImageURL = "https://via.placeholder.com/80x80?text=O"; 
        let winningPattern = [
          [0, 1, 2],
          [0, 3, 6],
          [2, 5, 8],
          [6, 7, 8],
          [3, 4, 5],
          [1, 4, 7],
          [0, 4, 8],
          [2, 4, 6],
        ];
        let xTurn = true;
        let count = 0;
        const disableButtons = () => {
          btnRef.forEach((element) => (element.disabled = true));
          popupRef.classList.remove("hide");
        };
      
        const enableButtons = () => {
          btnRef.forEach((element) => {
            element.innerHTML = "";
            element.disabled = false;
          });
          popupRef.classList.add("hide");
        };
        const winFunction = (letter) => {
          disableButtons();
          if (letter == "X") {
            msgRef.innerHTML = "Player 2 you dropped your <br>&#128081"
          } else {
            msgRef.innerHTML = "Player 1 you dropped your <br>&#128081";
          }
        };
        const drawFunction = () => {
          disableButtons();
          msgRef.innerHTML = "It's a tie <br>&#129318;";
        };
        const newGame = () => {
          count = 0;
          enableButtons();
        };
        const restartGame = () => {
          count = 0;
          enableButtons();
        };
        const winChecker = () => {
          for (let i of winningPattern) {
            let [element1, element2, element3] = [
              btnRef[i[0]].innerHTML,
              btnRef[i[1]].innerHTML,
              btnRef[i[2]].innerHTML,
            ];
            if (element1 != "" && (element2 != "") & (element3 != "")) {
              if (element1 == element2 && element2 == element3) {
                winFunction(element1);
              }
            }
          }
        };
        const handleButtonClick = (index) => {
          if (!btnRef[index].innerHTML) {
            if (xTurn) {
              xTurn = false;
              btnRef[index].innerHTML = `<img src="x.png" alt="X">`;
              btnRef[index].disabled = true;
            } else {
              xTurn = true;
              btnRef[index].innerHTML = `<img src="o.png" alt="O">`;
              btnRef[index].disabled = true;
            }
            count += 1;
            if (count == 9) {
              drawFunction();
            }
            winChecker();
          }
        };