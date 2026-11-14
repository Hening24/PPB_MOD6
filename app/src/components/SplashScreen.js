import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export function CustomSplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance animation: Fade in & spring scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Continuous smooth pulse loop on icon
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // 3. Keep on screen for 3.2 seconds so user can easily take screenshot
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        pulseLoop.stop();
        if (onFinish) onFinish();
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, pulseAnim, onFinish]);

  return (
    <Animated.View style={[styles.fullScreenContainer, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0B132B" translucent />

      {/* Top Header Label */}
      <View style={styles.topHeader}>
        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>PRAKTIKUM PBB · MODUL 6</Text>
        </View>
      </View>

      {/* Center Main Content */}
      <Animated.View style={[styles.centerContent, { transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.iconRing, { transform: [{ scale: pulseAnim }] }]}>
          <Ionicons name="thermometer" size={68} color="#FFFFFF" />
        </Animated.View>

        <Text style={styles.appTitle}>LiveTemp</Text>
        <Text style={styles.appSubtitle}>Real-Time IoT Temperature Monitoring</Text>

        <View style={styles.groupBadge}>
          <Ionicons name="people-circle-outline" size={18} color="#38BDF8" />
          <Text style={styles.groupBadgeText}>KELOMPOK 25</Text>
        </View>

        {/* Member names listed directly on splash screen */}
        <View style={styles.membersBox}>
          <Text style={styles.membersBoxTitle}>ANGGOTA TIM:</Text>
          <Text style={styles.memberText}>• Aufan Damays Marsuki (21120124140163)</Text>
          <Text style={styles.memberText}>• Zikri Arribath Vadila (21120124130089)</Text>
          <Text style={styles.memberText}>• Faras Fauzan Attaqi (21120124140119)</Text>
          <Text style={styles.memberText}>• Hening Wijaya Imanda (21120124120036)</Text>
        </View>
      </Animated.View>

      {/* Bottom Footer */}
      <View style={styles.bottomFooter}>
        <Text style={styles.footerDepartment}>Teknik Komputer · Fakultas Teknik</Text>
        <Text style={styles.footerUniv}>Universitas Diponegoro</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    backgroundColor: "#0B132B", // Full-screen immersive midnight navy
    zIndex: 99999,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  topHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  pillTag: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#38BDF8",
    letterSpacing: 1.2,
  },
  centerContent: {
    alignItems: "center",
    width: "100%",
  },
  iconRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0284C7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#0284C7",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 16,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
  },
  groupBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(56, 189, 248, 0.5)",
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 24,
    marginTop: 18,
  },
  groupBadgeText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#38BDF8",
    letterSpacing: 1.5,
  },
  membersBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 22,
    width: "100%",
    maxWidth: 340,
  },
  membersBoxTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 6,
  },
  memberText: {
    fontSize: 12,
    color: "#CBD5E1",
    lineHeight: 18,
    fontFamily: "monospace",
  },
  bottomFooter: {
    alignItems: "center",
  },
  footerDepartment: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  footerUniv: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
});
