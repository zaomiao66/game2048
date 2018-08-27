import * as ActionTypes from '../const/ActionTypes';
import * as UtilityFunc from '../utility/utility';
// const initState = UtilityFunc.moveAndCombineLeft

export default function changeArrayReducer(
  state = {
    gameGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]],
    flag: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]],
    score: 0,
    bestScore: 0,
    isGameOver: false,
    isVictory: false,
    addScore: 0,
    addBestScore: 0,
    temp: 0
  }
  , action
) {
  switch (action.type) {
    case ActionTypes.RESTART_GAMES: { // 重置游戏
      const newState = { ...state };
      newState.gameGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
      newState.flag = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
      const temp1 = UtilityFunc.randomNum(newState.gameGrid, newState.flag);
      const gameGridAndFlag = UtilityFunc.randomNum(temp1.gameGrid, temp1.flag);
      newState.gameGrid = gameGridAndFlag.gameGrid;
      newState.flag = gameGridAndFlag.flag;
      newState.score = 0;
      newState.isGameOver = false;
      newState.isVictory = false;
      return newState;
    }
    case ActionTypes.MOVE_LEFT: { // 左
      const {
        gameGrid, score, bestScore, addBestScore, temp
      } = state;
      const afterMoveAndCombineLeft = UtilityFunc.moveAndCombineLeft(gameGrid, score, temp); // 向左移动并合并
      // 决定是否生成新块
      const finalGameGridAndFlag = UtilityFunc.isMoved(gameGrid, afterMoveAndCombineLeft.gameGrid, afterMoveAndCombineLeft.flag);
      const scores = UtilityFunc.scoreCalculation(bestScore, addBestScore, afterMoveAndCombineLeft.score); // 计算分数
      return {
        ...state,
        ...scores,
        ...afterMoveAndCombineLeft,
        ...finalGameGridAndFlag
      };
    }
    case ActionTypes.MOVE_RIGHT: { // 右
      const {
        gameGrid, score, bestScore, addBestScore, temp
      } = state;
      const afterMoveAndCombineRight = UtilityFunc.moveAndCombineRight(gameGrid, score, temp); // 向右移动并合并
      // 决定是否生成新块
      const finalGameGridFlag = UtilityFunc.isMoved(gameGrid, afterMoveAndCombineRight.gameGrid, afterMoveAndCombineRight.flag);
      const scores = UtilityFunc.scoreCalculation(bestScore, addBestScore, afterMoveAndCombineRight.score);
      return {
        ...state,
        ...scores,
        ...afterMoveAndCombineRight,
        ...finalGameGridFlag
      };
    }
    case ActionTypes.MOVE_UP: { // 上
      const {
        gameGrid, score, bestScore, addBestScore, temp
      } = state;
      const gameGridAfterTranspos = UtilityFunc.transposeMatrix(gameGrid); // 向上滑动先将矩阵转置
      const afterMoveAndCombineRight = UtilityFunc.moveAndCombineRight(gameGridAfterTranspos, score, temp); // 向右移动并合并
      const newArrAfterReverse = UtilityFunc.reverseMatrix(afterMoveAndCombineRight.gameGrid); // 处理完向右移动后将矩阵逆转置
      const newFlag = UtilityFunc.reverseMatrix(afterMoveAndCombineRight.flag);
      const finalGameGridAndFlag = UtilityFunc.isMoved(gameGrid, newArrAfterReverse, newFlag); // 决定是否生成新块
      const scores = UtilityFunc.scoreCalculation(bestScore, addBestScore, afterMoveAndCombineRight.score);
      return {
        ...state,
        ...scores,
        ...afterMoveAndCombineRight,
        ...finalGameGridAndFlag
      };
    }
    case ActionTypes.MOVE_DOWN: { // 下
      const {
        gameGrid, score, bestScore, addBestScore, temp
      } = state;
      const gameGridAfterTranspos = UtilityFunc.transposeMatrix(gameGrid); // 向下滑动先将矩阵转置
      const afterMoveAndCombineLeft = UtilityFunc.moveAndCombineLeft(gameGridAfterTranspos, score, temp); // 向左移动并合并
      const newArrAfterReverse = UtilityFunc.reverseMatrix(afterMoveAndCombineLeft.gameGrid); // 处理完向左移动后将矩阵逆转置
      const newFlag = UtilityFunc.reverseMatrix(afterMoveAndCombineLeft.flag);
      const finalGameGridAndFlag = UtilityFunc.isMoved(gameGrid, newArrAfterReverse, newFlag); // 决定是否生成新块
      const scores = UtilityFunc.scoreCalculation(bestScore, addBestScore, afterMoveAndCombineLeft.score);
      return {
        ...state,
        ...scores,
        ...afterMoveAndCombineLeft,
        ...finalGameGridAndFlag
      };
    }
    case ActionTypes.STAND_STILL: {
      return {
        ...state,
        addBestScore: 0,
        addScore: 0
      };
    }
    default:
      return state;
  }
}
