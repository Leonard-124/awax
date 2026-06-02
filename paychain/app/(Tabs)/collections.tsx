
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';

// export default function CollectionsScreen() {
//   return (
//     <ScrollView  className="flex-1 bg-white">
//       <View className="px-6 pt-12">
//         <Text className="text-gray-900 text-3xl font-bold mb-4">Collections</Text>
//         <Text className="text-gray-600">View your transaction history and collection reports.</Text>
//       </View>
//     </ScrollView>
//   );
// }


/////////////////////////////////////////////
// import React from "react";
// import { View, Text, ScrollView } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function CollectionsScreen() {
//   return (
//     <ScrollView className="flex-1 bg-white">
//       <LinearGradient
//         colors={["#ffffff", "#000000"]}
//         start={{ x: 0.5, y: 0 }}
//         end={{ x: 0.5, y: 1 }}
//         style={{ flex: 1 }}
//       >
//         <View className="px-6 pt-12">
//           <Text className="text-gray-900 text-3xl font-bold mb-4">
//             Collections
//           </Text>
//           <Text className="text-gray-600">
//             View your transaction history and collection reports.
//           </Text>
//         </View>
//       </LinearGradient>
//     </ScrollView>
//   );
// }
///////////////////////////////////////////
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { PlatformColor } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CollectionsScreen({ onPicture }: { onPicture: (uri: string) => Promise<void> }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [type, setType] = useState<CameraType>("back");
  const { bottom } = useSafeAreaInsets();

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: PlatformColor("systemBackground") }}>
        <Text style={{ color: PlatformColor("label"), padding: 16 }}>Camera access is required</Text>
        <GlassView isInteractive tintColor={PlatformColor("systemBlue")} style={{ borderRadius: 12 }}>
          <TouchableOpacity onPress={requestPermission} style={{ padding: 12, borderRadius: 12 }}>
            <Text style={{ color: "white" }}>Grant Permission</Text>
          </TouchableOpacity>
        </GlassView>
      </View>
    );
  }

   const takePhoto = async () => {
    await Haptics.selectionAsync();
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    await onPicture(photo.uri);
  };

  const selectPhoto = async () => {
    await Haptics.selectionAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]) {
      await onPicture(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView ref={cameraRef} mirror style={{ flex: 1 }} facing={type} />
      <View style={{ position: "absolute", left: 0, right: 0, bottom: bottom, gap: 16, alignItems: "center" }}>
        <GlassView isInteractive style={{ padding: 8, borderRadius: 99 }}>
          <TouchableOpacity onPress={takePhoto} style={{ width: 64, height: 64, borderRadius: 99, backgroundColor: "white" }} />
        </GlassView>
        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 8 }}>
          <GlassButton onPress={selectPhoto} icon="photo" />
          <GlassButton onPress={() => setType(t => t === "back" ? "front" : "back")} icon="arrow.triangle.2.circlepath" />
        </View>
      </View>
    </View>
  );
}


