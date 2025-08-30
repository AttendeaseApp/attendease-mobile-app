import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerImage={
        <View style={styles.headerBackground}>
          <View style={styles.headerContainer}>
            <View>
              {/* Label on top-left */}
              <Text style={styles.NameOfStudent}>Name</Text>
              {/* New label under Name */}
              <Text style={styles.UserSection}>Section</Text>
            </View>

            {/* Button on top-right */}
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => console.log('Header button pressed')}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      {/* Cards Wrapper */}
      <View style={styles.centerWrapper}>
        {/* First Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => console.log('First card pressed')}
        >
          <Text style={styles.cardTitle}>Card 1</Text>
          <Text style={styles.cardContent}>This is the first rectangular card.</Text>
        </TouchableOpacity>

        {/* Second Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => console.log('Second card pressed')}
        >
          <Text style={styles.cardTitle}>Card 2</Text>
          <Text style={styles.cardContent}>This is the second rectangular card.</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#27548A',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200, // extend header length
    paddingTop: 40,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -40, // adjust overlap
  },
  card: {
    width: '90%',     // wide rectangle
    height: 180,      // fixed height
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // for Android shadow
    marginBottom: 20, // space between cards
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  NameOfStudent: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  UserSection: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#00000050',
    borderRadius: 24,
  },
});
