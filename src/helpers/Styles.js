import {StyleSheet} from 'react-native';
import {color, font} from './Constants';

export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 19,
    fontFamily: font.medium,
  },
  heading: {
    fontSize: 19,
    fontFamily: font.medium,
    letterSpacing: 3,
  },

  subHeading: {
    fontSize: 17,
    fontFamily: font.medium,
    letterSpacing: 1,
  },
  commonHeading: {
    fontSize: 15,
    fontFamily: font.medium,
  },
  text: {
    fontSize: 15,
    fontFamily: font.regular,
    color: color.black500,
  },
  textMuted: {
    color: color.black400,
  },

  textCenter: {
    fontSize: 15,
    fontFamily: font.regular,
    color: color.black500,
    textAlign: 'center',
  },
  formGroup: {
    paddingBottom: 20,
  },
  formControl: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    backgroundColor: color.white700,
  },
  formControlContent: {
    fontFamily: font.regular,
    color: color.black500,
    fontSize: 14,
  },
  // Top Margin
  mt1: {
    marginTop: 5,
  },
  mt2: {
    marginTop: 10,
  },
  mt3: {
    marginTop: 15,
  },
  mt4: {
    marginTop: 20,
  },

  // Margin Bottom
  mb1: {
    marginBottom: 5,
  },
  mb2: {
    marginBottom: 10,
  },
  mb3: {
    marginBottom: 15,
  },
  mb4: {
    marginBottom: 20,
  },

  my2: {
    marginVertical: 10,
  },
  pl: {paddingLeft: 5},
  pl2: {paddingLeft: 10},
  pl3: {paddingLeft: 15},
  pl4: {paddingLeft: 20},

  my3: {
    marginVertical: 15,
  },

  mx2: {
    marginHorizontal: 10,
  },

  p: {padding: 5},
  p2: {padding: 10},
  py2: {
    paddingVertical: 10,
  },

  py3: {
    paddingVertical: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  textSkyBlue: {
    color: color.skyBlue600,
  },
});
