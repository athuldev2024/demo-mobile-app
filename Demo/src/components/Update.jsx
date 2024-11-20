/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {
  CustomInput,
  CustomButton,
  Header,
  CustomDate,
  CustomDropDown,
} from '../components';
import {RegistervalidationSchema} from '../utils/validation-utils';
import {updateUser} from '../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const Update = () => {
  const dispatch = useDispatch();

  const {allUsers} = useSelector(state => state.user);

  const OPTIONS = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Other', value: 'O'},
  ];

  const updateFunc = body => {
    const {password, confirm, dob} = body;
    if (password !== confirm) {
      Toast.show({
        type: 'error',
        text1: 'Password and confirm password doesnt match.',
        visibilityTime: 3000,
      });
      return;
    }

    delete body.confirm;
    dispatch(
      updateUser({
        body: {...body, dob: new Date(dob).toISOString().split('T')[0]},
        params: {userID: allUsers.userData.id},
      }),
    );
  };

  const initialValues = useMemo(() => {
    if (allUsers && Object.keys(allUsers).length > 0) {
      let usertemp = allUsers.userData;
      return {
        name: usertemp.name,
        mobile: usertemp.mobile,
        password: usertemp.password,
        confirm: usertemp.password,
        email: usertemp.email,
        gender: usertemp.gender,
        dob: new Date(usertemp.dob).toGMTString(),
      };
    }

    return {
      name: '',
      mobile: '',
      password: '',
      confirm: '',
      email: '',
      gender: '',
      dob: new Date(),
    };
  }, [allUsers]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={RegistervalidationSchema}
            onSubmit={updateFunc}>
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
                <Header>Update</Header>
                <CustomInput
                  style={styles.customInput}
                  placeholder="Username"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  touched={touched}
                  errors={errors}
                  fieldName={'name'}
                />

                <CustomInput
                  style={styles.customInput}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                  touched={touched}
                  errors={errors}
                  fieldName={'mobile'}
                />

                <CustomInput
                  style={styles.customInput}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  touched={touched}
                  errors={errors}
                  fieldName={'password'}
                />

                <CustomInput
                  style={styles.customInput}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  value={values.confirm}
                  touched={touched}
                  errors={errors}
                  fieldName={'confirm'}
                />

                <CustomInput
                  style={styles.customInput}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  touched={touched}
                  errors={errors}
                  fieldName={'email'}
                />

                <CustomDropDown
                  value={values.gender}
                  changeValue={gdr => {
                    setFieldValue('gender', gdr);
                  }}
                  OPTIONS={OPTIONS}
                  touched={touched}
                  errors={errors}
                  fieldName={'gender'}
                />

                <CustomDate
                  value={values.dob}
                  changeValue={dt => setFieldValue('dob', dt)}
                  touched={touched}
                  errors={errors}
                  fieldName={'dob'}
                />

                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Update"
                    icon="login"
                    onPress={handleSubmit}
                  />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
  },
});

export default Update;
