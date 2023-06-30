import Util from "./utils";
import { state } from "./store";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import React, { MutableRefObject, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import type { SketchCanvasRef } from "rn-perfect-sketch-canvas";
import { decodeBase64ToImage } from "../../helper/decodeBase64";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  canvasRef: MutableRefObject<SketchCanvasRef | null>;
  setSignature: any;
}

const Header: React.FC<Props> = ({ canvasRef, setSignature }) => {
  /**
   * Reset the canvas & draw state
   */
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    canvasRef.current?.reset();
    state.strokeColor = "black";
    state.strokeWidth = 8;
  };

  const save = async () => {
    const image = canvasRef.current?.toImage()?.encodeToBase64();
    if (image) {
      await uploadImage(image);
      navigation.goBack();
    }
  };

  const undo = () => {
    canvasRef.current?.undo();
  };

  //     setLoading(false);
  //     return null;
  //   }
  //   const uploadUri = `data:image/png;base64,${image}`;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
  //   const extension = "png";
  //   const name = filename.split(".").slice(0, -1).join(".");
  //   filename = String(Date.now() + "." + extension);
  //   setUploading(true);
  //   setTransferred(0);
  //   const storageRef = storage.ref().child(`signatureimg/${filename}`);
  //   const task = storageRef.putString(uploadUri);

  //   task.on("state_changed", (taskSnapshot: any) => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
  //     );

  //     setTransferred(
  //       Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
  //         100
  //     );
  //   });

  //   try {
  //     await task;

  //     const url = await storageRef.getDownloadURL();

  //     setUploading(false);
  //     // setImage(null);
  //     console.log(url);
  //     return url;
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // };

  const uploadImage = async (image: any) => {
    // const uploadUri = `data:image/png;base64,${image}`;
    const outputFilePath = FileSystem.documentDirectory + "image.png"; // Đường dẫn tệp hình ảnh đầu ra

    const url = await decodeBase64ToImage(image, outputFilePath);
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", url, true);
      xhr.send(null);
    });
    let filename = String(Date.now());
    const ref = firebase.storage().ref().child(`signatureimg/${filename}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          // console.log("Download URL: ", url);
          // setImage(url);
          setSignature(url);
          blob.close();
          return url;
        });
      }
    );
  };
  return (
    <View
      style={{
        height: 50,
        width: "100%",
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.headerButton]}
      >
        <FontAwesome name="angle-left" size={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={undo}
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={save}
          style={[styles.button, { marginLeft: 10 }]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    backgroundColor: "white",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    ...Util.getElevation(1),
  },
  buttonText: {
    color: "black",
  },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Header;
