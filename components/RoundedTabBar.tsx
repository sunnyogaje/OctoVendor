// components/BottomPillTabBar.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// SVG icons
import HomeIcon from "@/assets/icons/home.svg";
import OrdersIcon from "@/assets/icons/orders.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import WalletIcon from "@/assets/icons/wallet.svg";
import PointsIcon from "@/assets/icons/points.svg";

const PURPLE = "#4A154B";
const GREY = "#9CA3AF";
const BAR_BG = "#FFFFFF";
const DIVIDER = "#c0c0c0ff";

type IconConf = { Component: React.FC<any>; label: string };
const ICONS: Record<string, IconConf> = {
  home:    { Component: HomeIcon,   label: "Home" },
  orders:  { Component: OrdersIcon, label: "Orders" },
  menu:    { Component: MenuIcon,   label: "Menu" },
  wallet:  { Component: WalletIcon, label: "Wallet" },
  points:  { Component: PointsIcon, label: "Points" },
};

export default function BottomPillTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <SafeAreaView pointerEvents="box-none" style={styles.safer}>
      <View style={styles.bar}>
        {/* top divider */}
        <View style={styles.divider} />

        <View style={styles.row}>
          {state.routes.map((route, idx) => {
            const focused = state.index === idx;
            const conf = ICONS[route.name];
            if (!conf) return null;

            const { options } = descriptors[route.key];
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.item}
                onPress={onPress}
                activeOpacity={0.9}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
              >
                {focused ? (
                  <View style={styles.chip}>
                    <conf.Component width={25} height={25} fill="#fff" />
                    <Text style={styles.chipText}>{conf.label}</Text>
                  </View>
                ) : (
                  <View style={styles.iconOnly}>
                    <conf.Component width={28} height={28} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safer: { backgroundColor: "transparent" },

  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BAR_BG,
  },
  divider: {
    height: Platform.select({ ios: 0.5, android: 1 }),
    backgroundColor: DIVIDER,
    opacity: 0.7,
  },
  row: {
    paddingHorizontal: 18,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  item: { flex: 1, alignItems: "center" },
  iconOnly: { paddingVertical: 6 },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PURPLE,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 25,
  },
  chipText: {
    color: "#fff",
    fontSize: 12.5,
    fontWeight: "500",
    marginLeft: 6,
  },
});