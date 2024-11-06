import React from 'react';
import { View, Text, SectionList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

const events = [
  {
    title: 'Oct 2024',
    data: [
      { id: '1', name: 'Durga Astami', date: 'Fri, 11 Oct, 2024', image: require("../../assets/images/Durga Astami.jpg") },
      { id: '2', name: 'Dussera', date: 'Sat, 12 Oct, 2024', image: require("../../assets/images/146823089.jpg") },
      { id: '3', name: 'Dhanteras', date: 'Tue, 29 Oct, 2024', image: require("../../assets/images/Dhanteras.jpg") },
      { id: '4', name: 'Naraka Chaturdashi', date: 'Thu, 31 Oct, 2024', image: require("../../assets/images/Naraka Chaturdashi.jpg") },
    ],
  },
  {
    title: 'Nov 2024',
    data: [
      { id: '5', name: 'Diwali', date: 'Thu, 31 Oct, 2024', image: require("../../assets/images/Onam.png") },
      { id: '6', name: 'Bhaiya Dooj', date: 'Sun, 3 Nov, 2024', image: require("../../assets/images/Bhaiya Dooj2.jpg") },
      { id: '7', name: 'Diwali', date: 'Thu, 31 Oct, 2024', image: require("../../assets/images/Onam.png") },
    ],
  },
];

export default function FestivalsPage() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const handlePress = (item: any) => {
    navigation.navigate('Mediagallery', { name: item.name, image: item.image, date: item.date });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Festivals</Text>
      </View>
      <SectionList
        sections={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FF0404",
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 45,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  eventDate: {
    fontSize: 12,
    color: '#333',
  },
});
