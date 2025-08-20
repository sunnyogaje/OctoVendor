import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

// Your local SVGs (already configured with react-native-svg-transformer)
import ReservationIcon from '../assets/icons/reservation.svg';
import MarketplaceIcon from '../assets/icons/marketplace.svg';

const P = {
	purple: '#4A154B',
	text: '#111827',
	subtext: '#6B7280',
	border: '#E5E7EB',
	cardBg: '#FFFFFF',
};

type BizId = 'reservation' | 'marketplace';

export default function BusinessType() {
	const router = useRouter();
	const [selected, setSelected] = useState<BizId | null>(null);

	const options: { id: BizId; label: string; Icon: React.ComponentType<any> }[] = [
		{ id: 'reservation', label: 'Reservation', Icon: ReservationIcon },
		{ id: 'marketplace', label: 'Marketplace', Icon: MarketplaceIcon },
	];


	const handleClearStorage = async () => {
		try {
			await AsyncStorage.removeItem("hasLaunched");
			alert("App storage cleared. Restart to see onboarding again.");
		} catch (error) {
			console.error("Error clearing storage:", error);
		}
	};


	const handleStart = () => {
		router.push('/personal-details');
	};

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView
				contentContainerStyle={styles.centered} // <-- centers vertically
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.block}>
					<Text style={styles.title}>What type of business do you offer</Text>

					{/* Uncomment if needed */}
					{/* <TouchableOpacity onPress={handleClearStorage}>
						<Text style={styles.clearText}>Clear storage</Text>
					</TouchableOpacity> */}
					{options.map(({ id, label, Icon }) => {
						const active = selected === id;
						return (
							<TouchableOpacity
								key={id}
								activeOpacity={0.9}
								onPress={() => setSelected(id)}
								style={[styles.card, active && styles.cardActive]}
							>
								<View style={styles.cardLeft}>
									<View style={styles.iconWrap}>
										<Icon width={27} height={27} color={P.purple} />
									</View>
									<Text style={styles.cardText}>{label}</Text>
								</View>

								<View style={[styles.radioOuter, active && styles.radioOuterActive]}>
									{active && <View style={styles.radioInner} />}
								</View>
							</TouchableOpacity>
						);
					})}


					<TouchableOpacity style={styles.cta} onPress={handleStart} activeOpacity={0.9}>
						<Text style={styles.ctaText}>
							Next
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#fff' },

	// vertical centering for the whole screen content
	centered: {
		flexGrow: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 24,
	},

	// keeps the group a tidy width and spacing
	block: {
		width: '100%',
	},

	title: {
		color: P.text,
		fontSize: 26,
		lineHeight: 30,
		fontWeight: '600',
		marginBottom: 30,
	},

	card: {
		flexDirection: 'row',
		alignItems: 'center',        // centers icon/label/radio vertically in the row
		justifyContent: 'space-between',
		backgroundColor: P.cardBg,
		borderWidth: 1,
		borderColor: P.border,
		borderRadius: 14,
		paddingVertical: 16,
		paddingHorizontal: 14,
		marginBottom: 14,
		...(Platform.OS === 'ios'
			? { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } }
			: { elevation: 0 }),
	},
	cardActive: { borderColor: '#D6BBFB' },

	cardLeft: { flexDirection: 'row', alignItems: 'center' },

	iconWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},

	cardText: {
		fontSize: 16,
		color: P.text,
		// helps perfect vertical centering on Android
		...(Platform.OS === 'android' ? { includeFontPadding: false, textAlignVertical: 'center' } : null),
	},

	radioOuter: {
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 2,
		borderColor: '#D1D5DB',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	radioOuterActive: { borderColor: P.purple },
	radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: P.purple },

	clearText: {
		color: "#4A154B",
		textAlign: "center",
		textDecorationLine: "underline",
		fontWeight: "800",
		fontSize: 12,
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