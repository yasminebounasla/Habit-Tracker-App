import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerStyle : { backgroundColor:"f5f5f5"},
      headerShadowVisible: false, 
      tabBarStyle: {
        backgroundColor:"f5f5f5",
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0
      },
      tabBarActiveTintColor: "6200ee",
      tabBarInactiveTintColor: "666666"
    }}>
      <Tabs.Screen  name="index" options={{
        title : "Today's Habits",
        tabBarIcon : ({color, size}) => (
        <MaterialCommunityIcons 
          name="calendar-today" 
          size={size} 
          color={color}
        />)
    
        
      }}/>
      <Tabs.Screen  name="login" options={{title : "Login"}}/>
    </Tabs>
)}
