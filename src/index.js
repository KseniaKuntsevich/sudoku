module.exports = function solveSudoku(matrix) {
  // your solution

	const MATRIX_COPY = matrix.map(r => [...r]);
	let emptyCellCoords = getEmptyCellCoords(MATRIX_COPY);

	if(!emptyCellCoords) return matrix;

	let row = emptyCellCoords.row,
		cell = emptyCellCoords.cell,
		solved = null;

	for(let i = 1; i <= 9 && !solved; i ++) {
		let isValid = checkValid(i, row, cell, MATRIX_COPY)

		if(isValid){ 
	    	MATRIX_COPY[row][cell] = i;
	    	solved = solveSudoku(MATRIX_COPY);
		}
		
  	}

  return solved;

}


function getEmptyCellCoords(board) {
	let row = -1,
		cell = -1;

	for(let i = 0; i < board.length && row < 0 ; i++){
		cell = board[i].indexOf(0);
		if(cell > -1) row = i;
	}
	return row > -1 ? {row: row, cell: cell} : null;

}


function checkValid(i , row, cell, board){
    let isVerticalCorrect = checkVertical(i, cell, board);
    let isHorizontCorrect = checkHorizontal(i, row, board);
    let isBoxCorrect = checkBox(i, row, cell, board);

    return (isVerticalCorrect && isHorizontCorrect) && isBoxCorrect;

}

function checkBox(i, row, cell, board) {
	let top = row < 3 ? 0 : ( row < 6 ? 3 : 6 ),
    	left =  cell < 3 ? 0 : ( cell < 6 ? 3 : 6 ),
    	hasI = false;

	for(let row = top ; row <= top + 2 && !hasI ; row++ ) {
	    hasI = board[row].some((cell, ind) => {
	        if(ind > left + 2 || ind < left) return false;
	        return cell === i;
	    })
	}

	return !hasI

}

function checkVertical(i, cell, board){    
	return !(board.some(row => row[cell] === i));

}

function checkHorizontal(i, row, board){
	return !(board[row].some(cell => cell === i));
} 