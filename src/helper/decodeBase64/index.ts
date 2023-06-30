import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export async function decodeBase64ToImage(
  base64String: any,
  outputFilePath: any
) {
  try {
    await FileSystem.writeAsStringAsync(outputFilePath, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // console.log("Image saved successfully");
    // console.log("Output file path:", outputFilePath);
    return outputFilePath;
  } catch (error) {
    console.error("Error decoding base64 to image:", error);
  }
}
