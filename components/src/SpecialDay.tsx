import React from 'react';
import { View, Text, SectionList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

const specialDays = [
    {
        title: 'Jan 2024',
        data: [
            { id: '1', name: 'New Year', date: 'Mon, 1 Jan, 2024', image: require("../../assets/images/New Year.jpg") },
            { id: '2', name: 'Republic Day', date: 'Fri, 26 Jan, 2024', image: require("../../assets/images/Republic Day.jpg") },
        ],
    },
    {
        title: 'Oct 2024',
        data: [
            { id: '3', name: 'Gandhi Jayanti', date: 'Wed, 2 Oct, 2024', image: require("../../assets/images/Gandhi Jayanti.png") },
        ],
    },

];
export default function SpecialDaysPage() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const handlePress = (item: any) => {
        navigation.navigate('SpecialDaysGallery', { name: item.name, image: item.image, date: item.date });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Special Days Library</Text>
            </View>
            <SectionList
                sections={specialDays}
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
        backgroundColor: '#FFA500',
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
