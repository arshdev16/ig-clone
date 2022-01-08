import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active:
      "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_1280.jpg",
    inactive:
      "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_1280.jpg",
  },
];

const BottomTab = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("home");
  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icons,
          icon.name === "Profile" ? styles.ProfilePic : null,
        ]}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          borderBottomColor: "#414141",
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />
      <View style={styles.bottomTabContainer}>
        {icons.map((icon, index) => (
          <Icon icon={icon} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    height: 33,
    width: 33,
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60,
    paddingTop: 10,
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "#000000",
  },
  ProfilePic:{
      borderRadius: 100
  }
});

export default BottomTab;
