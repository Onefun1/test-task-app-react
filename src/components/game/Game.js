import React from "react";

import "./Game.css";

class Game extends React.Component {
  state = {
    matrix: [],
    isStarted: false
  };

  getRandomNumber = size => {
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
      let matrixBlock = [];
      for (let i = 0; i < size; i++) {
        let randomNumber = Math.floor(Math.random() * 100 + 1);
        if (randomNumber > 0 && randomNumber <= 25) {
          matrixBlock.push(1);
        } else if (randomNumber >= 26 && randomNumber <= 50) {
          matrixBlock.push(2);
        } else if (randomNumber >= 51 && randomNumber <= 75) {
          matrixBlock.push(3);
        } else {
          matrixBlock.push(4);
        }
      }
      newMatrix.push(matrixBlock);
    }

    return newMatrix;
  };

  startGame = gameSize => {
    this.setState({
      ...this.state,
      matrix: this.getRandomNumber(gameSize),
      isStarted: !this.state.isStarted,
      size: gameSize
    });
  };

  handlerRefresh = () => {
    this.setState({
      ...this.state,
      matrix: this.getRandomNumber(this.state.size)
    });
  };

  handlerBack = () => {
    this.setState({ ...this.state, isStarted: !this.state.isStarted });
  };

  clearCell = (i, j, value) => {
    if (
      !this.state.matrix[i] ||
      !this.state.matrix[i][j] ||
      this.state.matrix[i][j] !== value
    ) {
      return;
    }

    let matrix = [...this.state.matrix];

    matrix[i][j] = null;

    this.setState({
      matrix
    });

    this.clearCell(i + 1, j, value);
    this.clearCell(i - 1, j, value);
    this.clearCell(i, j + 1, value);
    this.clearCell(i, j - 1, value);
  };

  render() {
    const { matrix, isStarted } = this.state;
    return (
      <>
        {isStarted ? (
          <div className="App">
            {matrix.map((row, i) => (
              <div className="table" index={i} key={i}>
                {row.map((col, j) => {
                  switch (col) {
                    case 1:
                      return (
                        <span
                          onClick={() => this.clearCell(i, j, col)}
                          key={j}
                          className="itemContainer diamond"
                          style={{ color: "red" }}
                        >
                          &#9826;
                        </span>
                      );
                    case 2:
                      return (
                        <span
                          onClick={() => this.clearCell(i, j, col)}
                          key={j}
                          className="itemContainer heart"
                          style={{ color: "red" }}
                        >
                          &#9829;
                        </span>
                      );
                    case 3:
                      return (
                        <span
                          onClick={() => this.clearCell(i, j, col)}
                          key={j}
                          className="itemContainer spade"
                        >
                          &#9828;
                        </span>
                      );
                    case 4:
                      return (
                        <span
                          onClick={() => this.clearCell(i, j, col)}
                          key={j}
                          className="itemContainer club"
                        >
                          &#9827;
                        </span>
                      );
                    default:
                      return (
                        <span key={j} className="itemContainer club">
                          {""}
                        </span>
                      );
                  }
                })}
              </div>
            ))}
            <button onClick={this.handlerRefresh}>Reset</button>
            <button onClick={this.handlerBack}>Back</button>
          </div>
        ) : (
          <>
            <h3>Choose your field, please</h3>
            <button onClick={() => this.startGame(3)}>3x3</button>
            <button onClick={() => this.startGame(6)}>6x6</button>
            <button onClick={() => this.startGame(9)}>9x9</button>
          </>
        )}
      </>
    );
  }
}

export default Game;
