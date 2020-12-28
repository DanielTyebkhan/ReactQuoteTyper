import { IQuote } from '../Interfaces';
import './QuoteText.css';

interface Props {
  quote: IQuote | undefined;
}

export default function QuoteText(props: Props) {
  return (
    <div className='quoteText'>
      <h3>{props.quote?.content}</h3>
      <p className='indented'> {'- ' + props.quote?.originator.name}</p>
    </div>
  );
};