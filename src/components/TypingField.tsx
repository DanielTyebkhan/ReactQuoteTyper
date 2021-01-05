import './Starter';
import Starter from './Starter';

import './TypingField.css';

interface Props {
  button: boolean,
  seconds: number,
  onKeyDown: any,
  clickHandler: (event: React.MouseEvent) => void,
}

export default function TypingField(props: Props) {
  if (props.button) {
    return <Starter clickHandler={props.clickHandler} button={props.button} seconds={props.seconds} />;
  }
  else if (props.seconds >= 0) {
    return <div>{props.seconds}</div>;
  }
  else {
    return <textarea onKeyDown={props.onKeyDown} className='InputField'></textarea>;
  }
}