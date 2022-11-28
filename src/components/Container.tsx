import { View, ViewProps } from "react-native";

export const Container = (props: ViewProps) => {
  return <View {...props} style={[{ flex: 1 }, props.style]} />;
};
