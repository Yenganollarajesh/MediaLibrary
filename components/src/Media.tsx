import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const festivals = [
  { id: '1', name: 'Krishna Janmashtami', image: require("../../assets/images/Krishna.jpg") },
  { id: '2', name: 'Ganesh Chaturthi', image: require("../../assets/images/Ganesh Chaturthi.png") },
  { id: '3', name: 'Onam', image: require("../../assets/images/Onam.png") },
];

const specialDays = [
  { id: '1', name: "Engineer's Day", image: require("../../assets/images/Engineer's Day.png") },
  { id: '2', name: 'Gandhi Jayanti', image: require("../../assets/images/Gandhi Jayanti.png") },
  { id: '3', name: 'Maharaja Agrasen Jayanti', image: require("../../assets/images/Maharaja Agrasen Jayanti.jpg") },
];

export default function Media() {
  const navigation = useNavigation();

  const handleSpecialDays = () => {
    navigation.navigate('SpecialDaysPage' as never);
  };

  const handleFestivals = () => {
    navigation.navigate('FestivalsPage' as never);
  };

  return (
    <View>
      <View style={{ backgroundColor: "#FF0404", marginBottom: 40, alignItems: 'center' }}>
        <Text style={styles.header}>Media Library</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleFestivals} style={styles.imageCard}>
          <Image source={require("../../assets/images/146823089.jpg")} style={styles.image1} />
          <Text>Festivals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSpecialDays} style={styles.imageCard}>
          <Image source={require("../../assets/images/images.jpg")} style={styles.image1} />
          <Text>Special Days</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Festivals</Text>
        <View style={styles.section}>
          <FlatList
            horizontal
            data={festivals}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleFestivals} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity onPress={handleFestivals}>
            <View style={styles.viewMoreButton}>
              <Entypo name="chevron-right" size={20} color="white" />
            </View>
            <Text style={styles.viewMoreText}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Special Days</Text>
        <View style={styles.section}>
          <FlatList
            horizontal
            data={specialDays}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleSpecialDays} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity onPress={handleSpecialDays}>
            <View style={styles.viewMoreButton}>
              <Entypo name="chevron-right" size={20} color="white" />
            </View>
            <Text style={styles.viewMoreText}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: "#FFFFFF"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    alignItems: "center"
  },
  imageCard: {
    alignItems: "center"
  },
  container: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 10
  },
  item: {
    alignItems: 'center',
    marginLeft: 15,
  },
  image1: {
    width: 120,
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 5,
  },
  itemText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 10,
    width: 60
  },
  viewMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b22222',
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  viewMoreText: {
    fontSize: 12
  },
});
