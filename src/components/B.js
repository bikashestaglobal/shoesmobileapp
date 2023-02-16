import {font} from '../helpers/Constants';
import MyText from './MyText';

export default function B(props) {
  return <MyText style={{fontFamily: font.bold}}>{props.children}</MyText>;
}
