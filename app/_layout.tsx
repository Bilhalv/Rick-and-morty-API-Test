import { View } from "react-native";
import { Slot } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View
        style={{
          backgroundColor: "#272B33",
          flexDirection: "column",
          gap: 10,
          padding: 10,
          minHeight: "100%",
        }}
      >
        <Slot />
      </View>
    </ApplicationProvider>
  );
}
