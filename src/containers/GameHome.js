import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IntroductionBoard from '../components/IntroductionBoard/IntroductionBoard';
import GameBoard from '../components/GameBoard/GameBoard';
import './GameHome.css';
import * as actionCreators from '../actions';
// import moveAudio from '../au/move.mp3';


class GameHome extends React.Component {
  state = {

  };


  render() {
    return (
      <div className="GameHome">
        <IntroductionBoard
          changeArrayReducer={this.props.changeArrayReducer}
          Actions={this.props.Actions}
        />
        <GameBoard
          Actions={this.props.Actions}
          gameGrid={this.props.changeArrayReducer.gameGrid}
          flag={this.props.changeArrayReducer.flag}
          temp={this.props.changeArrayReducer.temp}
        />
      </div>);
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHome);
