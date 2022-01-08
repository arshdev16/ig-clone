import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import BottomTab, { bottomTabIcons } from "../components/Home/BottomTab";
import { firestore } from "../Firebase";

const HomeScreen = ({ navigation }) => {
  const [Posts, setPosts] = useState([]);
 
  useEffect(() => {
   firestore.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
     setPosts(snapshot.docs.map(doc => doc.data()))
   })
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView vertical>
        {Posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTab icons={bottomTabIcons} />
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
export default HomeScreen;
