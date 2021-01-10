import React from "react";

import QuoteText from "./QuoteText";

import { IQuote } from "../Interfaces";
import { Lang } from "../English";

import './QuoteSpace.css';
import { Loading } from "./Loading";
import TypingField from "./TypingField";
import Queue from "../DataStructures/Queue";

interface Props {
}

interface State {
  quote: IQuote,
  words: number,
  completed: string[],
  remaining: Queue<string>,
  incorrect: string[],
  time: number,
  seconds: number,
  mounted: boolean,
  mistakes: number
}

const COUNTDOWN_TIME = 4;

export class QuoteSpace extends React.Component<Props, State> {
  state: Readonly<State> = {} as State;

  componentDidMount() {
    this.setupGame();
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  fetchQuote = async (): Promise<IQuote> => {
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
    const requestOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com',
        'X-RapidAPI-Key': '82e49981edmsh51f070fdf1cb9dap1930d5jsn458ee671c233'
      }
    };
    let quote: IQuote = await (await fetch(url, requestOptions)).json();
    return quote;
  };

  handleInput = (event: React.KeyboardEvent) => {
    let key = event.key;
    let incorrect = this.state.incorrect.slice();
    let remaining = this.state.remaining.clone();
    let mistakes = this.state.mistakes;
    let completed = this.state.completed;
    if (incorrect.length === 0 && event.key === remaining.peek()) {
      completed.push(remaining.dequeue() as string);
    }
    else if (key === 'Backspace') {
      if (incorrect.length > 0) {
        incorrect.pop();
      }
      else {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    else if (key.length === 1) {
      incorrect.push(key);
      ++mistakes;
    }
    let time = this.state.time;
    if (remaining.getLength() === 0) {
      time = performance.now() - time;
      let minutes = time/60000;
      let wpm = Math.round(this.state.words / minutes);
      let chars = this.state.quote.content.length;
      let accuracy = Math.round((chars - mistakes) / chars * 100);
      this.endGame(wpm, accuracy);
    }
    console.log(key, completed, incorrect, remaining.toString());
    let seconds = this.state.seconds;
    if (remaining.getLength() === 0) {
      seconds = COUNTDOWN_TIME;
    }
    this.setState({
      incorrect: incorrect,
      remaining: remaining,
      time: time,
      seconds: seconds,
      mistakes: mistakes,
      completed: completed,
    });
  };

  setupGame = () => {
    this.fetchQuote().then((current) => {
      this.setState({
        quote: current,
        words: current.content.split(' ').length + 1,
        remaining: new Queue<string>(Array.from(current.content)),
        incorrect: [],
        mistakes: 0,
        seconds: COUNTDOWN_TIME,
        mounted: true,
        completed: [],
      })
    });
  };

  endGame = (wpm: number, accuracy: number): void => {
    alert(`You typed ${wpm} wpm with an accuracy of ${accuracy}%.`);
    this.setupGame();
  };

  handleStart = (event: React.MouseEvent): void => {
    this.runCountdown();
    this.setState({
      time: performance.now(),
    });
  };

  runCountdown = (): void => {
    if (this.state.mounted) {
      let seconds = this.state.seconds;
      console.log(seconds);
      if (seconds >= 0) {
        this.setState({seconds: seconds - 1});
        window.setTimeout(() => this.runCountdown(), 1000);
      }
    }
  };

  render() {
    return (
      <div className='QuoteSpace'>
        <h1>
          {Lang.QuoteSpeed}
        </h1>
        <h2>
          {Lang.BeginText}
        </h2>
        {this.state.quote ? <QuoteText quote={this.state.quote}/> : <Loading />}
        <TypingField clickHandler={this.handleStart} onKeyDown={this.handleInput} button={this.state.seconds === COUNTDOWN_TIME} seconds={this.state.seconds}/>
      </div>
    );
  }
}
