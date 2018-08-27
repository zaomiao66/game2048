import React, { Component } from 'react';
import './GameBoard.css';
import moveAudio from '../../au/move.mp3';
import combineAudio from '../../au/popup.mp3';

// 1.给一个二维数组能在GameBoard中显示出来 //完成
// 2.开始时随机生成随机数并跟新到数组中 //完成
// 3.将键盘上的每一个操作分解为一个对应的action //完成
// 4.完成一个action之后相应的逻辑 //完成
// 5.一个reducer处理对应的操作更新数组 // 完成
// 6.完成所有action对应的动作 // 完成
// 7.完成胜利和失败条件 // 完成
// 8.完成对应的动画效果 // 完成
// 9.完成在手机端的实现 // 完成

const Audio1 = new Audio(moveAudio);
const Audio2 = new Audio(combineAudio);
export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startY: null
    };
  }
  componentDidMount() {
    const { Actions } = this.props;
    // const Audio1 = new Audio(moveAudio);
    const keydown = value => { // 监听键盘
      console.log('value', value.key);
      // console.log(Actions);
      if (value.key === 'a' || value.key === 'A') {
        Actions.moveLeft();
        // Audio1.play();
      } else if (value.key === 'd' || value.key === 'D') {
        Actions.moveRight();
      } else if (value.key === 'w' || value.key === 'W') {
        Actions.moveUp();
      } else if (value.key === 's' || value.key === 'S') {
        Actions.moveDown();
      }
    };
    window.addEventListener('keydown', keydown);
    // console.log(this.state);
  }
  // 获得角度
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }
  moveStart = e => { // 存放移动开始的位置
    console.log(e.touches);
    this.setState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    });
    console.log(this.state.startX);
    console.log(this.state.startY);
  }
  move = e => {
    e.preventDefault();
  }
  moveEnd = e => { // 移动结束后发起相应的action
    const { Actions } = this.props;
    console.log(e.changedTouches);
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const angX = endX - this.state.startX;
    const angY = endY - this.state.startY;
    if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
      return null;
    }
    const angle = this.getAngle(angX, angY);
    if (angle >= -135 && angle <= -45) {
      Actions.moveUp();
    } else if (angle > 45 && angle < 135) {
      Actions.moveDown();
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      Actions.moveLeft();
    } else if (angle >= -45 && angle <= 45) {
      Actions.moveRight();
    }
    return null;
  }
  // 移动音效
  displayGameGrid(arr) {
    let isCombine = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (arr[row][col] === 2) {
          isCombine = 1;
        }
      }
    } if (isCombine === 0) {
      Audio1.play();
    } else {
      Audio2.play();
    }
  }
  // 游戏页面
  showGameBoard = (gameGrid, flag, temp) => gameGrid.map((t, lineIndex) => t.map((amount, index) => {
    if (flag[lineIndex][index] === 0) {
      return <div key={`${lineIndex}-${index}`} className={`num${amount}`} >{ amount === 0 ? null : amount }</div>;
    } else if (flag[lineIndex][index] === 2) {
      return <div key={`${lineIndex}-${index}`} className={`num${amount}Combine${temp}`} >{ amount === 0 ? null : amount }</div>;
    }
    return <div key={`${lineIndex}-${index}`} className={`num${amount}Appear${temp}`} >{ amount === 0 ? null : amount }</div>;
  }));


  render() {
    //   const { textInit } = this.state;
    const { gameGrid, flag, temp } = this.props;
    // console.log('temp', temp)
    return (
      <div className="GameBoard" onTouchStart={this.moveStart} onTouchMove={this.move} onTouchEnd={this.moveEnd}>
        {this.displayGameGrid(flag)}
        {this.showGameBoard(gameGrid, flag, temp)}
      </div>
    );
  }
}
