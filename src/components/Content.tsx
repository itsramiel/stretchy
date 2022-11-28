import { Text, View } from "react-native";

export const Content = () => {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <View
            key={i}
            style={{
              backgroundColor: "red",
              height: 30,
              margin: 10,
              borderRadius: 5,
            }}
          >
            <Text>{i}</Text>
          </View>
        ))}
    </>
  );
};
