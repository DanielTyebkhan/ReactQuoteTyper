import './TypingField.css';
import { Lang } from '../English'

interface TypingFieldProps {
  button: boolean,
  seconds: number,
  onKeyDown: any,
  clickHandler: (event: React.MouseEvent) => void,
}

export default function TypingField(props: TypingFieldProps) {
  if (props.button) {
    return ( 
      <div className='starter'> 
        <button className='startButton' onClick={props.clickHandler}>{Lang.Start}</button>
      </div>
    );
  }
  else if (props.seconds >= 0) {
    return <div className="starter"><p className='countdown'>{props.seconds}</p></div>;
  }
  else {
    return <textarea onKeyDown={props.onKeyDown} className='InputField'></textarea>;
  }
}
