import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { tokens } from "../theme/tokens.js";

const { color, space, radius, shadow } = tokens;

const TEAM_MEMBERS = [
  {
    name: "Aufan Damays Marsuki",
    nim: "21120124140163",
    role: "Frontend & UI/UX Developer (Koordinator)",
  },
  {
    name: "Zikri Arribath Vadila",
    nim: "21120124130089",
    role: "Backend & API Engineer",
  },
  {
    name: "Faras Fauzan Attaqi",
    nim: "21120124140119",
    role: "IoT & MQTT Integration",
  },
  {
    name: "Hening Wijaya Imanda",
    nim: "21120124120036",
    role: "Database & System Analyst",
  },
];

export function ProfileScreen() {
  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Profile Card */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.profileHeaderCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="people-circle" size={80} color={color.primary} />
          </View>
          <Text style={styles.teamName}>KELOMPOK 25</Text>
          <Text style={styles.subTitle}>Praktikum Pemrograman Perangkat Bergerak</Text>
          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <Ionicons name="layers-outline" size={14} color={color.primary} />
              <Text style={styles.badgeText}>Modul 6 - React Native</Text>
            </View>
            <View style={[styles.badge, styles.badgeSuccess]}>
              <Ionicons name="checkmark-circle-outline" size={14} color={color.successText} />
              <Text style={[styles.badgeText, { color: color.successText }]}>Live IoT Active</Text>
            </View>
          </View>
        </Animated.View>

        {/* Section: Anggota Kelompok */}
        <Animated.View entering={FadeInDown.duration(450).delay(100)} style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="person-outline" size={20} color={color.primary} />
            <Text style={styles.sectionTitle}>Daftar Anggota Kelompok</Text>
          </View>

          {TEAM_MEMBERS.map((member, idx) => (
            <View
              key={idx}
              style={[
                styles.memberRow,
                idx === TEAM_MEMBERS.length - 1 && styles.lastMemberRow,
              ]}
            >
              <View style={styles.memberNumberBadge}>
                <Text style={styles.memberNumberText}>{idx + 1}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberNim}>NIM: {member.nim}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Section: Informasi Aplikasi & Stack */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="information-circle-outline" size={20} color={color.primary} />
            <Text style={styles.sectionTitle}>Spesifikasi Arsitektur Sistem</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="logo-react" size={18} color="#61DAFB" />
            <Text style={styles.specLabel}>Mobile Framework:</Text>
            <Text style={styles.specValue}>React Native (Expo SDK 58)</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="server-outline" size={18} color="#68A063" />
            <Text style={styles.specLabel}>Backend REST API:</Text>
            <Text style={styles.specValue}>Express.js (Node.js v25)</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="cylinder-outline" size={18} color="#00E599" />
            <Text style={styles.specLabel}>Database Serverless:</Text>
            <Text style={styles.specValue}>PostgreSQL (Neon Database)</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="wifi-outline" size={18} color="#FF6B4A" />
            <Text style={styles.specLabel}>Protokol Sensor:</Text>
            <Text style={styles.specValue}>MQTT (HiveMQ Cloud Broker)</Text>
          </View>
        </Animated.View>

        {/* Footer Note */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerText}>
            Departemen Teknik Komputer · Fakultas Teknik
          </Text>
          <Text style={styles.footerTextSub}>Universitas Diponegoro · 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.bg,
  },
  container: {
    padding: space.lg,
    paddingBottom: 40,
    gap: space.lg,
  },
  profileHeaderCard: {
    backgroundColor: color.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: color.border,
    padding: space.xl,
    alignItems: "center",
    boxShadow: shadow.card,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: color.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space.sm,
  },
  teamName: {
    fontSize: 22,
    fontWeight: "700",
    color: color.text,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 13,
    color: color.text2,
    marginTop: 4,
    textAlign: "center",
  },
  badgeWrap: {
    flexDirection: "row",
    gap: space.xs,
    marginTop: space.md,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: color.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  badgeSuccess: {
    backgroundColor: color.successBg,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: color.primary,
  },
  sectionCard: {
    backgroundColor: color.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: color.border,
    padding: space.lg,
    boxShadow: shadow.card,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    paddingBottom: space.sm,
    marginBottom: space.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: color.text,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    gap: space.md,
  },
  lastMemberRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  memberNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: color.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  memberNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: color.primary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: "600",
    color: color.text,
  },
  memberNim: {
    fontSize: 12,
    color: color.text2,
    marginTop: 2,
    fontFamily: "monospace",
  },
  memberRole: {
    fontSize: 12,
    color: color.primary,
    marginTop: 2,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingVertical: 8,
  },
  specLabel: {
    fontSize: 13,
    color: color.text2,
    width: 140,
  },
  specValue: {
    fontSize: 13,
    fontWeight: "600",
    color: color.text,
    flex: 1,
  },
  footerWrap: {
    alignItems: "center",
    marginTop: space.sm,
  },
  footerText: {
    fontSize: 12,
    color: color.text3,
  },
  footerTextSub: {
    fontSize: 11,
    color: color.text3,
    marginTop: 2,
  },
});
