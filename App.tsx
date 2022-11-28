import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Content } from "./src/components/Content";
import { Item } from "./src/components/Item";
import { StretchyFlatList } from "./src/components/StretchyFlatlist";
import { StretchyScrollView } from "./src/components/StretchyScrollView";
import { StretchySectionList } from "./src/components/StretchySectionList";

const sections = Array(4)
  .fill(0)
  .map(
    (_, i) =>
      ({
        title: String(i),
        data: Array(5).fill(0),
      } as { title: string; data: number[] })
  );

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StretchySectionList
        sections={sections}
        renderItem={Item}
        renderSectionHeader={({ section }) => (
          <View>
            <Text>{section.title}</Text>
          </View>
        )}
        imageSource={require("./assets/doggo.jpg")}
        imageHeight={200}
        foreground={
          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 10 }}>
            <Text>rami is the best</Text>
          </View>
        }
      >
        <Content />
      </StretchySectionList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
