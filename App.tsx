import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "./components/global/globalContex";
import { StatusBar, View } from 'react-native';
import Navigator from "./components/navigation/navigator"



function App() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
      <StatusBar barStyle="light-content"/>
    </Provider>
  );
}
export default App;