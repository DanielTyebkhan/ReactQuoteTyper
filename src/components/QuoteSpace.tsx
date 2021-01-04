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
  started: boolean
}

export class QuoteSpace extends React.Component<Props, State> {
  state: Readonly<State> = {} as State;

  componentDidMount() {
    this.fetchQuote().then((current) => {
      this.setState({
        quote: current,
        remaining: Array.from(current.content),
        incorrect: 0,
        started: false
      })
    });
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
    this.setState({remaining: quote.content.split('').reverse()})
    console.log(quote);
    return quote;
  };

  handleInput = (event: React.KeyboardEvent) => {
    let incorrect = this.state.incorrect;
    let remaining = this.state.remaining;
    if (incorrect === 0 && event.key === remaining[remaining.length - 1]) {
      remaining.pop();
    }
    else if (event.key === 'Backspace' && incorrect > 0) {
      --incorrect;
    }
    else if (event.key.length === 1) {
      ++incorrect;
    }
    console.log(event.key, incorrect, remaining);
    this.setState({
      incorrect: incorrect,
      remaining: remaining
    });
  };

  handleStart = (event: React.MouseEvent): void => {
    this.setState({started: true});
  }

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
        <TypingField clickHandler={this.handleStart} onKeyDown={this.handleInput} button={!this.state.started} seconds={5}/>
      </div>
    );
  }
}
