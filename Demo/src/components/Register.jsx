/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {CustomInput, CustomButton, Header} from '../components';
import {RegistervalidationSchema} from '../utils/validation-utils';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import {Dropdown} from 'react-native-paper-dropdown';
import {registerUser} from '../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const Register = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userDetails} = useSelector(state => state.user);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length > 0) {
      AsyncStorage.setItem('userDetails', JSON.stringify(userDetails)).then(
        () => {
          navigation.getParent()?.navigate('ProfileScreen');
        },
      );
    }
  }, [userDetails, navigation]);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const OPTIONS = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Other', value: 'O'},
  ];

  const registerFunc = body => {
    delete body.confirm;
    dispatch(
      registerUser({
        body,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              mobile: '',
              password: '',
              confirm: '',
              email: '',
              gender: '',
              dob: new Date(),
            }}
            validationSchema={RegistervalidationSchema}
            onSubmit={registerFunc}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Header>Register</Header>
                <CustomInput
                  style={styles.customInput}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                />
                {touched.mobile && errors.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}

                <CustomInput
                  style={styles.customInput}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <CustomInput
                  style={styles.customInput}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  value={values.confirm}
                />
                {touched.confirm && errors.confirm && (
                  <Text style={styles.errorText}>{errors.confirm}</Text>
                )}

                <CustomInput
                  style={styles.customInput}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={{width: '90%', backgroundColor: 'transparent'}}>
                  <Dropdown
                    label="Gender"
                    placeholder="Select Gender"
                    options={OPTIONS}
                    value={values.gender}
                    onSelect={value => {
                      setFieldValue('gender', value);
                    }}
                  />
                </View>
                {touched.gender && errors.gender && (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                )}

                <TouchableOpacity
                  onPress={() => setShowDatePicker(prev => !prev)}>
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: '#ddd',
                      borderRadius: 5,
                    }}>
                    {String(values.dob) ?? 'Select Date'}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode="single"
                    value={values.dob}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={selectedDate => {
                      setShowDatePicker(false);
                      setFieldValue('dob', selectedDate.date);
                    }}
                  />
                )}
                {touched.dob && errors.dob && (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="register"
                    icon="login"
                    onPress={handleSubmit}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={navigateToLogin}>
                    <Text style={{color: 'blue'}}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    gap: 10,
  },
  customInput: {
    width: '90%',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
  },
});

export default Register;
