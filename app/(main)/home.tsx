import React from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// import Greeting from '@/components/Greeting';
// import SearchBar from '../../components/SearchBar';
// import BannerCarousel from '@/components/BannerCarousel';
// import SectionHeader from '@/components/SectionHeader';
// import ProductList from '@/components/ProductList';
// import PopularList from '@/components/PopularList';
// import PromoCard from '@/components/PromoCard';
// import RewardStrip from '@/components/RewardStrip';
// import SponsoredPosts from '@/components/SponsoredPosts';
// import RecentlyViewed from '@/components/RecentlyViewed';
// import UsedItemViewed from '@/components/UsedItemViewed';
// import FavoriteBrands from '@/components/FavoriteBrands';
// import PromoBanners from '@/components/PromoBanners';
// import MarketplaceReservations from '@/components/MarketplaceReservations';

// export default function HomeScreen() {
  

//   const insets = useSafeAreaInsets();

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar style="dark" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.content,
//           { paddingBottom: insets.bottom + 16 },
//         ]}
//       >
//         <Greeting />
//         <SearchBar onPress={() => router.push('../search')} />
//         <BannerCarousel />
//         <MarketplaceReservations
//             onMarketplacePress={() => router.push('./category-market/')}
//             onReservationsPress={() => router.push('./reservation')}
//           />
//         <PopularList />
//         <PromoCard />
//         <RewardStrip />
//         <SponsoredPosts />
//         <RecentlyViewed />
//         <FavoriteBrands />
//         <UsedItemViewed />
//         <PromoBanners />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     paddingHorizontal: 18,
//   },
// });