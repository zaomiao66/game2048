export function randomNum(arr, _flag) {
  let amount = Math.ceil(Math.random() * 4);
  if (amount !== 4) {
    amount = 2;
  }
  const x = Math.floor(Math.random() * 4);
  const y = Math.floor(Math.random() * 4);
  const amountNum1 = 1;
  const gameGrid = [...arr];
  const flag = [..._flag];
  if (gameGrid[x][y] === 0) {
    gameGrid[x][y] = amount;
    flag[x][y] = amountNum1;
    console.log(`arr[${x}][${y}]`, amount);
  } else {
    randomNum(arr, flag);
  } return {
    gameGrid,
    flag
  };
}

export function flagMoveLeft(arr, flag) { // 记录哪个位置的数据为合并的数据 向左
  const newFlag = [...flag];
  for (let row = 0; row < newFlag.length; row++) {
    for (let col = 1; col < newFlag[row].length; col++) {
      if (arr[row][col] === arr[row][col - 1] && arr[row][col] !== 0) {
        newFlag[row][col - 1] = 2;
        if (col === 3 && newFlag[row][0] === 2) {
          newFlag[row][1] = 2;
          newFlag[row][2] = 0;
        }
        col++;
      }
    }
  } return newFlag;
}

export function flagMoveRight(arr, flag) { // 记录哪个位置的数据为合并的数据 向右
  const newFlag = [...flag];
  for (let row = 0; row < newFlag.length; row++) {
    for (let col = 2; col >= 0; col--) {
      if (arr[row][col] === arr[row][col + 1] && arr[row][col] !== 0) {
        newFlag[row][col + 1] = 2;
        if (col === 0 && newFlag[row][3] === 2) {
          newFlag[row][2] = 2;
          newFlag[row][1] = 0;
        }
        col--;
      }
    }
  } return newFlag;
}

export function moveLeft(arr) {
  const newGameGrid = [];
  for (let row = 0; row < arr.length; row++) { // 双for循环实现把数据堆在左边
    const newRow = [];
    for (let col = arr[row].length - 1; col >= 0; col--) {
      const amount = arr[row][col];
      if (amount === 0) {
        newRow.push(amount);
      } else {
        newRow.unshift(amount);
      }
    }
    newGameGrid.push(newRow);
  }
  return newGameGrid;
}


export function combineNumToLeft(arr, _score) {
  const newArr = [...arr];
  let score = _score;
  let isVictory = false;
  let addScore = 0;
  for (let row = 0; row < arr.length; row++) { // 双for循环实现把相同的部分加起来
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] > 0 && arr[row][col] === arr[row][col + 1]) {
        newArr[row][col] *= 2;
        newArr[row][col + 1] = 0;
        score += newArr[row][col];
        addScore += newArr[row][col];
        if (newArr[row][col] === 2048) {
          isVictory = true;
        }
      }
      // 不这样做的原因是如果出现2244这种情况这样做会推成444而不会推成48
      // else if (arr[row][col] === 0 && arr[row][col + 1] > 0) {
      //   newArr[row][col] = arr[row][col + 1];
      //   newArr[row][col + 1] = 0;
      // }
    }
  }
  return {
    newArr,
    score,
    isVictory,
    addScore
  };
}
export function moveRight(arr) { // 两个for循环把数据堆在右边
  const newGameGrid = [];
  for (let row = 0; row < arr.length; row++) {
    const newRow = [];
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === 0) {
        newRow.unshift(arr[row][col]);
      } else {
        newRow.push(arr[row][col]);
      }
    } newGameGrid.push(newRow);
  } return newGameGrid;
}

export function combineNumToRight(arr, _score) {
  const newArr = [...arr];
  let score = _score;
  let isVictory = false;
  let addScore = 0;
  for (let row = 0; row < arr.length; row++) { // 双for循环实现把相同的部分加起来(右边)
    for (let col = arr[row].length - 1; col >= 0; col--) {
      if (arr[row][col] > 0 && arr[row][col] === arr[row][col - 1]) {
        newArr[row][col] *= 2;
        newArr[row][col - 1] = 0;
        score += newArr[row][col];
        addScore += newArr[row][col];
        if (newArr[row][col] === 2048) {
          isVictory = true;
        }
      }
      // 不这样做的原因是如果出现2244这种情况这样做会推成444而不会推成48
      //  else if (arr[row][col] === 0 && arr[row][col - 1] > 0) {
      //   newArr[row][col] = arr[row][col - 1];
      //   newArr[row][col - 1] = 0;
      // }
    }
  }
  return {
    newArr,
    score,
    isVictory,
    addScore
  };
}

export function transposeMatrix(arr) { // 矩阵转置
  const newArr = [];
  for (let col = 0; col < arr[0].length; col++) {
    const newRow = [];
    for (let row = arr.length - 1; row >= 0; row--) {
      newRow.push(arr[row][col]);
    } newArr.push(newRow);
  } return newArr;
}

export function reverseMatrix(arr) { // 矩阵逆转置
  const newArr = [];
  for (let col = arr[0].length - 1; col >= 0; col--) {
    const newRow = [];
    for (let row = 0; row < arr.length; row++) {
      newRow.push(arr[row][col]);
    } newArr.push(newRow);
  } return newArr;
}

export function confirmIsGameover(arr) { // 确定游戏是否结束
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length - 1; col++) {
      if ((arr[row][col] === arr[row][col + 1]) || (arr[row][col] === 0)) {
        return false;
      }
    }
  }
  for (let col = 0; col < arr.length; col++) {
    for (let row = 0; row < arr[0].length - 1; row++) {
      if ((arr[row][col] === arr[row + 1][col]) || (arr[row][col] === 0)) {
        return false;
      }
    }
  }
  return true;
}

export function tempChange(t) { // 开关，为了保持动画能持续
  console.log(t);
  if (t === 0) {
    return 1;
  } return 0;
}

export function scoreCalculation(_bestScore, _addBestScore, _newScore) { // 计算分数
  let bestScore = _bestScore;
  let addBestScore = _addBestScore;
  if (_newScore > _bestScore) {
    bestScore = _newScore;
    addBestScore = _newScore - _bestScore;
  } else {
    addBestScore = 0;
  } return {
    bestScore,
    addBestScore
  };
}

// 把向左移动拿出来
export function moveAndCombineLeft(_gameGrid, _score, _temp) {
  const temp = tempChange(_temp);
  const isGameOver = confirmIsGameover(_gameGrid); // 判断游戏结束
  const _flag = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];
  const newGameGrid = moveLeft(_gameGrid);
  const flag = flagMoveLeft(newGameGrid, _flag);
  const newGameGrid2 = combineNumToLeft(newGameGrid, _score);
  const {
    newArr, score, isVictory, addScore
  } = newGameGrid2;
  const gameGrid = moveLeft(newArr); // 解决上述2244的问题不在数字合并中移动而在合并之后选择再推一次
  return {
    flag,
    score,
    gameGrid,
    isVictory,
    addScore,
    temp,
    isGameOver
  };
}

export function moveAndCombineRight(_gameGrid, _score, _temp) {
  const temp = tempChange(_temp);
  const isGameOver = confirmIsGameover(_gameGrid);
  const _flag = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];
  const newGameGrid = moveRight(_gameGrid);
  const flag = flagMoveRight(newGameGrid, _flag);
  const newGameGrid2 = combineNumToRight(newGameGrid, _score);
  const {
    newArr, score, isVictory, addScore
  } = newGameGrid2;
  const gameGrid = moveRight(newArr); // 解决上述2244的问题不在数字合并中移动而在合并之后选择再推一次
  return {
    flag,
    score,
    gameGrid,
    isVictory,
    addScore,
    temp,
    isGameOver
  };
}

export function isMoved(arrPrev, arrNext, flagNext) {
  if (JSON.stringify(arrPrev) !== JSON.stringify(arrNext)) { // 判断是否确实移动过
    return randomNum(arrNext, flagNext);
  } return {
    gameGrid: arrNext,
    flag: flagNext
  };
}
