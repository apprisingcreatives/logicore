import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

const mockAssignedTrips = [
  { id: '1', tracking: 'LC-2026-A3F7', origin: 'North Harbor, Manila', destination: 'Mandaue City, Cebu', cargo: 'Beverage Crates (1,420 kg)', status: 'In Transit' },
  { id: '2', tracking: 'LC-2026-B7K2', origin: 'Batangas Port', destination: 'Sasa Port, Davao', cargo: 'Food Supplies (12,500 kg)', status: 'Pending Pickup' },
];

export default function App() {
  const [gpsActive, setGpsActive] = useState(true);
  const [trips, setTrips] = useState(mockAssignedTrips);
  const [activeTab, setActiveTab] = useState<'trips' | 'pod' | 'profile'>('trips');

  const handleCapturePOD = (tracking: string) => {
    Alert.alert(
      'Digital POD Captured',
      `Geo-signature and photo proof of delivery saved for ${tracking}. Syncing to Logicore Cloud...`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>LC</Text>
          </View>
          <Text style={styles.headerTitle}>Logicore <Text style={{ color: '#00B8D9' }}>Driver</Text></Text>
        </View>
        <TouchableOpacity
          onPress={() => setGpsActive(!gpsActive)}
          style={[styles.gpsBadge, { backgroundColor: gpsActive ? 'rgba(0, 184, 217, 0.15)' : 'rgba(255, 86, 48, 0.15)' }]}
        >
          <View style={[styles.dot, { backgroundColor: gpsActive ? '#00B8D9' : '#FF5630' }]} />
          <Text style={[styles.gpsText, { color: gpsActive ? '#00B8D9' : '#FF5630' }]}>
            {gpsActive ? 'GPS Live' : 'GPS Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('trips')}
          style={[styles.tabItem, activeTab === 'trips' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'trips' && styles.tabTextActive]}>Assigned Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('pod')}
          style={[styles.tabItem, activeTab === 'pod' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'pod' && styles.tabTextActive]}>Digital POD</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content View */}
      <ScrollView style={styles.content}>
        {activeTab === 'trips' ? (
          <View style={{ gap: 12, paddingBottom: 24 }}>
            <Text style={styles.sectionTitle}>Active Inter-Island Assignments</Text>
            {trips.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.trackingText}>{item.tracking}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.routeBox}>
                  <Text style={styles.routeLabel}>Origin</Text>
                  <Text style={styles.routeValue}>{item.origin}</Text>
                  <Text style={[styles.routeLabel, { marginTop: 6 }]}>Destination</Text>
                  <Text style={styles.routeValue}>→ {item.destination}</Text>
                </View>

                <Text style={styles.cargoText}>Cargo: {item.cargo}</Text>

                <TouchableOpacity
                  onPress={() => handleCapturePOD(item.tracking)}
                  style={styles.podButton}
                >
                  <Text style={styles.podButtonText}>📷 Capture Proof of Delivery</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.podView}>
            <Text style={styles.sectionTitle}>Geo-Stamped Signature & Photo Capture</Text>
            <View style={styles.cameraPlaceholder}>
              <Text style={{ color: '#8993A4', fontSize: 14 }}>[ Camera Viewport Placeholder ]</Text>
              <Text style={{ color: '#00B8D9', fontSize: 12, marginTop: 8 }}>Lat: 14.5995° N, Lng: 120.9842° E</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleCapturePOD('LC-2026-A3F7')}
              style={styles.podButton}
            >
              <Text style={styles.podButtonText}>Confirm Delivery & Sign</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2540',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#234B73',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0052CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerTitle: {
    color: '#F4F5F7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gpsText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#234B73',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#00B8D9',
  },
  tabText: {
    color: '#8993A4',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#00B8D9',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    color: '#F4F5F7',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#102A45',
    borderWidth: 1,
    borderColor: '#234B73',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingText: {
    color: '#00B8D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: 'rgba(0, 184, 217, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: '#00B8D9',
    fontSize: 12,
    fontWeight: 'bold',
  },
  routeBox: {
    backgroundColor: '#173654',
    padding: 10,
    borderRadius: 8,
  },
  routeLabel: {
    color: '#8993A4',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  routeValue: {
    color: '#F4F5F7',
    fontSize: 13,
    fontWeight: '600',
  },
  cargoText: {
    color: '#C1C7D0',
    fontSize: 12,
  },
  podButton: {
    backgroundColor: '#0052CC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  podButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  podView: {
    gap: 16,
  },
  cameraPlaceholder: {
    height: 220,
    backgroundColor: '#102A45',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#234B73',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
