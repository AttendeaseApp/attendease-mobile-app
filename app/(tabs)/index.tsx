import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
        headerImage={
          <View style={styles.headerBackground}>
            <View style={styles.headerContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                
                {/* Profile icon */}
                <TouchableOpacity
                  style={styles.profileIconButton}
                  onPress={() => console.log('Go to profile')} >
                  <MaterialIcons name="person" size={28} color="#fff" />
                </TouchableOpacity>

                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.NameOfStudent}>Name</Text>
                  <Text style={styles.UserSection}>Section</Text>
                </View>
              </View>

                {/* NOTIF BUTTON */}
              <TouchableOpacity
                style={styles.NOTIFButton}
                    onPress={() => console.log('Header button pressed')}>     
                  <MaterialIcons name="notifications" size={28} color="#060606ff" />
                   </TouchableOpacity>
                  </View>

            <Text style={styles.TODAYLabel}>TODAY</Text>
          </View>
        }
      >
        <View style={styles.centerWrapper}>

          {/* MAIN (EVENT) Card */}
          <TouchableOpacity
            style={styles.card1}
            activeOpacity={0.8}
            onPress={() => console.log('MAIN card pressed')}
          >
            {/* IMAGEBOX IN MAIN EVENT */}
            <View style={styles.imageBox}></View>
            <View style={styles.card1TextContainer}>

              <Text style={styles.card1Title}>Event Name</Text>
              <Text style={styles.card1Content}>Event details.</Text>
              {/* ATTEND BUTTON*/}
              <TouchableOpacity
                style={styles.card1Button}
                onPress={() => console.log('ATTEND button pressed')}>
                <Text style={styles.card1ButtonText}>Attend</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Second Card */}
          <TouchableOpacity
            style={styles.card2}
            activeOpacity={0.8}
            onPress={() => console.log('Second card pressed')}
          >
            <Text style={styles.cardTitle}>Card 2</Text>
            <Text style={styles.cardContent}>This is the second rectangular card.</Text>
          </TouchableOpacity>

          {/* Third Card */}
          <TouchableOpacity
            style={styles.card3}
            activeOpacity={0.8}
            onPress={() => console.log('Third card pressed')}
          >
            <Text style={styles.cardTitle}>Card 3</Text>
            <Text style={styles.cardContent}>This is the third rectangular card.</Text>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#27548A',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200,
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
    marginTop: -40,
  },

  //TOP PART (HEADER) WITH NAME AND SECTION AND NOTIF BUTTON
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
  NOTIFButton: {
    padding: 8,
    backgroundColor: '#fff9f9ff',
    borderRadius: 20,
  },

  TODAYLabel: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  profileIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000030', // optional semi-transparent background
  },

  //MAIN EVENT CARD
  card1: {
    width: '120%',
    height: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
    paddingTop: 12,
  },

  // MAIN EVENT Card 1 button STYLE AND TEXT STYLES
  card1Button: {
    width: '100%', 
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#27548A',
    borderRadius: 30,
    alignItems: 'center',
  },
  card1ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  imageBox: {
    width: '90%',
    height: 170,
    backgroundColor: '#d9d9d9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1TextContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  card1Title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  card1Content: {
    fontSize: 16,
    color: '#444',
    marginTop: 4,
  },

  // Card 2 & 3 STYLES AND TEXT STYLES
  card2: {
    width: '105%',
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  card3: {
    width: '105%',
    height: 100,
    backgroundColor: '#e8f0fe',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'left',
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginTop: 4,
  },
});
