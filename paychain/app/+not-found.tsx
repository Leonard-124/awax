
// app/+not-found.tsx
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function NotFound() {
  return (
    <View  className="flex items-center text-xl mt-28">
      <Text className="">Page not found</Text>
      <Link href="/(Tabs)/home">Go home</Link>
    </View>
  );
}