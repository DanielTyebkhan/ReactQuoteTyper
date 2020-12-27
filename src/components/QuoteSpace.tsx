import React from "react";

import { IQuote } from "../Interfaces";
import QuoteText from "./QuoteText";
import { Lang } from "../English";

import './QuoteSpace.css';

interface Props {
}

interface State {
  quote: IQuote;
}

export class QuoteSpace extends React.Component<Props, State> {
  state: Readonly<State> = {} as State;

  componentDidMount() {
    this.fetchQuote().then(current => this.setState({quote: current}));
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

  render() {
    return (
      <div className='QuoteSpace'>
        <h1>
          {Lang.QuoteSpeed}
        </h1>
        <h2>
          {Lang.BeginText}
        </h2>
        <QuoteText quote={this.state.quote}/>
      </div>
    );
  }
}
