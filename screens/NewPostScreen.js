import React from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import AddNewPost from "../components/NewPost/AddNewPost";

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default NewPostScreen;
