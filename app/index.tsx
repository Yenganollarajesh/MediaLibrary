import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../components/src/LoginScreen"
import Profile from "../components/src/Profile"
import Media from "../components/src/Media"
import FestivalsPage from "../components/src/FestivalsPage"
import Mediagallery from "../components/src/Mediagallery"
import SpecialDaysPage from "../components/src/SpecialDay"
import SpecialDaysGallery from "../components/src/SpecialDayGallery"

const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Media" component={Media} />
      <Stack.Screen name="FestivalsPage" component={FestivalsPage} />
      <Stack.Screen name="Mediagallery" component={Mediagallery} />
      <Stack.Screen name="SpecialDaysPage" component={SpecialDaysPage} />
      <Stack.Screen name="SpecialDaysGallery" component={SpecialDaysGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}