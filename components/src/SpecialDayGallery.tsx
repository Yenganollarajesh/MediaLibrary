import React from 'react';
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const specialDaysData = [
    { name: 'New Year', image: require("../../assets/images/New Year.jpg") },
    { name: 'Republic Day', image: require("../../assets/images/Republic Day.jpg") },
    { name: 'Gandhi Jayanti', image: require("../../assets/images/Gandhi Jayanti.png") },
];

type SpecialDayDetailRouteParams = {
    name: string;
    image: any;
    date: any;
};

export default function SpecialDaysGallery() {
    const route = useRoute<RouteProp<{ params: SpecialDayDetailRouteParams }, 'params'>>();
    const { name, image, date } = route.params;


    const relatedImages = specialDaysData.filter(item => item.name === name);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#FF0404", marginBottom: 40, alignItems: 'center' }}>
                <Text style={styles.header}>Special Days Gallery</Text>
            </View>

            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <Image source={image} style={styles.images} />
                <View>
                    <Text>{name}</Text>
                    <Text>{date}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Icon name="heart" size={24} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Icon name="download" size={24} color="#000000" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={relatedImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.relatedImage} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        color: "#FFFFFF",
    },
    images: {
        width: 80,
        height: 80,
        borderRadius: 45,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    button: {
        marginHorizontal: 10,
    },
    imageContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    relatedImage: {
        width: 350,
        height: 350,
        borderRadius: 10,
        margin: 5,
    },
});
