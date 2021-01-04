import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off', // 'off','work', 'rest'
    time: 0,
    timer: null,

  }
  render() {
    const formatTime = time => {
      const minutes = Math.floor(time/60)
      const formatedMinutes = minutes <=9 ? '0'+minutes : minutes
      const seconds = time - (minutes * 60);
      const formatedSeconds = seconds <=9 ? '0'+seconds : seconds
      return formatedMinutes + ':' + formatedSeconds;
    };

    const step = () => {
      this.setState({
        time: this.state.time - 1,
      })
      if (this.state.time === 0){
        if (this.state.status === "work"){
          this.setState({
            status: 'rest',
            time: 20,
            play: playBell(),
          }) 
        } else if (this.state.status === 'rest'){
          this.setState({
            status: 'work',
            time: 1200,
            play: playBell(),
          }) 
        }
      }
    };

    const startTimer = () => {
      this.setState({
        status: 'work',
        timer: setInterval(()=>{step()}, 1000),
        time: 1200,
      });      
    };

    const stopTimer = () => {
      this.setState({
        status: 'off',
        timer: null,
        time: 0,
        play: playBell(),
      });
      clearInterval(this.state.timer);
    }

    const close = () => {
      window.close();
    }

    const playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' ? (
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>          
        ) : ''}
        {this.state.status === 'off' ? (
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        ) : ''}
        {this.state.status === 'work' ? (
          <img src="./images/work.png" />
        ) : ''}
        {this.state.status === 'rest' ? (
          <img src="./images/rest.png" />
        ) : ''}
        {this.state.status !== 'off' ? (
          <div className="timer">
            {formatTime(this.state.time)}
          </div>
        ) : ''}
        {this.state.status === 'off' ? (
          <button className="btn" onClick={()=>{
            startTimer();
          }}>Start</button>
        ) : ''}
        {this.state.status !== 'off' ? (
          <button className="btn" onClick={()=>{
            stopTimer();
          }}>Stop</button>
        ) : ''}
        <button className="btn btn-close" onClick={()=>{
          close();
        }}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
