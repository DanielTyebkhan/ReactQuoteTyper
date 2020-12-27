import { IQuote } from '../Interfaces';

interface Props {
  quote: IQuote | undefined;
}

export default function QuoteText(props: Props) {
  return (
    <div>
      <h3 className='Quote'>{props.quote?.content}</h3>
      <p> - {props.quote?.originator.name}</p>
    </div>
  );
};