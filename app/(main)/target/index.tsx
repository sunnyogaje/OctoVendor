import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#141217',
  fieldBg: '#F1EDF4',     // soft grey/purple like the mock
  border: '#E5E7EB',
};

type Frame = 'weekly' | 'monthly';

export default function Targets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });

  const [orders, setOrders] = useState('');
  const [revenue, setRevenue] = useState('');
  const [newCust, setNewCust] = useState('');
  const [returning, setReturning] = useState('');
  const [frame, setFrame] = useState<Frame>('weekly');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({ ios: 8, android: 0 })}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={[styles.page, { maxWidth: isTablet ? 640 : '100%' }]}>
            {/* Header */}
            <View style={[styles.header, { marginTop: HEADER_TOP }]}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backBtn}
                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={P.text} />
              </TouchableOpacity>

              {/* Center title like the mock */}
              <View style={styles.headerCenter} pointerEvents="none">
                <Text style={[styles.headerTitle, { fontSize: isTablet ? 28 : 24 }]}>
                  Set your targets
                </Text>
              </View>
            </View>

            {/* Intro */}
            <Text style={styles.heading}>What are your goals?</Text>
            <Text style={styles.sub}>
              Set targets for orders and/or revenue to track your progress.
            </Text>

            {/* Fields */}
            <TextInput
              style={styles.input}
              placeholder="Enter  target orders"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={orders}
              onChangeText={setOrders}
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter  target revenue"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={revenue}
              onChangeText={setRevenue}
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="New Customer"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={newCust}
              onChangeText={setNewCust}
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Returning customers"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={returning}
              onChangeText={setReturning}
              returnKeyType="done"
            />

            {/* Timeframe */}
            <Text style={styles.tfLabel}>Target timeframe</Text>
            <View style={styles.tfRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setFrame('weekly')}
                style={[styles.tfPill, frame === 'weekly' && styles.tfPillActive]}
              >
                <Text style={[styles.tfText, frame === 'weekly' && styles.tfTextActive]}>Weekly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setFrame('monthly')}
                style={[styles.tfPill, frame === 'monthly' && styles.tfPillActive]}
              >
                <Text style={[styles.tfText, frame === 'monthly' && styles.tfTextActive]}>Monthly</Text>
              </TouchableOpacity>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => router.push("/target/confirmTarget")}>
              <Text style={styles.ctaText}>Set targets</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  page: { width: '100%', alignSelf: 'center' },

  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontWeight: '600', color: P.text },

  heading: { fontSize: 25, fontWeight: '500', color: P.text, marginTop: 30, marginBottom: 8 },
  sub: { fontSize: 16, color: P.subtext, marginBottom: 45 },

  input: {
    height: 58,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 25,
    backgroundColor: P.fieldBg,
    color: P.text,
    borderWidth: 1,
    borderColor: P.border,
  },

  tfLabel: { fontSize: 20, fontWeight: '500', color: P.text, marginTop: 10, marginBottom: 25 },
  tfRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  tfPill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: P.border,
    backgroundColor: '#fff',
  },
  tfPillActive: {
    backgroundColor: '#EEE8F4',
    borderColor: '#DDD5E8',
  },
  tfText: { color: P.text, fontSize: 14, fontWeight: '500' },
  tfTextActive: { color: P.text },

  cta: {
    backgroundColor: P.purple,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } }
      : { elevation: 2 }),
  },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});