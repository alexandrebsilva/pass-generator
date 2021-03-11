import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Vibration,
  ToastAndroid,
} from "react-native";
import logo from "./src/assets/logo.png";
import Slider from "@react-native-community/slider";
import Clipboard from "expo-clipboard";

export default function App() {
  const [password, setPassword] = useState("");
  const [numberCharacters, setNumberCharacters] = useState(10);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generatePassword() {
    Vibration.vibrate(10000);
    Vibration.cancel();
    setPassword(makeid(numberCharacters));
    // alert("Clicou no botão");
  }

  const copyToClipboard = () => {
    ToastAndroid.show("Text copied!", ToastAndroid.SHORT);
    Clipboard.setString(password);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.title}>Characters {numberCharacters}</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          value={numberCharacters}
          onValueChange={(value) => {
            setNumberCharacters(value);
          }}
          minimumValue={1}
          maximumValue={15}
          step={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="green"
        ></Slider>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          generatePassword();
        }}
      >
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>
      {password !== "" ? (
        <View style={styles.area}>
          <Text style={styles.password} onPress={copyToClipboard}>
            {password}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3FF",
  },
  logo: { marginBottom: 60 },
  title: { fontSize: 30, fontWeight: "bold" },
  area: { width: "90%" },
  button: {
    backgroundColor: "#FFA200",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  password: {
    backgroundColor: "black",
    color: "white",
    marginTop: 20,
    color: "white",
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    borderRadius: 8,
  },
});
