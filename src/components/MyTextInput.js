import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import myStyle from '../helpers/Styles';
import {color, font} from '../helpers/Constants';

const MyTextInput = ({
  label,
  mode = 'flat',
  placeholder,
  error = false,
  onChangeText,
  onFocus,
  secureTextEntry = false,
  name,
  style = {},
}) => {
  return (
    <View style={myStyle.formGroup}>
      <TextInput
        label={label}
        error={error}
        mode={mode}
        placeholder={placeholder}
        style={myStyle.formControl}
        contentStyle={myStyle.formControlContent}
        outlineStyle={{
          borderColor: error ? color.red600 : color.black200,
          borderWidth: 0.8,
        }}
        onChangeText={text => {
          onChangeText(text, name);
        }}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default MyTextInput;
