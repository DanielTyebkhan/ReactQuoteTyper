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
  quote: IQuote | undefined,
  completed: string[],
  remaining: string,
  incorrect: string[],
  time: number,
  seconds: number,
  mounted: boolean,
  mistakes: Set<number>
}

const COUNTDOWN_TIME = 4;
const API_TIMEOUT_WAIT = 7000;

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
    let quote: IQuote | undefined = undefined;
    while(!quote) {
      quote = await fetch(url, requestOptions).then(async (response) => {
        let fetched = await response.json().then(data => data as IQuote);
        if (!response.ok || !this.isTypeable(fetched.content)) {
          console.log('invalid quote received: retrying');
          await new Promise(r => setTimeout(r, API_TIMEOUT_WAIT));
          return undefined;
        }
        return fetched;
      });
    }
    return quote;
  };

  isTypeable = (quote: string): boolean => {
    for (let i = 0; i < quote.length; ++i) {
      let code = quote.charCodeAt(i);
      if (code < 32 || code > 126) {
        return false;
      }
    }
    return true;
  }; 

  handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    let status = event.currentTarget.value;
    let quote = this.state.quote?.content as string;
    let mistakes = this.state.mistakes;
    let completed = [];
    let incorrect = [];
    let remaining = '';
    let correct = true;
    for (let i = 0; i < status.length; ++i) {
      if (status[i] === quote[i] && correct) {
        completed.push(status[i])
      }
      else {
        correct = false;
        mistakes.add(i);
        incorrect.push(status[i]);
      }
    }
    remaining = quote.slice(status.length);
    if (remaining.length === 0 && incorrect.length === 0) {
      let time = performance.now() - this.state.time;
      let minutes = time/60000;
      let words = quote.split(' ').length + 1;
      let chars = quote.length;
      let wpm = Math.round(words / minutes);
      console.log(mistakes, mistakes.size);
      let accuracy = Math.round((chars - mistakes.size)/chars * 100);
      this.endGame(wpm, accuracy);
    }
    this.setState({
      mistakes: mistakes,
      completed: completed,
      incorrect: incorrect,
      remaining: remaining,
    });
  };

  setupGame = () => {
    this.fetchQuote().then((current) => {
      this.setState({
        quote: current,
        remaining: '',
        incorrect: [],
        mistakes: new Set<number>(),
        seconds: COUNTDOWN_TIME,
        mounted: true,
        completed: [],
      })
    });
  };

  endGame = (wpm: number, accuracy: number): void => {
    this.setState({quote: undefined, seconds: COUNTDOWN_TIME});
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
        {this.state.quote ? 
          <QuoteText correct={this.state.completed.join('')} incorrect={this.state.incorrect.length} quote={this.state.quote.content} author={this.state.quote.originator.name}/> 
          : <Loading />
        }
        <TypingField loading={this.state.quote === undefined} clickHandler={this.handleStart} inputMethod={this.handleInput} button={this.state.seconds === COUNTDOWN_TIME} seconds={this.state.seconds}/>
      </div>
    );
  }
}
