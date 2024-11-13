/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {CustomInput, CustomButton, Header} from '../components';
import {LoginvalidationSchema} from '../utils/validation-utils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/userSlice';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userDetails} = useSelector(state => state.user);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length > 0) {
      navigation.getParent()?.navigate('ProfileScreen');
    }
  }, [userDetails, navigation]);

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  function tempFunc() {
    console.log('I have reached here!!');
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'This is a toast message from a child component.',
    });
  }

  const loginFunc = values => {
    dispatch(
      loginUser({
        body: {
          mobile: values.mobile,
          password: values.password,
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{mobile: '', password: ''}}
        validationSchema={LoginvalidationSchema}
        onSubmit={loginFunc}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Header>Login</Header>
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

            <View style={styles.buttonContainer}>
              <CustomButton title="Login" icon="login" onPress={handleSubmit} />
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToRegister}>
                <Text style={{color: 'blue'}}>Register</Text>
              </TouchableOpacity>
            </View>

            <CustomButton title="stupi logci" icon="login" onPress={tempFunc} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Login;
