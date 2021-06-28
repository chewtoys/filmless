import React, { useState, useEffect, useContext } from "react";
import { View, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-navigation";
import StackNavigator from "./src/Screens/StackNavigator";
import DiscoverContextProvider from "./src/Context/DiscoverContext";
import ThemesContextProvider from "./src/Context/ThemesContext";
import { ThemesContext } from "./src/Context/ThemesContext";
import { getTheme } from "./src/utils/themePersist";

const AppContainer = () => {
  const [appLoading, setAppLoading] = useState(true);
  const { theme, themeType, setTheme } = useContext(ThemesContext);

  useEffect(() => {
    getTheme()
      .then(theme => {
        if (theme) {
          setTheme(theme.colors);
        }
        setAppLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (appLoading) {
    return <AppLoading />;
  }

  return (
    <View style={styles(theme).appContainer}>
      <StatusBar
        barStyle={themeType == "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "never" }}>
        <StackNavigator screenProps={{ theme: theme }} />
      </SafeAreaView>
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ThemesContextProvider>
        <DiscoverContextProvider>
          <AppContainer />
        </DiscoverContextProvider>
      </ThemesContextProvider>
    </View>
  );
};

const styles = theme => {
  return {
    app: {
      flex: 1,
    },
    appContainer: {
      flex: 1,
      backgroundColor: theme.base01,
    },
  };
};

export default App;
