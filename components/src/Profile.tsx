
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, ScrollView, Switch,BackHandler } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ProfileScreen() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [menuAnimation] = useState(new Animated.Value(-250));
    const [showTerms, setShowTerms] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get('https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=11120', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data.data);
                } else {
                    console.error("No token found");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!userData) {
        return <Text>Error loading user data</Text>;
    }

    const toggleMenu = () => {
        const toValue = isMenuOpen ? -250 : 0;
        setIsMenuOpen(!isMenuOpen);
        Animated.timing(menuAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const toggleTerms = () => {
        setShowTerms(!showTerms);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('LoginScreen' as never);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const navigateToMediaLibrary = () => {
        navigation.navigate('Media' as never);
        const toValue = isMenuOpen ? -250 : 0;
        setIsMenuOpen(!isMenuOpen);
        Animated.timing(menuAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
                    <Entypo name="menu" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="notifications-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>


            <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuAnimation }] }]}>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.icon1} onPress={toggleMenu}>
                        <Entypo name="chevron-left" size={30} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Welcome <Text style={{ color: "#990202" }}>{userData.name}</Text></Text>
                    <TouchableOpacity onPress={navigateToMediaLibrary}>
                        <Text style={styles.menuItem}>Media Libraries</Text>
                    </TouchableOpacity>
                    <View style={styles.menuItemContainer}>
                        <Text style={styles.menuItem}>Securities</Text>
                        <TouchableOpacity onPress={toggleTerms} style={{ marginBottom: 10 }}>
                            <Entypo name={showTerms ? "chevron-small-up" : "chevron-small-down"} size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    {showTerms && (
                        <View style={styles.termsContainer}>
                            <TouchableOpacity><Text style={styles.termsText}>Terms and conditions</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.termsText}>Privacy Policy</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.termsText}>Return and Refund</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.termsText}>Cancellation Policies</Text></TouchableOpacity>
                        </View>
                    )}
                    <Text style={styles.menuItem}>Upgrade Plane</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.menuItem}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={styles.menuItem}>Version</Text>
                </View>
            </Animated.View>


            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileInfoContainer}>
                    <Image source={{ uri: userData.img }} style={styles.profileImage} />
                    <View style={{ backgroundColor: "#D9D9D9", width: "85%", borderRadius: 10, padding: 10, justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Image source={require("../../assets/images/Frame.png")} style={{ height: 22, width: 20 }} />
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>1 New Lead</Text>
                                <Text><Text style={styles.info}>Name:</Text> {userData.name}</Text>
                                <Text><Text style={styles.info}>Phone:</Text> {userData.mobile_no}</Text>
                                <Text><Text style={styles.info}>Email:</Text> {userData.email_optional}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image source={require("../../assets/images/Frame (1).png")} style={{ height: 32, width: 100, borderRadius: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "85%", marginTop: 10 }}>

                        <TouchableOpacity style={{ alignItems: "flex-end" }}>
                            <Text>View All <Entypo name="chevron-right" size={20} color="black" /> </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TouchableOpacity style={{ backgroundColor: "red", width: "48%", alignItems: "center", paddingVertical: 12, borderRadius: 10 }}>
                                <Text style={{ color: "white" }}>Assigned Ladies</Text>
                                <Text style={{ color: "white" }}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "red", width: "48%", alignItems: "center", paddingVertical: 12, borderRadius: 10 }}>
                                <Text style={{ color: "white" }}>Today Ladies</Text>
                                <Text style={{ color: "white" }}>0</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "85%", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (2).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text>Business Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Group.png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text>Plans</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (3).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text>Accounts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (4).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text>Leads</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (5).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text>Contact Us</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (6).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text style={{ textAlign: 'center' }}>Manage Specification</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/images/Frame (7).png")} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                <Text >FAQ</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ width: "85%", marginTop: 10 }}>
                        <Image source={require("../../assets/images/image 126.png")} />
                    </View>
                    <View style={styles.toggleContainer}>
                        <Text style={styles.toggleLabel}>Total Updates</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={styles.toggleLabel}>Total Leads</Text>
                    </View >

                    <View style={styles.navContainer}>
                        <TouchableOpacity style={styles.navItem}>
                            <Entypo name="arrow-with-circle-up" size={20} color="#FF0404" />
                            <Text style={styles.navText}>Upgrade Plan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.centerButton}>
                            <Icon1 name="dot-circle-o" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Icon1 name="comment-o" size={20} color="#ff0000" />
                            <Text style={styles.navText}>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <FontAwesome6 name="file-export" size={20} color="#FF0404" />
                            <Text style={styles.navText}>Log out</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
        zIndex: 2,
    },
    scrollContainer: {
        paddingBottom: 50,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        padding: 10,
    },
    icon1: {
        alignItems: "flex-end",
        marginTop: 10
    },
    profileInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        fontWeight: "bold"
    },
    menuContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        bottom: 0,
        width: 250,
        backgroundColor: '#fff',
        elevation: 5,
        zIndex: 1,
    },
    menu: {
        padding: 20,
    },
    menuTitle: {
        fontSize: 16,
        marginBottom: 20,
        marginTop: 20,
        fontWeight: "bold",
        color: "#FF0404"
    },
    menuItem: {
        fontSize: 14,
        marginBottom: 15,
        fontWeight: "bold"
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsContainer: {
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    termsText: {
        fontSize: 12,
        color: '#555',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    toggleLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: 15,
        borderRadius: 20,
        marginHorizontal: 20,
        width: "80%",
        paddingLeft: 40
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#333',
        marginTop: 5,
    },
    centerButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
});





