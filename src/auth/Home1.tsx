import React from 'react';
import { Text, View} from 'react-native';
import { useAuth } from '../hooks/useAuth';


export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View >
      <View >
      <Text>Welcome {user?.email}!</Text>
    </View>
    </View>
  );
}
