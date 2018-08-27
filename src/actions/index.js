import * as ActionTypes from '../const/ActionTypes';

export function add() {
  return {
    type: ActionTypes.ADD
  };
}

export function remove() {
  return {
    type: ActionTypes.REMOVE
  };
}

export function restartGames() {
  return {
    type: ActionTypes.RESTART_GAMES
  };
}

export function moveLeft() { // 向上滑动或按w键应该发起这个action
  return {
    type: ActionTypes.MOVE_LEFT
  };
}

export function moveRight() { // 向右滑动或按w键应该发起这个action
  return {
    type: ActionTypes.MOVE_RIGHT
  };
}

export function moveUp() { // 向上滑动或按w键应该发起这个action
  return {
    type: ActionTypes.MOVE_UP
  };
}

export function moveDown() { // 向下滑动或按w键应该发起这个action
  return {
    type: ActionTypes.MOVE_DOWN
  };
}

export function standStill() { // 保持不动
  return {
    type: ActionTypes.STAND_STILL
  };
}
