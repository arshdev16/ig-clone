import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { auth } from "../../Firebase";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/header-logo.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconBadge}>
            <Text style={{ color: "white", fontWeight: "100" }}>11</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              await auth.signOut();
              navigation.push("LoginScreen");
            } catch (err) {
              console.error(err.message);
            }
          }}
        >
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/ios/344/ffffff/logout-rounded.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  iconBadge: {
    backgroundColor: "#ff0f0f",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 100,
  },
});

export default Header;
