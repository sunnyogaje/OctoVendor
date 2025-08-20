import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const P = {
    purple: '#4A154B',
    text: '#111827',
    subtext: '#6B7280',
    border: '#E5E0F5',
};

export default function PersonalDetails() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Back button */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backBtn}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color={P.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Personal Details</Text>
                </View>

                {/* Input fields */}
                <View style={styles.form}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder="Enter your first name"
                        style={styles.input}
                        placeholderTextColor={P.subtext}
                    />

                    <Text style={styles.label}>Last name</Text>
                    <TextInput
                        placeholder="Enter your last name"
                        style={styles.input}
                        placeholderTextColor={P.subtext}
                    />

                    <Text style={styles.label}>Contact Address</Text>
                    <TextInput
                        placeholder="Your address"
                        style={styles.input}
                        placeholderTextColor={P.subtext}
                    />

                    <Text style={styles.label}>Referral code (Optional)</Text>
                    <TextInput
                        placeholder="Your referral code"
                        style={styles.input}
                        placeholderTextColor={P.subtext}
                    />

                    <Text style={styles.label}>Your Birthday</Text>
                    <TextInput
                        placeholder="DD/MM/YY"
                        style={styles.input}
                        placeholderTextColor={P.subtext}
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={styles.cta} activeOpacity={0.9}>
                    <Text style={styles.ctaText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    backBtn: {
        marginRight: 12,
        padding: 6,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: P.text,
    },

    form: { marginBottom: 25, marginTop: 18 },

    label: {
        fontSize: 15,
        fontWeight: '500',
        color: P.text,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: P.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 20 : 16,
        fontSize: 15,
        marginBottom: 25,
        color: P.text,
    },

    cta: {
        backgroundColor: P.purple,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        ...(Platform.OS === 'ios'
            ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }
            : { elevation: 2 }),
    },
    ctaText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '600',
    },
});
