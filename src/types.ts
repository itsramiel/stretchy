import { ImageSourcePropType } from "react-native";

export interface StretchyProps {
  imageSource: ImageSourcePropType;
  imageHeight: number;
  foreground: React.ReactNode;
}
