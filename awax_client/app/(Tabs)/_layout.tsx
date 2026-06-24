
import { Tabs } from "expo-router";
import {Home, Wallet, CreditCard, TrendingUp, Menu }from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#059669",
            tabBarInactiveTintColor: "#9CA3AF",
            tabBarStyle: {
                backgroundColor: 'green',
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                height: 70,
                paddingBottom: 9,
                paddingTop: 5,
            },
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '600'
            },
        }}
        >
            <Tabs.Screen
            name="home"
            options={{
                title: 'HOME',
                headerShown: false,
                tabBarIcon: ({color, size}) => <Home size={size} color={color}/>,
            }}
             />
             <Tabs.Screen
             name="collections"
             options={{
                title: 'COLLECTIONS',
                tabBarIcon: ({color, size}) => <Wallet size={size} color={color}/>,
             }}
              />
              <Tabs.Screen
              name="pay"
              options={{
                title: 'PAY',
                tabBarIcon: ({color, size}) => <CreditCard size={size} color={color}/>,
              }}
              />
            <Tabs.Screen
              name="advance"
              options={{
                title: 'ADVANCE',
                tabBarIcon: ({color, size}) => <TrendingUp size={size} color={color}/>,
              }}
              />
            <Tabs.Screen
              name="more"
              options={{
                title: 'MORE',
                tabBarIcon: ({color, size}) => <Menu size={size} color={color}/>,
              }}
              />
        </Tabs>
    )
}