import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./screens/home"
import Register from './screens/register';
import LogIn from './screens/login';
import UserProfile from './screens/userProfile';
import DoctorsList from './screens/doctorList';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />

          <Stack.Screen name="userProfile" component={UserProfile}/>

          <Stack.Screen name="logIn" component={LogIn} />

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="DoctorsList" component={DoctorsList}/>

        </Stack.Navigator>
      </NavigationContainer>
    );

}

