const StyledBox = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 10%;
  box-shadow: 0px 0px 8px #888888;
  width: 5rem;
  height: 5rem;
  text-align: center;
  font-size: 5em;
  font-family: "Fredoka", sans-serif;
  font-weight: bold;
  line-height: 5rem;
  margin: 0.5rem;

  &:hover {
    box-shadow: 0px 0px 15px #888888;
  }

  &.x {
    color: rgb(255, 70, 37);
  }

  &.o {
    color: rgb(44, 135, 255);
  }
`;

const BoardMain = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 6rem);
  place-items: center;
  justify-content: center;
`;

const ResetNow = styled.div`
  width: 20%;
  border: none;
  border-radius: 0.5rem;
  background-color: rgb(0, 110, 255);
  color: white;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  margin: 2rem auto;
  display: block;
  display: flex; /* Đặt hiển thị thành flex */
  justify-content: center; /* Căn giữa theo chiều ngang */
  &:hover {
    background-color: rgb(0, 119, 255);
  }
`;

const ScoreboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 20rem;
  font-size: 1.5rem;
  background-color: white;
  margin: 3rem auto;
  box-shadow: 0px 0px 8px #888888;
  border-radius: 0.5rem;
  font-weight: bold;
`;

const Board = ({ board, onClick }) => {
  return (
    <BoardMain className="board">
      {board.map((value, idx) => {
        return (
          <Box value={value} onClick={() => value === null && onClick(idx)} />
        );
      })}
    </BoardMain>
  );
};
const Box = ({ value, onClick }) => {
  const style = value === "X" ? "box x" : "box o";

  return (
    <StyledBox className={style} onClick={onClick}>
      {value}
    </StyledBox>
  );
};
const ResetButton = ({ resetBoard }) => {
  return (
    <ResetNow className="reset-btn" onClick={resetBoard}>
      Reset
    </ResetNow>
  );
};
const ScoreBoard = ({ scores, xPlaying }) => {
  const { xScore, oScore } = scores;

  return (
    <ScoreboardContainer className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        X - {xScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        O - {oScore}
      </span>
    </ScoreboardContainer>
  );
};

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const [xPlaying, setXPlaying] = useState(true);
const [board, setBoard] = useState(Array(9).fill(null));
const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
const [gameOver, setGameOver] = useState(false);

const handleBoxClick = (boxIdx) => {
  // Step 1: Update the board
  const updatedBoard = board.map((value, idx) => {
    if (idx === boxIdx) {
      return xPlaying ? "X" : "O";
    } else {
      return value;
    }
  });

  setBoard(updatedBoard);

  const winner = checkWinner(updatedBoard);

  if (winner) {
    if (winner === "O") {
      let { oScore } = scores;
      oScore += 1;
      setScores({ ...scores, oScore });
    } else {
      let { xScore } = scores;
      xScore += 1;
      setScores({ ...scores, xScore });
    }
  }

  setXPlaying(!xPlaying);
};

const checkWinner = (board) => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x, y, z] = WIN_CONDITIONS[i];

    if (board[x] && board[x] === board[y] && board[y] === board[z]) {
      setGameOver(true);
      return board[x];
    }
  }
};

const resetBoard = () => {
  setGameOver(false);
  setBoard(Array(9).fill(null));
};

return (
  <div className="App">
    <ScoreBoard scores={scores} xPlaying={xPlaying} />
    <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
    <ResetButton resetBoard={resetBoard} />
  </div>
);
