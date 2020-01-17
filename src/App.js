import React from 'react';
import './App.css';

// Player

const PLAYER = {
	NONE: null,
	ONE: 1,
	TWO: 2
}
// Board

const initBoard = () => {
	let board = [];

	for (let i = 0; i < 42; i++) {
		board.push(PLAYER.NONE);
	}
	return board;
}

const getLowestAvailableCell = (board, column) => {
	for (let i = 35 + column; i >= 0; i -= 7) {
		if (board[i] === PLAYER.NONE) {
			console.log(i);
			return i;
		}
	}
	return -1;
}

const getPlayerNameString = (player) => {
	return player === PLAYER.ONE ? "playerOne" : player === PLAYER.TWO ? "playerTwo" : "none"
}

const toggleCurrentPlayer = (currPlayer) => {
	return currPlayer === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE;
}

const checkGameStatus = (board) => {

	// check for horizontal winner

	for (let r = 0; r < 6; r++) {
		for (let c = 0; c <= 4; c++) {
			let index = r * 7 + c;
			const slice = board.slice(index, index + 4);
			const winningResult = checkForWinningSlice(slice)

			if (winningResult !== false) return winningResult;
		}
	}

	// check for vertical winner

	// for (let r = 0; r < 6; r++) {
	// 	for (let c = 0; c <= 4; c++) {
	// 		let index = r * 7 + c;
	// 		const slice = board.slice(index, index + 4);
	// 		const winningResult = checkForWinningSlice(slice)

	// 		if (winningResult !== false) return winningResult;
	// 	}
	// }
	// check for diagonal winner

}

const checkForWinningSlice = (smallBoard) => {
	if (smallBoard.some(cell => cell === PLAYER.NONE)) {
		return false;
	}

	if (
		smallBoard[0] === smallBoard[1] &&
		smallBoard[1] === smallBoard[2] &&
		smallBoard[2] === smallBoard[3]
	) {
		console.log(smallBoard[1])
		return smallBoard[1];
	}

	return false
}

class ConnectFourApp extends React.Component {

	/** State */


	/** Methods */


	constructor() {
		super();

		this.state = {
			board: initBoard(),
			currentPlayer: PLAYER.ONE
		}
	}

	makeMove(column) {
		const { board, currentPlayer } = this.state;
		const index = getLowestAvailableCell(board, column);

		const newBoard = [...board];

		newBoard[index] = currentPlayer;

		const gameState = checkGameStatus(newBoard);

		this.setState({
			board: newBoard,
			currentPlayer: toggleCurrentPlayer(currentPlayer),
			gameState
		})
	}

	handleCellClick = (index) => () => {
		let column = index % 7;
		this.makeMove(column);
	}

	renderCells() {
		const { board } = this.state;
		return board.map((player, index) => this.renderCell(player, index))
	}

	renderCell(player, index) {
		return (
			<div
				className="board-cell"
				data-player={getPlayerNameString(player)}
				key={index}
				onClick={this.handleCellClick(index)}>
			</div>
		)
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">Connect 4</header>
				<div className="board">
					{this.renderCells()}
				</div>
			</div>
		)
	}
}
export default ConnectFourApp;
