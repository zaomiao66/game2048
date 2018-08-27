import React, { Component } from 'react';
import './IntroductionBoard.css';

export default class IntroductionBoard extends Component {
    addScoreFun = (addScore, temp) => {
      if (addScore !== 0) {
        return (<div className={`scoreAdd${temp}`}>{` +${addScore}`}</div>);
      } return null;
    };
    addBestScoreFun = (addScore, temp) => {
      if (addScore !== 0) {
        return (<div className={`BestScoreAdd${temp}`}>{` +${addScore}`}</div>);
      } return null;
    };
    render() {
      const { Actions, changeArrayReducer } = this.props;
      if (changeArrayReducer.isVictory) {
        window.alert('好厉害呀，你完成了2048');
      }

      if (changeArrayReducer.isGameOver) {
        window.alert('你输啦，继续努力哦');
      }
      return (
        <div className="IntroductionBoard">
          <div className="IntroductionBoardTop" >
            <h1 className="title"> 2048 </h1>
            <div className="score_container_1">
              <div><div className="score_1">当前得分</div>
                <span className="score_1">最多得分</span>
              </div>
              <div className="scoreAddContainer">
                {this.addScoreFun(changeArrayReducer.addScore, changeArrayReducer.temp)}
                {this.addBestScoreFun(changeArrayReducer.addBestScore, changeArrayReducer.temp)}
              </div>
              <div><span className="scoreNow">{changeArrayReducer.score}</span>
                <span className="scoreNow">{changeArrayReducer.bestScore}</span>
              </div>
            </div>
          </div>
          <div className="IntroductionBoardBottom" >
            <span className="gameIntroduction"> Keypressing W A S D on PC </span>
            <span className="restart" onClick={Actions.restartGames} > restart </span>
          </div>
        </div>
      );
    }
}
