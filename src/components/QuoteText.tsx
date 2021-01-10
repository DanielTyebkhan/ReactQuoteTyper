import './QuoteText.css';

interface Props {
  correct: string,
  incorrect: number,
  quote: string,
  author: string,
}

export default function QuoteText(props: Props) {
  const numCorr = props.correct.length;
  const endIn = numCorr + props.incorrect;
  return (
    <div className='quoteText'>
      <h3>
        <span id='correct'>{props.correct}</span>
        <span id='incorrect'>{props.quote.slice(numCorr, endIn)}</span>
        <span>{props.quote.slice(endIn)}</span>
      </h3>
      <p className='indented'>- {props.author}</p>
    </div>
  );
};