// Редьюсер для управления состоянием игры
function gameReducer(state, action) {
    switch (action.type) {
      case 'ADD_PLAYER':
        const newTotalPool = state.totalPool + parseFloat(action.payload.wager);
        return {
          ...state,
          players: [...state.players, {...action.payload, id: state.players.length + 1}],
          totalPool: newTotalPool
        };
      case 'SET_HIGHLIGHTED_ID':
        return {
          ...state,
          highlightedId: action.payload
        };
      case 'REMOVE_PLAYER':
        return {
          ...state,
          players: state.players.filter(player => player.id !== action.payload),
          totalPool: state.players.filter(player => player.id !== action.payload)
                                   .reduce((acc, player) => acc + player.wager, 0)
        };
      default:
        return state;
    }
  }

export default gameReducer