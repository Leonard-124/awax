
// import "../global.css"
// import { Tabs } from "expo-router"

// // import { Stack } from "expo-router";

// // export default function RootLayout() {
// //   return (
// //     <Stack>
// //       <Stack.Screen name="overview" options={{ title: "Overview" }} />
// //       <Stack.Screen name="cashadvance" options={{ title: "Cashadvance" }} />
// //       <Stack.Screen name="help" options={{ title: "Help" }} />
// //       <Stack.Screen name="linkedtills" options={{ title: "LinkedTills" }} />
// //       <Stack.Screen name="settings" options={{ title: "Settings" }} />
// //       <Stack.Screen name="transactions" options={{ title: "Transactions" }} />
// //       <Stack.Screen name="wallet" options={{ title: "Wallet" }} />
// //     </Stack>
// //   );
// // }


// export default function TabsLayout() {
//   return (
//     <Tabs
//     screenOptions={{
//       tabBarShowLabel: false,
//       tabBarItemStyle: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center"
//       },
//       tabBarStyle: {
//         backgroundColor: "#0F0D23",
//         borderRadius: 50,
//         marginHorizontal: 20,
//         marginBottom: 36,
//         height: 52,
//         position: "absolute",
//         overflow: "hidden",
//         borderWidth: 1,
//         borderColor: "#0F0D23",
//       }
//     }}
//     >
//       <Tabs.Screen
//       name='index'
//       options={{
//         title: "index",
//         headerShown: false,
//       }}
//       />
//       <Tabs.Screen
//       name="dashboard"
//       options={{
//         title: "dashboard",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="cash_advance"
//       options={{
//         title: "cash_advance",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="bulk_pay"
//       options={{
//         title: "bulk_pay",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="trust_score"
//       options={{
//         title: "trust_score",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="inflation_shield"
//       options={{
//         headerTitle: "inflation_shield",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="login"
//       options={{
//         headerTitle: "Login",
//         headerShown: false
//       }}
//       />
//       <Tabs.Screen
//       name="register"
//       options={{
//         headerTitle: "Register",
//         headerShown: false
//       }}
//       />
//     </Tabs>
//   )
// }
////////////////////////////////
import "../global.css"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="swap"/>
      <Stack.Screen name="bulk-payments"/>
      <Stack.Screen name="help" />
    </Stack>
  )
}