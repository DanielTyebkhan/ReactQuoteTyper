import React from "react";

import QuoteText from "./QuoteText";

import { IQuote } from "../Interfaces";
import { Lang } from "../English";

import './QuoteSpace.css';
import { Loading } from "./Loading";
import TypingField from "./TypingField";

interface Props {
}

interface State {
  quote: IQuote;
  remaining: string[],
  incorrect: number,
  time: number,
  seconds: number,
  mounted: boolean
}

const COUNTDOWN_TIME = 4;

export class QuoteSpace extends React.Component<Props, State> {
  state: Readonly<State> = {} as State;

  componentDidMount() {
    this.fetchQuote().then((current) => {
      this.setState({
        quote: current,
        remaining: Array.from(current.content).reverse(),
        incorrect: 0,
        seconds: COUNTDOWN_TIME,
        mounted: true
      })
    });
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
    let incorrect = this.state.incorrect;
    let remaining = this.state.remaining;
    if (incorrect === 0 && event.key === remaining[remaining.length - 1]) {
      remaining.pop();
    }
    else if (event.key === 'Backspace') {
      if (incorrect > 0) {
        --incorrect;
      }
      else {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    else if (event.key.length === 1) {
      ++incorrect;
    }
    let time = this.state.time;
    if (remaining.length === 0) {
      time = performance.now() - time;
      this.endGame(time/60000);
    }
    console.log(event.key, incorrect, remaining);
    let seconds = this.state.seconds;
    if (remaining.length === 0) {
      seconds = COUNTDOWN_TIME;
    }
    this.setState({
      incorrect: incorrect,
      remaining: remaining,
      time: time,
      seconds: seconds,
    });
  };

  endGame = (time: number): void => {
    alert('it took ' + time + ' minutes');
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
