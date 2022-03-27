import { Button } from "react-native-elements";
import Spacer from "../src/components/Spacer";
import { Context as AuthContext } from "../src/context/AuthContext";
import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 25 }}>Account Screen</Text>
      <Spacer>
        <Button title="Sign out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
