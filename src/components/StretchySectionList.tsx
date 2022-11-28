import Animated from "react-native-reanimated";
import { SectionList, SectionListProps, View } from "react-native";

import { useStretchy } from "../useStretchy";
import { StretchyProps } from "../types";
import { Container } from "./Container";

const AnimatedSectionList = Animated.createAnimatedComponent<SectionListProps<any, any>>(SectionList);

interface StretchySectionListProps<T, K> extends SectionListProps<T, K>, StretchyProps {}
export const StretchySectionList = <T, K>({ imageSource, imageHeight, foreground, ...props }: StretchySectionListProps<T, K>) => {
  const { rImage, rView, scrollHandler } = useStretchy({ imageHeight });

  return (
    <Container>
      <AnimatedSectionList
        {...props}
        contentOffset={{ x: 0, y: -imageHeight }}
        contentContainerStyle={{ paddingTop: imageHeight }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />
      <Animated.View style={rView} pointerEvents="none">
        <Animated.Image source={imageSource} style={rImage} />
        {foreground}
      </Animated.View>
    </Container>
  );
};
