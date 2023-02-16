import Container from '../components/Container';
import Header from '../components/Header';
import {color} from '../helpers/Constants';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {ActivityIndicator, FAB} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyText from '../components/MyText';
import {useState, useContext, useEffect} from 'react';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import AddAddressModalBody from '../components/AddAddressModalBody';
import UpdateAddressModalBody from '../components/UpdateAddressModalBody';
import Toast from 'react-native-toast-message';
import myStyles from '../helpers/Styles';

function ShipppingAddressScreen({navigation}) {
  const {state} = useContext(CustomerContext);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [updateAddressModal, setUpdateAddressModal] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [updated, setUpdated] = useState(false);
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const icons = {
    home: <Ionicons size={25} name={'home-outline'} color={color.black600} />,
    office: (
      <FontAwesome size={25} name={'building-o'} color={color.black600} />
    ),
    other: <Feather size={25} name={'home'} color={color.black600} />,
  };

  // Get shipping Address
  useEffect(() => {
    const getShippingAddress = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/customer/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        if (result.status == 200) {
          setShippingAddress(result.body?.shippingAddresses || []);
        } else {
          Toast.show({text1: result.message, type: 'danger'});
        }
        setLoading(false);
      } catch (error) {
        Toast.show({text1: error.message, type: 'danger'});
        setLoading(false);
      }
    };
    getShippingAddress();
  }, [added, deleted, updated]);

  // Delete handler
  const deleteAddressHandler = async id => {
    setDeleted(!deleted);
    try {
      const response = await fetch(`${SERVER_URL}/customer/address/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
      });
      const result = await response.json();
      if (result.status == 200) {
        Toast.show({text1: result.message, type: 'success'});
      } else {
        Toast.show({text1: result.message, type: 'danger'});
      }
    } catch (error) {
      Toast.show({text1: error.message, type: 'daner'});
    }
  };

  return (
    <Container bgColor="#f7f4ea">
      {/* Headee */}
      <Header title={'Shipping Address'} titleColor={color.black600} />

      {/* Content */}
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <ActivityIndicator color={color.red600} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : shippingAddress.length ? (
            <ScrollView style={{flex: 1}}>
              {shippingAddress.map(address => {
                return (
                  <View style={styles.card} key={address._id}>
                    <View style={{paddingRight: 15}}>
                      {address.addressType == 'HOME'
                        ? icons.home
                        : address.addressType == 'OFFICE'
                        ? icons.office
                        : icons.other}
                    </View>
                    <View>
                      <Text style={styles.mainText}>{address.addressType}</Text>
                      <Text
                        style={
                          styles.text
                        }>{`${address.address}, ${address.pincode}`}</Text>
                      <Text
                        style={
                          styles.text
                        }>{`Phone number : ${address.mobile}`}</Text>

                      {/* Edit & Delete Butons */}
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            setEditableData(address);
                            setUpdateAddressModal(true);
                          }}>
                          <Text style={{color: color.red600}}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{marginLeft: 20}}
                          onPress={() => {
                            deleteAddressHandler(address._id);
                          }}>
                          <Text style={{color: color.red600}}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name={'delivery-dining'}
                size={150}
                color={color.skyBlue600}
              />
              <MyText style={myStyles.subHeading}>No Address Aded Yet!</MyText>
              <MyText style={{...myStyles.text, marginVertical: 10}}>
                Look's like you, haven't add your Address yet!
              </MyText>

              <TouchableOpacity
                style={styles.addressBtn}
                onPress={() => {
                  setAddAddressModal(true);
                }}>
                <MyText style={styles.addressBtnText}>Add New Address</MyText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Fab Button */}
        <FAB
          style={styles.fabStyle}
          animated={true}
          color="white"
          disabled={false}
          visible={true}
          loading={false}
          //   onLongPress={showAlert}
          icon="plus"
          onPress={() => {
            // navigation.navigate('AddShippingAddressDrawer');
            setAddAddressModal(true);
          }}
          // label='EXTENDED FAB'
        />
      </View>

      {/* Add Address Modal */}
      <Modal
        visible={addAddressModal}
        transparent={true}
        onDismiss={() => setAddAddressModal(fasle)}
        animationType="slide"
        onRequestClose={() => setAddAddressModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setAddAddressModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <MyText style={{fontSize: 17, color: color.black600}}>
              Add New Address
            </MyText>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                setAddAddressModal(false);
              }}>
              <FontAwesome name={'times'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Modal Body */}
          <View style={styles.modalBody}>
            <AddAddressModalBody
              onAddHandler={setAdded}
              onModalDismisHandler={setAddAddressModal}
            />
          </View>
        </View>
      </Modal>

      {/* Update Address Modal */}
      <Modal
        visible={updateAddressModal}
        transparent={true}
        onDismiss={() => setUpdateAddressModal(fasle)}
        animationType="slide"
        onRequestClose={() => setUpdateAddressModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setUpdateAddressModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <MyText style={{fontSize: 17, color: color.black600}}>
              Update Address
            </MyText>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                setUpdateAddressModal(false);
              }}>
              <FontAwesome name={'times'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Modal Body */}
          <View style={styles.modalBody}>
            <UpdateAddressModalBody
              data={editableData}
              onUpdateHandler={setUpdated}
              onModalDismisHandler={setUpdateAddressModal}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}

export default ShipppingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.white700,
  },
  fabStyle: {
    position: 'absolute',
    margin: 25,
    right: 20,
    bottom: 20,
    backgroundColor: color.red600,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
  },
  cardBtn: {
    elevation: 1,
    backgroundColor: color.white700,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  mainText: {
    fontSize: 15,
    color: color.black600,
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    marginBottom: 5,
    color: color.black600,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContainer: {
    backgroundColor: color.white700,
    position: 'absolute',
    elevation: 5,
    flex: 1,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '100%',
    width: '100%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.alabaster,
    paddingVertical: 15,
    paddingLeft: 27,
    paddingRight: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  modalBody: {
    flex: 1,
    padding: 15,
  },
  addressBtn: {
    paddingVertical: 15,
    borderRadius: 5,
    borderBottomEndRadius: 0,
    marginTop: 10,
    paddingHorizontal: 40,
    borderColor: color.skyBlue600,
    borderWidth: 2,
  },
  addressBtnText: {
    color: color.skyBlue600,
  },
});
