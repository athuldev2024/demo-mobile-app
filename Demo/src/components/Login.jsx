/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const {width} = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const loginFunc = values => {
    dispatch(
      loginUser({
        params: {
          mobile: values.mobile,
          password: values.password,
        },
        callback: data => {
          console.log('Login was succesful');
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
