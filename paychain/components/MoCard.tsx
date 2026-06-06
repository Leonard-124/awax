


import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const MoCard = () => {
  return (
    <View  className='bg-[#ffffff] text-sm flex flex-row h-60 items-center gap-2'>
      <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
        <TouchableOpacity onPress={() => router.replace("/(Tabs)/advance")}>
            <Text>REQUEST ADVANCE</Text>
        </TouchableOpacity>
      </View>
      <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
        <TouchableOpacity onPress={() => router.navigate("/(Tabs)/pay")}>
            <Text>SEND BULK PAYMENTS</Text>
        </TouchableOpacity>
      </View>
      <View className="text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20">
        <TouchableOpacity onPress={() => router.push("/swap")}>
            <Text>SWAP USDC</Text>
        </TouchableOpacity>
      </View>
      <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
        <TouchableOpacity onPress={() => router.push("/trust_score")}>
            <Text>TRUST SCORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MoCard

const styles = StyleSheet.create({})

////////////////////////////////////////

// import { StyleSheet, Text, View, Pressable } from "react-native";
// import React from "react";
// import { router } from "expo-router";

// const MoCard = () => {
//   return (
//     <View className="bg-[#ffffff] text-sm flex flex-row h-60 items-center gap-2">
//       <Pressable
//         onPress={() => router.replace("/(Tabs)/advance")}
//         className="text-center rounded-xl px-4 py-2 h-20"
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? "#7fcf51" : "#e4ece3",
//           },
//         ]}
//       >
//         <Text>REQUEST ADVANCE</Text>
//       </Pressable>

//       <Pressable
//         onPress={() => router.navigate("/(Tabs)/pay")}
//         className="text-center rounded-xl px-4 py-2 h-20"
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? "#7fcf51" : "#e4ece3",
//           },
//         ]}
//       >
//         <Text>SEND BULK PAYMENTS</Text>
//       </Pressable>

//       <Pressable
//         onPress={() => router.push("/swap")}
//         className="text-center rounded-xl px-4 py-2 h-20"
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? "#7fcf51" : "#e4ece3",
//           },
//         ]}
//       >
//         <Text>SWAP USDC</Text>
//       </Pressable>

//       <Pressable
//         onPress={() => router.push("/trust_score")}
//         className="text-center rounded-xl px-4 py-2 h-20"
//         style={({ pressed }) => [
//           {
//             backgroundColor: pressed ? "#7fcf51" : "#e4ece3",
//           },
//         ]}
//       >
//         <Text>TRUST SCORE</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default MoCard;

// const styles = StyleSheet.create({});
