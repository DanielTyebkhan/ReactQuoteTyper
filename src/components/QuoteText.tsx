import { IQuote } from '../Interfaces';

interface Props {
  quote: IQuote | undefined;
}

export default function QuoteText(props: Props) {
  return (
    <h3 className='Quote'>{props.quote?.content}</h3>
  );
};