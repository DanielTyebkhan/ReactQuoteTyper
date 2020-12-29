import './Starter';
import Starter from './Starter';

import './TypingField.css';

interface Props {
  button: boolean,
  seconds: number,
  onKeyPress: any,
  clickHandler: (event: React.MouseEvent) => void,
}

export default function TypingField(props: Props) {
  return props.button ? <Starter clickHandler={props.clickHandler} button={props.button} seconds={props.seconds} /> : 
         <textarea onKeyPress={props.onKeyPress} className='InputField'></textarea>
}