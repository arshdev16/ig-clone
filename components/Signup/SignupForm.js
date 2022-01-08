import React from "react";
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
import { auth, firestore } from "../../Firebase";

const SignupForm = ({ navigation }) => {
  const FormSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string()
      .required()
      .min(6, "Your password must be at least 6 characters long"),
    username: Yup.string()
      .required()
      .min(4, "Your username must be at least 4 characters long"),
  });

  const onSignup = async (email, password, username) => {
    try {
      const createdUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userRef = firestore.collection("users");
      await userRef.doc(createdUser.user.email).set({
        username: username,
        email: createdUser.user.email,
        userId: createdUser.user.uid,
      });
      navigation.push("HomeScreen");
    } catch (err) {
      Alert.alert(
        "How can someone mess this up",
        "\n\n your username must be at least 4 characters long and your password must be at least 6 characters long",
        [
          {
            text: "Try again",
            style: "cancel",
          },
          {
            text: "Already have an account?",
            onPress: () => {
              navigation.push("LoginScreen");
            },
          },
        ]
      );
      console.error(err.message);
    }
  };

  return (
    <View style={styles.FormContainer}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
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
                      values.username.length > 4 || values.username.length === 0
                        ? "#d6d6d6"
                        : "red",
                  },
                ]}
                placeholderTextColor="#444"
                placeholder="username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
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
                      values.password.length > 6 || values.password.length < 1
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
                <Text style={{ fontWeight: "700" }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.push("LoginScreen")}
                >
                  <Text style={{ color: "#6BB0F5" }}> Log In</Text>
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
    borderColor: "#fafafa",
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

export default SignupForm;
