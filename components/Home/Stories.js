import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import {Users} from '../../data/Users'


const Stories = () => {
  return (
    <View>
      <ScrollView horizontal showScrollIndicator={false}>
        {Users.map((story, index) => (
          <View key={index} style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: story.image,
            }}
            style={styles.story}
          />
          <Text style={styles.users}>{
            story.user.length > 11? story.user.slice(0, 10) + '...' : story.user
          }</Text> 
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 1.4,
    borderColor: '#ff007f'
  },
  users: {
    color: '#ffffff',
    alignItems: 'center',
  }
});
export default Stories;
