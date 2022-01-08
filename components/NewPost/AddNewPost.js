import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PostUploader from "./PostUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <PostUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/344/ffffff/back.png",
        }}
        style={styles.backButton}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}> New Post</Text>
    <Text> </Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default AddNewPost;
