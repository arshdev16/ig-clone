import React, { useState, useEffect } from "react";
import { View, Image, TextInput, Text, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { firestore, auth, serverTimestamp } from "../../Firebase";
import { useUserData } from "../../hooks";

const UploadSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A url is required"),
  caption: Yup.string()
    .min(1)
    .required("A caption is required")
    .max(2200, "Max limit reached"),
});

let Placeholder =
  "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png?w=1200&ssl=1";

const PostUploader = ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(Placeholder);

  const userData = useUserData();

  const uplodeToFirebase = async (imageUrl, caption) => {
    const postsQuery = firestore
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("posts");

    const newPost = await postsQuery.add({
      imageUrl: imageUrl,
      user: userData.username,
      profilePic:
        "https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_1280.jpg",
      ownerEmail: auth.currentUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
      likesByUser: [],
      comments: [],
    });

    postsQuery.doc(newPost.id).update({
      postId: newPost.id,
    });
    navigation.goBack();
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      validationSchema={UploadSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        uplodeToFirebase(values.imageUrl, values.caption);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Image
              source={{ uri: imageUrl ? imageUrl : Placeholder }}
              style={{ width: 100, height: 100 }}
            />
            <TextInput
              placeholder={"Enter a Caption..."}
              placeholderTextColor={"grey"}
              multiline={true}
              style={{
                color: "white",
                fontSize: 20,
                marginHorizontal: 10,
                width: 300,
              }}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              value={values.caption}
            />
          </View>
          <View
            style={{
              borderBottomColor: "#414141",
              borderBottomWidth: 0.3,
              marginVertical: 10,
            }}
          />
          <TextInput
            onChange={(e) => setImageUrl(e.nativeEvent.text)}
            placeholder={"Enter Image Url"}
            placeholderTextColor={"grey"}
            multiline={true}
            style={{ color: "white", fontSize: 18, marginTop: 5 }}
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          <Text style={{ color: "red", fontSize: 10 }}>{errors.imageUrl}</Text>
          <Button
            title="Submit"
            disabled={!isValid}
            onPress={handleSubmit}
            color="#000000"
          />
        </>
      )}
    </Formik>
  );
};

export default PostUploader;
