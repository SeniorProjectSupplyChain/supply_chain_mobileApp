import React from "react";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-new-snap-carousel";
import RenderSlide from "./RenderSlide";
import { windowWidth } from "../../utils";
import { StyleSheet, Text, View } from "react-native";

const Slide = ({ item }: { item: any }) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  if (item) {
    return (
      <>
        <Carousel
          ref={isCarousel}
          sliderWidth={windowWidth}
          // sliderHeight={windowWidth}
          itemWidth={windowWidth - 60}
          data={item}
          renderItem={(
            { item, index }: { item: any; index: any },
            parallaxProps: any
          ) => {
            return (
              <RenderSlide item={item} parallaxProps={parallaxProps} index />
            );
          }}
          hasParallaxImages={true}
          // swipeThreshold={5}
          loop={true}
          // autoplay
          lockScrollWhileSnapping={true}
          useScrollView={true}
          onBeforeSnapToItem={(index: any) => setIndex(index)}
        />
        <Pagination
          dotsLength={item?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "#5B9EE1",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
          containerStyle={{
            marginVertical: -20,
            marginBottom: -30,
            top: 0,
          }}
        />
      </>
    );
  } else {
    return null;
  }
};
export default React.memo(Slide);
