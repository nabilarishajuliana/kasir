// import * as React from 'react';
// import { Dimensions, Text, View,Image  } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// const images = [
    // 'https://static1.squarespace.com/static/5a5dbe4632601eb31977f947/5a5dbe9653450ab899649d1f/62fb321d8e7ca70722113aa3/1660630864601/Diskon-Merdeka_Landscape.jpg?format=1500w',
    // 'https://duniaperiklanan.id/wp-content/uploads/2023/02/Iklan-Produk-Makanan-Mcd-1024x536.jpeg',
    // 'https://cdn-oss.ginee.com/official/wp-content/uploads/2023/03/image-106.png',
    // 'https://i.ytimg.com/vi/QHG1Q1qvSfw/maxresdefault.jpg',
    // 'https://cdn-oss.ginee.com/official/wp-content/uploads/2021/12/image-1934-1024x576.png',
    // 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/healthy-food-restaurant-banner-design-template-5d8526f015d6a01027536b17714b98d3_screen.jpg?ts=1662349433',
//   ];

//   const Slide = () => {
//     const width = Dimensions.get('window').width;
//     return (
//       <View style={{ flex: 1 }}>
//         <Carousel
//           loop
//           width={width}
//           height={200}
//           autoPlay={true}
//           data={[...new Array(6).keys()]}
//           scrollAnimationDuration={1000}
//         //   onSnapToItem={(index) => console.log('current index:', index)}
//           renderItem={({ index }) => (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//               }}
//             >
//         <Image
//   source={{ uri: images[index] }} // Ganti dengan path gambar Anda
//   style={{ width: "100%", height: 200 }} // Sesuaikan ukuran gambar
// />

//             </View>
//           )}
//         />
//       </View>
//     );
//   }

//   export default Slide;

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";

interface CarouselProps {
  items: string[];
}

const Slide: React.FC<CarouselProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} autoplay activeDotColor="orange">
        {items.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image
              source={{
                uri: item
              }} 
              style={{ width: "100%", height: 200 }} // Sesuaikan ukuran gambar
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  
});

export default Slide;
