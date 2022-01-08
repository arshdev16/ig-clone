import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  View,
} from "react-native";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/color/344/instagram-new--v1.png",
          }}
          style={styles.logo}
        />
      </View>
      <LoginForm navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 125,
    height: 125,
  },
  imageContainer: {
      alignItems: "center",
  }
});

export default LoginScreen;
