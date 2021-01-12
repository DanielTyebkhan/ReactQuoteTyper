import './TypingField.css';
import { Lang } from '../English'
import { useEffect, useRef } from 'react';

interface TypingFieldProps {
  button: boolean,
  loading: boolean,
  seconds: number,
  onKeyDown: (event: React.KeyboardEvent) => void,
  clickHandler: (event: React.MouseEvent) => void,
}

export default function TypingField(props: TypingFieldProps) {
  if (props.button) {
    return ( 
      <div className='starter'> 
        <button disabled={props.loading} className='startButton' onClick={props.clickHandler}>{Lang.Start}</button>
      </div>
    );
  }
  else if (props.seconds >= 0) {
    return (
      <div className="starter">
        <p className='countdown'>{props.seconds}</p>
      </div>
    );
  }
  else {
    return <InputBox onKeyDown={props.onKeyDown} />
  }
}

interface InputBoxProps {
  onKeyDown: (event: React.KeyboardEvent) => void
}

function InputBox(props: InputBoxProps) {
  const field = useRef<HTMLTextAreaElement>(null);
  useEffect(() => field.current?.focus());
  const fixCursor = () => {
    console.log('clicked');
  };
  return <textarea onClick={fixCursor} ref={field} onKeyDown={props.onKeyDown} className='InputField'></textarea>;
}