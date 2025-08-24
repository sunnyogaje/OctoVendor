import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Onboarding() {
	const router = useRouter();

	const handleStart = () => {
		router.push('/business-type');
	};

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				<View style={styles.heroWrap}>
					<Image
						source={require('../assets/images/onboarding.png')}
						style={styles.hero}
						resizeMode="cover"
					/>
				</View>

				{/* Content */}
				<View style={styles.card}>
					<Text style={styles.title}>Grow your business with Octo Vendors</Text>
					<Text style={styles.subtitle}>
						Reach more customers and manage your business with ease.
					</Text>

					<TouchableOpacity style={styles.cta} onPress={handleStart} activeOpacity={0.9}>
						<Text style={styles.ctaText}>Get started</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const P = {
	purple: '#4A154B',
	text: '#111827',
	subtext: '#6B7280',
};

const HERO_HEIGHT = Math.min(340, width * 0.78);

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	heroWrap: {
		width,
		height: HERO_HEIGHT,
		overflow: 'hidden',
		marginTop: 65,
	},
	hero: {
		width: '100%',
		height: '100%',
	},
	card: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 18,
	},
	title: {
		color: P.text,
		fontSize: 25,
		lineHeight: 30,
		fontWeight: '600',
		marginBottom: 35,
	},
	subtitle: {
		color: P.subtext,
		fontSize: 16,
		lineHeight: 22,
		marginBottom: 70,
	},
	cta: {
		marginTop: 50,
		backgroundColor: P.purple,
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
		...(Platform.OS === 'ios'
			? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }
			: { elevation: 2 }),
	},
	ctaText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
	},
});