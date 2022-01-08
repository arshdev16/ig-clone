import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { auth } from "../../Firebase";

const LoginForm = ({ navigation }) => {
  const FormSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string()
      .required()
      .min(6, "Your password must be at least 6 characters long"),
  });

  const onLogin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigation.push("HomeScreen");
    } catch (err) {
      Alert.alert(
        `Haha gootcha`,
        `Wrong Password, Don't try to login to someone else's account, YOU FOOL`,
        [
          {
            text: "Try again",
            style: "cancel",
          },
          {
            text: "make an account",
            onPress: () => {
              navigation.push("SignupScreen");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.FormContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View>
              <TextInput
                style={[
                  styles.TextInput,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#d6d6d6"
                        : "red",
                  },
                ]}
                placeholderTextColor="#444"
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View>
              <TextInput
                style={[
                  styles.TextInput,
                  {
                    borderColor:
                      values.password.length >= 6 || values.password.length < 1
                        ? "#d6d6d6"
                        : "red",
                  },
                ]}
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot Password</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.Btn(isValid)}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#FFFFFF" }}>Log In</Text>
            </Pressable>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "700" }}>Dont have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.push("SignupScreen")}
                >
                  <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  FormContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  TextInput: {
    borderWidth: 1.7,
    borderColor: "#d6d6d6",
    backgroundColor: "#f8f8f8",
    width: 300,
    padding: 5,
    marginVertical: 10,
  },
  Btn: (isValid) => ({
    marginVertical: 10,
    backgroundColor: isValid ? "#5387ff" : "#51cbff",
    width: 300,
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  }),
});

export default LoginForm;
