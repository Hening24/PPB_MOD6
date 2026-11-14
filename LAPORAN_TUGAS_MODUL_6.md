# LAPORAN PENGERJAAN TUGAS MODUL 6
## PEMROGRAMAN PERANGKAT BERGERAK: REACT NATIVE

**Dosen Pengampu / Tim Asisten:** Laboratorium Jaringan & Komputer  
**Judul Modul:** BAB VII – React Native, Expo, RESTful API, MQTT, & Neon Database  
**Kelompok:** Kelompok 25  

**Identitas Anggota Kelompok:**
1. **Aufan Damays Marsuki** (NIM: 21120124140163) — *Frontend & UI/UX Developer (Koordinator)*
2. **Zikri Arribath Vadila** (NIM: 21120124130089) — *Backend & API Engineer*
3. **Faras Fauzan Attaqi** (NIM: 21120124140119) — *IoT & MQTT Integration*
4. **Hening Wijaya Imanda** (NIM: 21120124120036) — *Database & System Analyst*

---

## 7.6.1 Splash Screen

### A. Deskripsi Fitur
Pada tugas ini, dibuat komponen **Splash Screen kustom** yang ditampilkan secara penuh (*full-screen immersive*) saat aplikasi pertama kali dibuka di perangkat. Splash screen ini menampilkan:
- Animasi pembuka masuk berupa pembesaran pegas (*spring zoom-in*) dan pemudaran bertahap (*fade-in*).
- Ikon termometer berdenyut (*pulsing loop animation*) dengan efek bayangan menyala (*glow elevation*).
- Judul aplikasi **LiveTemp** dan subjudul **Real-Time IoT Temperature Monitoring**.
- Badge resmi **KELOMPOK 25**.
- Kotak informasi nama dan NIM seluruh anggota kelompok sebagai bukti otentik identitas pengerjaan tugas.
- Transisi keluar (*fade-out*) secara halus setelah 3,2 detik, kemudian langsung menampilkan antarmuka utama aplikasi.

---

### B. Source Code yang Ditambahkan

#### 1. File Komponen: `app/src/components/SplashScreen.js`
```javascript
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export function CustomSplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Animasi Masuk: Fade-in dan Spring Zoom-in
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

    // 2. Animasi Denyut Ikon (Pulsing Loop)
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

    // 3. Waktu Tayang 3.2 detik lalu transisi keluar (Fade-out)
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

      {/* Bagian Atas: Label Modul */}
      <View style={styles.topHeader}>
        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>PRAKTIKUM PBB · MODUL 6</Text>
        </View>
      </View>

      {/* Bagian Tengah: Ikon, Judul, Badge, & Daftar Anggota */}
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

        <View style={styles.membersBox}>
          <Text style={styles.membersBoxTitle}>ANGGOTA TIM:</Text>
          <Text style={styles.memberText}>• Aufan Damays Marsuki (21120124140163)</Text>
          <Text style={styles.memberText}>• Zikri Arribath Vadila (21120124130089)</Text>
          <Text style={styles.memberText}>• Faras Fauzan Attaqi (21120124140119)</Text>
          <Text style={styles.memberText}>• Hening Wijaya Imanda (21120124120036)</Text>
        </View>
      </Animated.View>

      {/* Bagian Bawah: Footer Institusi */}
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
    backgroundColor: "#0B132B",
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
```

#### 2. Integrasi pada Root Aplikasi: `app/App.js`
```javascript
import { useState } from "react";
import { CustomSplashScreen } from "./src/components/SplashScreen.js";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer theme={theme}>
          {/* Bottom Tab Navigator */}
        </NavigationContainer>

        {showSplash ? (
          <CustomSplashScreen onFinish={() => setShowSplash(false)} />
        ) : null}
      </View>
    </SafeAreaProvider>
  );
}
```

---

### C. Gambar Hasil Akhir Program
```text
+-------------------------------------------------------------+
|                                                             |
|           [TEMPELKAN SCREENSHOT HASIL TUGAS 7.6.1]          |
|                                                             |
|   (Foto tampilan layar Splash Screen di HP saat pertama     |
|    kali dibuka yang memuat Logo Termometer, LiveTemp,       |
|    Badge KELOMPOK 25, dan Daftar Nama/NIM Anggota)          |
|                                                             |
+-------------------------------------------------------------+
Gambar 1. Tampilan Splash Screen Custom Aplikasi LiveTemp
```

---

### D. Analisis Teknis
1. **Penggunaan Native Driver:** Animasi dikonfigurasi dengan properti `useNativeDriver: true`. Properti ini menginstruksikan runtime React Native untuk mengirimkan seluruh definisi hierarki animasi langsung ke thread antarmuka native (Android RenderThread) sebelum animasi dimulai. Dampaknya, proses komputasi frame tidak terbebani oleh thread JavaScript, sehingga animasi tetap berjalan konstan pada kecepatan 60 FPS tanpa terjadi *frame drops* (patah-patah).
2. **Pengelolaan State & Siklus Hidup Komponen:** Komponen splash dikendalikan oleh boolean state `showSplash` yang diinisialisasi dengan nilai `true`. Ketika durasi penayangan (3.200 ms) berakhir, fungsi `onFinish()` dieksekusi melalui callback penyelesaian `Animated.timing`, mengubah `showSplash` menjadi `false`. Melalui mekanisme *conditional rendering*, komponen splash otomatis di-*unmount* dari memori perangkat sehingga sumber daya sistem langsung dialokasikan penuh untuk halaman operasional utama.
3. **Immersive Full-Screen Layout:** Dengan memanfaatkan `StyleSheet.absoluteFillObject` dan `zIndex: 99999` yang dipadukan dengan konfigurasi `StatusBar translucent`, splash screen merender visual di seluruh dimensi layar perangkat tanpa terpotong oleh bilah status (*status bar*) maupun navigasi bawah (*tab bar*).

---
---

## 7.6.2 Fitur Pagination

### A. Deskripsi Fitur
Pada halaman Monitoring, data riwayat batas suhu alarm (*Triggered Alarm History*) diambil dari backend dan database Neon PostgreSQL. Agar tabel tidak memanjang ke bawah secara berlebihan saat data bertambah banyak, diimplementasikan **fitur pagination interaktif**:
- Data riwayat dibagi menjadi beberapa halaman dengan ukuran default **5 baris per halaman** (`PAGE_SIZE = 5`).
- Dilengkapi tombol navigasi **"Sebelumnya"** (*Previous*) dan **"Berikutnya"** (*Next*).
- Indikator status halaman aktif (`Halaman X / Y`) dan jumlah data yang sedang ditampilkan (`Menampilkan A - B dari C data`).
- Proteksi tombol *disabled* otomatis saat pengguna berada di halaman pertama atau halaman terakhir.

---

### B. Source Code yang Ditambahkan
Potongan modifikasi pada file: `app/src/screens/MonitoringScreen.js`

```javascript
// 1. Deklarasi State dan Kalkulasi Pagination
const [currentPage, setCurrentPage] = useState(1);
const PAGE_SIZE = 5;
const totalPages = Math.max(1, Math.ceil((readings?.length || 0) / PAGE_SIZE));

// 2. Pemotongan Data (Data Slicing) Menggunakan Hook useMemo
const paginatedReadings = useMemo(() => {
  const start = (currentPage - 1) * PAGE_SIZE;
  return (readings ?? []).slice(start, start + PAGE_SIZE);
}, [readings, currentPage]);

// 3. Fungsi Navigasi Halaman
const handlePrevPage = () => {
  setCurrentPage((prev) => Math.max(1, prev - 1));
};

const handleNextPage = () => {
  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
};
```

Rendering antarmuka tabel dan kontrol navigasi pada JSX:
```jsx
{/* DataTable menerima data yang sudah dipotong per halaman */}
<DataTable
  columns={columns}
  data={paginatedReadings}
  keyExtractor={(item) => item.id}
  loading={loading && !refreshing}
  emptyTitle="No readings yet"
  emptyMessage="Triggered readings appear here. Pull to refresh."
  emptyActionLabel="Refresh"
  onEmptyAction={fetchReadings}
/>

{/* Kontrol Navigasi Tombol Pagination */}
{Array.isArray(readings) && readings.length > 0 ? (
  <View style={styles.paginationCard}>
    <Text style={styles.paginationInfoText}>
      Menampilkan {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
      {Math.min(currentPage * PAGE_SIZE, readings.length)} dari{" "}
      {readings.length} data
    </Text>

    <View style={styles.paginationButtonsRow}>
      <Pressable
        onPress={handlePrevPage}
        disabled={currentPage === 1}
        style={({ pressed }) => [
          styles.pageBtn,
          currentPage === 1 && styles.pageBtnDisabled,
          pressed && currentPage !== 1 && styles.pressed,
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={16}
          color={currentPage === 1 ? color.text3 : color.primary}
        />
        <Text
          style={[
            styles.pageBtnText,
            currentPage === 1 && styles.pageBtnTextDisabled,
          ]}
        >
          Sebelumnya
        </Text>
      </Pressable>

      <View style={styles.pageBadge}>
        <Text style={styles.pageBadgeText}>
          {currentPage} / {totalPages}
        </Text>
      </View>

      <Pressable
        onPress={handleNextPage}
        disabled={currentPage >= totalPages}
        style={({ pressed }) => [
          styles.pageBtn,
          currentPage >= totalPages && styles.pageBtnDisabled,
          pressed && currentPage < totalPages && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.pageBtnText,
            currentPage >= totalPages && styles.pageBtnTextDisabled,
          ]}
        >
          Berikutnya
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={currentPage >= totalPages ? color.text3 : color.primary}
        />
      </Pressable>
    </View>
  </View>
) : null}
```

---

### C. Gambar Hasil Akhir Program
```text
+-------------------------------------------------------------+
|                                                             |
|           [TEMPELKAN SCREENSHOT HASIL TUGAS 7.6.2]          |
|                                                             |
|   (Foto bagian bawah tabel Triggered Alarm History di tab   |
|    Monitoring yang memperlihatkan tombol 'Sebelumnya',      |
|    badge '1 / 5', tombol 'Berikutnya', dan data 5 baris)    |
|                                                             |
+-------------------------------------------------------------+
Gambar 2. Tampilan Fitur Pagination pada Tabel Riwayat Alarm
```

---

### D. Analisis Teknis
1. **Optimasi Komputasi dengan `useMemo`:** Pemotongan data dilakukan menggunakan `Array.prototype.slice(start, end)`. Dengan membungkus proses ini di dalam hook `useMemo` yang memiliki *dependency array* `[readings, currentPage]`, komputasi pemotongan array hanya akan dieksekusi ulang saat terjadi mutasi data dari server atau perpindahan halaman oleh pengguna. Hal ini meminimalisir overhead kalkulasi JavaScript saat komponen merender ulang elemen lain seperti grafik suhu.
2. **Penanganan Batas Defensif (*Boundary Handling*):** Fungsi transisi halaman menggunakan operasi matematika `Math.max(1, prev - 1)` dan `Math.min(totalPages, prev + 1)`. Hal ini menjamin bahwa nilai indeks halaman tidak akan pernah keluar dari rentang batas bawah ($1$) maupun batas atas ($totalPages$), mencegah error tampilan data kosong (*out-of-bounds error*).
3. **Peningkatan Aksesibilitas & Umpan Balik Visual:** Properti `disabled` pada komponen `Pressable` secara otomatis menonaktifkan interaksi klik saat kondisi batas tercapai, yang dipertegas oleh perubahan visual berupa penurunan opasitas (*disabled opacity*) dan perubahan warna teks tombol menjadi abu-abu pudar.

---
---

## 7.6.3 Halaman Profil

### A. Deskripsi Fitur
Menambahkan sebuah layar baru **Profile Screen** yang didaftarkan ke dalam sistem navigasi tab bawah (*Bottom Tab Navigator*). Halaman ini dirancang secara terstruktur dan informatif, memuat:
- Kartu Identitas Utama: Ikon avatar tim, judul **KELOMPOK 25**, serta badge status koneksi IoT aktif.
- Kartu Daftar Anggota: Informasi mendalam tiap mahasiswa mencakup Nama Lengkap, Nomor Induk Mahasiswa (NIM), serta peran spesifik dalam pengembangan proyek.
- Kartu Spesifikasi Arsitektur Sistem: Ringkasan stack teknologi yang berhasil diintegrasikan (React Native Expo, Express.js REST API, PostgreSQL Serverless Neon DB, dan HiveMQ Cloud MQTT Broker).
- Footer Departemen Teknik Komputer, Fakultas Teknik, Universitas Diponegoro.

---

### B. Source Code yang Ditambahkan

#### 1. File Layar Baru: `app/src/screens/ProfileScreen.js`
```javascript
import { Text, View, StyleSheet, ScrollView } from "react-native";
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
        {/* Header Profil Kelompok */}
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

        {/* Daftar Anggota Tim */}
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

        {/* Spesifikasi Arsitektur Sistem */}
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

        {/* Footer Institusi */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerText}>Departemen Teknik Komputer · Fakultas Teknik</Text>
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
```

#### 2. Registrasi Rute Tab pada: `app/App.js`
```javascript
import { ProfileScreen } from "./src/screens/ProfileScreen.js";

// ...
<Tab.Navigator
  screenOptions={({ route }) => ({
    // ...
    tabBarIcon: ({ color: iconColor }) => {
      let iconName = "pulse";
      if (route.name === "Control") iconName = "options";
      if (route.name === "Profile") iconName = "people";
      return <Ionicons name={iconName} size={24} color={iconColor} />;
    },
  })}
>
  <Tab.Screen name="Monitoring" component={MonitoringScreen} />
  <Tab.Screen name="Control" component={ControlScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

---

### C. Gambar Hasil Akhir Program
```text
+-------------------------------------------------------------+
|                                                             |
|           [TEMPELKAN SCREENSHOT HASIL TUGAS 7.6.3]          |
|                                                             |
|   (Foto tampilan layar tab Profile di HP yang memuat kartu  |
|    KELOMPOK 25, daftar nama 4 anggota dengan NIM,           |
|    serta kartu arsitektur sistem React Native/Neon/MQTT)     |
|                                                             |
+-------------------------------------------------------------+
Gambar 3. Tampilan Halaman Profil Kelompok 25
```

---

### D. Analisis Teknis
1. **Pemanfaatan React Navigation Tab Architecture:** Penambahan rute `Profile` dilakukan secara deklaratif di dalam komponen `<Tab.Navigator>`. Mekanisme ini mengisolasi state masing-masing layar sehingga perpindahan antar tab berjalan instan tanpa perlu memuat ulang (*re-fetching*) state sensor pada layar Monitoring.
2. **Arsitektur Antarmuka Modular & Token-Based Styling:** Penerapan sistem *Design Tokens* dari file `tokens.js` (seperti `tokens.color`, `tokens.space`, dan `tokens.radius`) memastikan keseragaman visual (*visual consistency*) antara layar Profil dengan layar Monitoring dan Control. Penggunaan unit skalar fleksibel dan `ScrollView` memungkinkan tampilan menyesuaikan secara proporsional di berbagai ukuran layar smartphone.

---
---

## 7.6.4 UI Animation

### A. Deskripsi Fitur
Pada tugas animasi UI, dilakukan modifikasi menyeluruh terhadap komponen grafis bola 3D (*Sphere Orb*) pada halaman utama Monitoring:
1. **Bentuk Partikel Bujur Sangkar (Square):** Mengubah bentuk primitif titik-titik pembentuk bola dari lingkaran bulat (`canvas.drawCircle`) menjadi **persegi/kotak tajam** (`canvas.drawRect`).
2. **Skema Warna Cyber Multi-Tone:** Mengubah partikel bola yang sebelumnya monokrom statis menjadi skema warna futuristik bertingkat, mengombinasikan warna aksen cyan cerah (`#38BDF8`), purple neon glow (`#A855F7`), serta warna suhu dinamis (`tint`).
3. **Peningkatan Dinamika Rotasi Tiga Dimensi:** Mengakselerasi kecepatan putaran bola (`BASE_SPEED` dinaikkan dari `0.15` menjadi `0.28`) dan sudut kemiringan orbit 3D (`TILT = 0.40`), sehingga perputaran bola terlihat lebih hidup, cepat, dan ekspresif.

---

### B. Source Code yang Ditambahkan / Dimodifikasi
File: `app/src/components/TempOrb.js`

```javascript
// Baris 30-32: Peningkatan Kecepatan Rotasi dan Sudut Kemiringan Bola 3D
const BASE_SPEED = 0.28;
const TILT = 0.40;
const TEX = 32;

// Baris 100-111: Pengubahan Geometri Partikel Menjadi Persegi (Square)
const dotPicture = useMemo(() => {
  try {
    const recorder = Skia.PictureRecorder();
    const canvas = recorder.beginRecording(rect(0, 0, TEX, TEX));
    const paint = Skia.Paint();
    paint.setAntiAlias(false); // Mematikan anti-alias agar sudut persegi tajam
    paint.setColor(Skia.Color("white"));
    
    // Perubahan Bentuk: Menggambar persegi 32x32 menggunakan drawRect
    canvas.drawRect(rect(0, 0, TEX, TEX), paint);
    
    return recorder.finishRecordingAsPicture();
  } catch {
    return null;
  }
}, []);

// Baris 200-210: Skema Pewarnaan Partikel Cyber Multi-Tone
const colors = useMemo(() => {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    if (dimmed) return tint;
    if (i % 3 === 0) return "#38BDF8"; // Aksen neon cyan
    if (i % 5 === 0) return "#A855F7"; // Aksen neon purple
    return tint; // Warna suhu dasar (hijau saat normal / merah saat over limit)
  });
}, [tint, dimmed]);
```

---

### C. Gambar Hasil Akhir Program
```text
+-------------------------------------------------------------+
|                                                             |
|           [TEMPELKAN SCREENSHOT HASIL TUGAS 7.6.4]          |
|                                                             |
|   (Foto bagian tengah tab Monitoring yang memperlihatkan    |
|    bola 3D berputar dengan titik-titik partikel berbentuk   |
|    kotak/square dan warna neon cyan-purple yang dinamis)    |
|                                                             |
+-------------------------------------------------------------+
Gambar 4. Tampilan Animasi Bola 3D Partikel Kotak (Square) Cyber
```

---

### D. Analisis Teknis
1. **GPU-Accelerated Rendering Menggunakan React Native Skia:** Komponen bola 3D memanfaatkan pustaka grafis level rendah *React Native Skia*. Objek partikel diinisialisasi melalui `Skia.PictureRecorder` dan diproyeksikan menggunakan matriks *Fibonacci Sphere* ke dalam `Atlas`. Perintah `canvas.drawRect(rect(0, 0, TEX, TEX), paint)` menginstruksikan kartu grafis (GPU) untuk menggambar tekstur *quad* persegi berukuran 32×32 pixel. Pengaturan `paint.setAntiAlias(false)` mencegah interpolasi tepi kuadratik, menghasilkan partikel kubus tajam khas estetika *cyberpunk / voxel*.
2. **Worklet Frame Animation:** Logika perputaran bola dihitung per interval frame waktu ($\Delta t$) di dalam hook `useFrameCallback` yang berjalan terisolasi pada UI worklet thread. Peningkatan konstanta `BASE_SPEED` menjadi `0.28` melipatgandakan kecepatan inkrementasi sudut `angleY.value` tanpa menyebabkan beban komputasi tambahan pada JavaScript thread.
3. **Modulasi Warna Dinamis pada Skia Atlas:** Komponen menggunakan properti `colorBlendMode="modulate"`. Array `colors` yang memetakan warna berbeda untuk indeks partikel tertentu dimodulasikan secara instan ke dalam texture atlas, menciptakan efek gradasi multidimensi yang bergerak dinamis saat bola berputar pada poros $Y$ dan $Z$.

---
---

## 7.6.5 Lampiran Tautan

1. **Link Repository GitHub:**  
   `https://github.com/gavrilasa/PPB-Modul6`  
   *(Atau masukkan tautan URL repository fork kelompok Anda)*

2. **Link Video Demo Singkat Aplikasi:**  
   `[Tempelkan Tautan / Link Google Drive atau YouTube Video Demo Aplikasi Anda di Sini]`
