import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth, ArrayUnion, ArrayRemove, firestore } from "../../Firebase";

const FooterIcons = [
  {
    name: "like",
    imageUrl: "https://img.icons8.com/ios/344/ffffff/like.png",
    likedImageUrl: "https://img.icons8.com/color/48/000000/like--v3.png",
  },
  {
    name: "comment",
    imageUrl:
      "https://img.icons8.com/external-flatart-icons-outline-flatarticons/344/ffffff/external-comment-chat-flatart-icons-outline-flatarticons-1.png",
  },
  {
    name: "share",
    imageUrl: "https://img.icons8.com/ios/344/ffffff/paper-plane.png",
  },
  {
    name: "save",
    imageUrl:
      "https://img.icons8.com/material-outlined/344/ffffff/bookmark-ribbon.png",
  },
];

const Post = ({ post }) => {
  const [imageState, setImageState] = useState(false);

  const handleLikes = (post) => {
    const currentLikeStatus = !post.likesByUser.includes(
      auth.currentUser.email
    );
    firestore
      .collection("users")
      .doc(post.ownerEmail)
      .collection("posts")
      .doc(post.postId)
      .update({
        likesByUser: currentLikeStatus
          ? ArrayUnion(auth.currentUser.email)
          : ArrayRemove(auth.currentUser.email),
      });
    setImageState(!imageState);
  };
  return (
    <View style={{ marginBottom: 100 }}>
      <View
        style={{
          borderBottomColor: "#414141",
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter
          post={post}
          handleLikes={handleLikes}
          imageState={imageState}
        />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={styles.ParentContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.profilePic} source={{ uri: post.profilePic }} />
        <Text style={{ color: "white", fontWeight: "700" }}>{post.user}</Text>
      </View>
      <Text style={{ color: "white" }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450, paddingHorizontal: 10 }}>
    <Image style={styles.imageUrl} source={{ uri: post.imageUrl }} />
  </View>
);

const PostFooter = ({ handleLikes, post, imageState }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => handleLikes(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: imageState
              ? FooterIcons[0].likedImageUrl
              : FooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={FooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={FooterIcons[2].imageUrl} />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={FooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    <Text style={{ color: "white", fontWeight: "700" }}>
      {post.likesByUser.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Caption = ({ post }) => (
  <Text style={{ color: "white" }}>
    <Text style={{ fontWeight: "700" }}>{post.user}</Text>{" "}
    <Text>{post.caption}</Text>
  </Text>
);

const CommentSection = ({ post }) => (
  <View>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View{post.comments.length > 1 ? " all" : ""}{" "}
        {post.comments.length <= 1 ? "comment" : "comments"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 4 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "700" }}>{comment.user}</Text>
          <Text style={{}}> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  ParentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 1.7,
    borderColor: "#C32E92",
  },
  imageUrl: {
    height: "100%",
    resizeMode: "cover",
  },
  footerIcon: {
    height: 33,
    width: 33,
    marginHorizontal: 3,
  },
});

export default Post;
