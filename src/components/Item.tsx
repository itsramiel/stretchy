import { ListRenderItemInfo, Text, View } from "react-native";

interface ItemProps extends ListRenderItemInfo<number> {}
export const Item = ({ index }: ItemProps) => {
  return (
    <View
      style={{
        backgroundColor: "blue",
        height: 30,
        margin: 10,
        borderRadius: 5,
      }}
    >
      <Text>{index}</Text>
    </View>
  );
};
