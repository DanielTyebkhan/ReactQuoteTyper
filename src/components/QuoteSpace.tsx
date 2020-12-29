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
  incorrect: string[],
}

export class QuoteSpace extends React.Component<Props, State> {
  state: Readonly<State> = {} as State;

  componentDidMount() {
    this.fetchQuote().then((current) => {
      this.setState({
        quote: current,
        remaining: Array.from(current.content) 
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
    console.log(quote);
    return quote;
  };

  handleInput = (event: React.KeyboardEvent) => {
    console.log(event.key);
  };

  handleStart = (event: React.MouseEvent): void => {
    console.log('starting');
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
        <TypingField clickHandler={this.handleStart} onKeyPress={this.handleInput} button={true} seconds={5}/>
      </div>
    );
  }
}
