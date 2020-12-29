import './TypingField.css';

interface Props {
  onKeyPress: any,
}
export default function TypingField(props: Props) {
  return (
    <textarea onKeyPress={props.onKeyPress} className='InputField'></textarea>
  );
}