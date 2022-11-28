import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Content } from "./src/components/Content";
import { StretchyScrollView } from "./src/components/StretchyScrollView";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StretchyScrollView
        imageSource={require("./assets/doggo.jpg")}
        imageHeight={200}
      >
        <Content />
      </StretchyScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
