export const getWinner = (cells) => {
    //row check
    if(cells[0] !== "" && cells[0] === cells[1] && cells[0] === cells[2])
        return cells[0];
    if(cells[3] !== "" && cells[3] === cells[4] && cells[3] === cells[5])
        return cells[3];
    if(cells[6] !== "" && cells[6] === cells[7] && cells[6] === cells[8])
        return cells[6];

    //column check
    if(cells[0] !== "" && cells[0] === cells[3] && cells[0] === cells[6])
        return cells[0];
    if(cells[1] !== "" && cells[1] === cells[4] && cells[1] === cells[7])
        return cells[1];
    if(cells[2] !== "" && cells[2] === cells[5] && cells[2] === cells[8])
        return cells[2];

    //diagonal check
    if(cells[0] !== "" && cells[0] === cells[4] && cells[0] === cells[8])
        return cells[0];
    if(cells[2] !== "" && cells[2] === cells[4] && cells[2] === cells[6])
        return cells[2];

    return null;
};

const inf = 1e9;
export const getBestMove = (cells, player, move) => {
    //bestMove[0] => cell index for best move
    //bestMove[1] => utility for the player if he plays on bestMove[0]
    let bestMove = [-1, -inf];
    let curMove = [-1, -inf];
    let winner = null;

    if(move >= 8){
        for(let i = 0;i < 9;i++){
            if(cells[i] === ''){
                cells[i] = player;
                bestMove[0] = i;
                winner = getWinner(cells);
                if(winner === player)
                    bestMove[1] = 1;
                else if(winner === null)
                    bestMove[1] = 0;
                else
                    bestMove[1] = -1 ;
                cells[i] = '';
                break;
            }
        }
    }
    else{
        for(let i=0;i<9;i++){
            if(cells[i] === ''){
                cells[i] = player;
                curMove[0] = i;
                winner = getWinner(cells);
                if(winner !== null)
                    curMove[1] = (winner === player) ? 1 : -1;
                else
                    curMove[1] = -(getBestMove(cells, (player === 'X' ? 'O':'X'), move + 1)[1]);

                if(curMove[1] > bestMove[1])
                    bestMove = [...curMove];
                cells[i] = '';//backtracking
            }
        }
    }
    return bestMove;
};