import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: "Categories",
					tabBarIcon: ({ color }) => <IconSymbol name="square.grid.2x2.fill" size={24} color={color} />,
				}}
			/>

			<Tabs.Screen
				name="cart"
				options={{
					title: "Cart",
					tabBarIcon: ({ color }) => <IconSymbol name="cart.fill" size={24} color={color} />,
				}}
			/>

			<Tabs.Screen
				name="support"
				options={{
					title: "Support",
					tabBarIcon: ({ color }) => <IconSymbol name="ellipsis.bubble.fill" size={24} color={color} />,
				}}
			/>

			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color }) => <IconSymbol name="person.fill" size={24} color={color} />,
				}}
			/>

			<Tabs.Screen name="food" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="market" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="sell" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="checkout" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="category-market" options={{ href: null, headerShown: false }} />
			
			<Tabs.Screen name="supports" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="accounts" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="reservation" options={{ href: null, headerShown: false }} />

			<Tabs.Screen name="services" options={{ href: null, headerShown: false }} />
		</Tabs>
	);
}