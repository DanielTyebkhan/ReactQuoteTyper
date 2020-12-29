import { Lang } from '../English'
import './Starter.css'

interface Props {
  seconds: number,
  button: boolean,
  clickHandler: (event: React.MouseEvent) => void,
}

export default function Starter(props: Props) {
  return(
    <div className='starter'>{props.button ? <button className='startButton' onClick={props.clickHandler}>{Lang.Start}</button> : props.seconds}</div>
  )
}