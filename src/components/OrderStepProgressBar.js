import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';

const OrderStepProgressBar = ({orderDetails}) => {
  return (
    <View style={styles.card}>
      <MyText style={styles.heading}>Order Status</MyText>

      <View style={styles.stepContainer}>
        {/* Pending */}
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                orderDetails.orderStatus == 'PENDING' ||
                orderDetails.orderStatus == 'CONFIRMED' ||
                orderDetails.orderStatus == 'READYTOSHIP' ||
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepCircleFill
                  : styles.stepCircle
              }>
              <MyText
                style={
                  orderDetails.orderStatus == 'PENDING' ||
                  orderDetails.orderStatus == 'CONFIRMED' ||
                  orderDetails.orderStatus == 'READYTOSHIP' ||
                  orderDetails.orderStatus == 'DISPATCHED' ||
                  orderDetails.orderStatus == 'DELIVERED'
                    ? styles.stepCircleTextFill
                    : styles.stepCircleText
                }>
                1
              </MyText>
            </View>
            <MyText
              style={
                orderDetails.orderStatus == 'CONFIRMED' ||
                orderDetails.orderStatus == 'READYTOSHIP' ||
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepTextFill
                  : styles.stepText
              }>
              PENDING
            </MyText>
          </View>
          <View
            style={
              orderDetails.orderStatus == 'CONFIRMED' ||
              orderDetails.orderStatus == 'READYTOSHIP' ||
              orderDetails.orderStatus == 'DISPATCHED' ||
              orderDetails.orderStatus == 'DELIVERED'
                ? styles.stepBarFill
                : styles.stepBar
            }></View>
        </View>

        {/* Confirmed */}
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                orderDetails.orderStatus == 'CONFIRMED' ||
                orderDetails.orderStatus == 'READYTOSHIP' ||
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepCircleFill
                  : styles.stepCircle
              }>
              <MyText
                style={
                  orderDetails.orderStatus == 'CONFIRMED' ||
                  orderDetails.orderStatus == 'READYTOSHIP' ||
                  orderDetails.orderStatus == 'DISPATCHED' ||
                  orderDetails.orderStatus == 'DELIVERED'
                    ? styles.stepCircleTextFill
                    : styles.stepCircleText
                }>
                2
              </MyText>
            </View>
            <MyText
              style={
                orderDetails.orderStatus == 'CONFIRMED' ||
                orderDetails.orderStatus == 'READYTOSHIP' ||
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepTextFill
                  : styles.stepText
              }>
              CONFIRMED
            </MyText>
          </View>
          <View
            style={
              orderDetails.orderStatus == 'READYTOSHIP' ||
              orderDetails.orderStatus == 'DISPATCHED' ||
              orderDetails.orderStatus == 'DELIVERED'
                ? styles.stepBarFill
                : styles.stepBar
            }></View>
        </View>

        {/* Dispatched */}
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepCircleFill
                  : styles.stepCircle
              }>
              <MyText
                style={
                  orderDetails.orderStatus == 'DISPATCHED' ||
                  orderDetails.orderStatus == 'DELIVERED'
                    ? styles.stepCircleTextFill
                    : styles.stepCircleText
                }>
                3
              </MyText>
            </View>
            <MyText
              style={
                orderDetails.orderStatus == 'DISPATCHED' ||
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepTextFill
                  : styles.stepText
              }>
              DISPATCHED
            </MyText>
          </View>
          <View
            style={
              orderDetails.orderStatus == 'DELIVERED'
                ? styles.stepBarFill
                : styles.stepBar
            }></View>
        </View>

        {/* Delivered */}
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepCircleFill
                  : styles.stepCircle
              }>
              <MyText
                style={
                  orderDetails.orderStatus == 'DELIVERED'
                    ? styles.stepCircleTextFill
                    : styles.stepCircleText
                }>
                4
              </MyText>
            </View>
            <MyText
              style={
                orderDetails.orderStatus == 'DELIVERED'
                  ? styles.stepTextFill
                  : styles.stepText
              }>
              DELIVERED
            </MyText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderStepProgressBar;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white700,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 1,
  },
  heading: {color: color.black600, fontSize: 17, fontFamily: font.bold},
  stepContainer: {
    marginTop: 15,
  },
  stepCircle: {
    borderWidth: 2,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: color.black500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleFill: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.red600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleText: {
    color: color.black500,
  },
  stepCircleTextFill: {
    color: color.white700,
  },
  stepBar: {
    height: 20,
    width: 3,
    backgroundColor: color.black500,
    marginLeft: 13.5,
    marginTop: -1,
  },
  stepBarFill: {
    height: 20,
    width: 4,
    backgroundColor: color.red600,
    marginLeft: 13,
    marginTop: -1,
  },
  stepText: {
    color: color.black500,
    marginLeft: 10,
  },
  stepTextFill: {
    color: color.red600,
    marginLeft: 10,
  },
});
