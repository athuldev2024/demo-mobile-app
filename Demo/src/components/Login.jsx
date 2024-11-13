import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Formik} from 'formik';
import {CustomInput, CustomButton} from '../components';
import {LoginvalidationSchema} from '../utils/validation-utils';

const {width} = Dimensions.get('window');

const Login = () => {
  console.log('I have reached here at last!!!');
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{mobile: '', password: ''}}
        validationSchema={LoginvalidationSchema}
        onSubmit={values => {
          console.log('+++++++++++++++++++++++++++');
          console.log(values);
          console.log('+++++++++++++++++++++++++++');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
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

            <CustomButton title="Submit" icon="camera" onPress={handleSubmit} />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
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
});

export default Login;
