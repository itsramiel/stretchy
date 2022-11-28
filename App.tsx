import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Content } from "./src/components/Content";
import { Item } from "./src/components/Item";
import { StretchyFlatList } from "./src/components/StretchyFlatlist";
import { StretchyScrollView } from "./src/components/StretchyScrollView";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StretchyFlatList
        data={Array(20).fill(0)}
        renderItem={Item}
        imageSource={require("./assets/doggo.jpg")}
        imageHeight={200}
        foreground={
          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 10 }}>
            <Text>rami is the best</Text>
          </View>
        }
      >
        <Content />
      </StretchyFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
