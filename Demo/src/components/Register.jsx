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

const {width} = Dimensions.get('window');

const registerFunc = values => {
  console.log('+++++++++++++++++++++++++++');
  console.log(values);
  console.log('+++++++++++++++++++++++++++');
};

const Register = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{mobile: '', password: ''}}
        validationSchema={LoginvalidationSchema}
        onSubmit={registerFunc}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
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

            <View style={styles.buttonContainer}>
              <CustomButton
                title="register"
                icon="login"
                onPress={handleSubmit}
              />
              <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                <Text style={{color: 'blue'}}>Login</Text>
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

export default Register;
