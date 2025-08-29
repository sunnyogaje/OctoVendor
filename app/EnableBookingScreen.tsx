import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from "expo-router";


const P = {
	purple: '#4A154B',
	text: '#111827',
	subtext: '#6B7280',
	border: '#E5E0F5',
	orange: '#F59E0B',
};

export default function PersonalDetails() {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const isTablet = width >= 768;
	 const { businessType } = useLocalSearchParams();

	// Platform-tuned top spacing AFTER the safe area.
	const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });

	return (
		<SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={[styles.page, { maxWidth: isTablet ? 640 : '100%' }]}>
					{/* Header with Back button */}
					<View style={[styles.header, { marginTop: HEADER_TOP }]}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backBtn}
							hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
							activeOpacity={0.7}
						>
							<Ionicons name="arrow-back" size={24} color={P.text} />
						</TouchableOpacity>
						<Text style={[styles.headerTitle, { fontSize: isTablet ? 23 : 19 }]}>
							Enable online booking on Octomarket
						</Text>
					</View>

					{/* Body copy */}
					<Text style={styles.subtext}>
						By enabling online bookings with us, your venue will be listed on your marketplace and
						you will be discoverable by potential clients
					</Text>

					<Image source={require("@/assets/images/booking-phone.png")} style={styles.artImage} />

					{/* Continue Button */}
					<TouchableOpacity
						style={styles.cta}
						onPress={() => {
								if (businessType === "food") {
								  router.push("/(main)/food/home"); 
								} else {
								// default route if none match
								router.push("/(main)/other/home"); 
								}
							}}
						activeOpacity={0.9}
					>
						<Text style={styles.ctaText}>Enable</Text>
					</TouchableOpacity>
					<TouchableOpacity 
					
					onPress={() => {
						if (businessType === "food") {
							router.push("/(main)/food/home"); 
						} else {
						// default route if none match
						router.push("/(main)/other/home"); 
						}
					}}
					
					activeOpacity={0.8}>
						<Text style={styles.skipText}>Skip</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#fff' },

	// Always 16 horizontal padding (as requested) and enough bottom space for the CTA.
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 16,
		paddingBottom: 32,
	},

	// Center the “page” on tablets/web for better readability.
	page: {
		width: '100%',
		alignSelf: 'center',
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	backBtn: {
		marginRight: 12,
		padding: 6,
	},
	headerTitle: {
		fontWeight: '400',
		color: P.text,
	},

	cta: {
		backgroundColor: P.purple,
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
		...(Platform.OS === 'ios'
			? {
				shadowColor: '#000',
				shadowOpacity: 0.1,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 3 },
			}
			: { elevation: 2 }),
	},
	ctaText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	skipText: {
		color: P.orange,
		fontSize: 15,
		textAlign: "center",
		marginTop: 20,
		fontWeight: '600',
	},
	subtext: {
		fontSize: 15,
		lineHeight: 20,
		color: P.text,
		marginBottom: 70,
	},
	artImage: {
		width: "75%",
		height: "43%",
		resizeMode: "cover",
		alignSelf: "center",
		borderRadius: 30,
		marginBottom: 120,
	},
});