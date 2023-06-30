import styles from "./style";
import {
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth";
import logo from "../../../assets/logo.png";
import LoginInput from "../../components/Input";
import { loadDone } from "../../redux/features/load";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { color, windowHeight, windowWidth } from "../../utils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { resetMessage } from "../../redux/features/auth";

type Props = {};
type FormValues = {
  phoneNumber: string;
  password: string;
};
const PHONE_REGEX = /^(\+?\d{0,9}[-.\s]?)?\d{9,}$/;

const Login = (props: Props) => {
  const user = useSelector((state: any) => state?.auth?.user?.user);
  const message = useSelector((state: any) => state?.auth?.message);

  // console.log(message);
  const scrollViewRef = useRef<ScrollView>(null);
  const headerMotion = useRef(new Animated.Value(0)).current;
  const animatedKeyBoard = (motion: any, value: any, duration: any) => {
    Animated.timing(motion, {
      toValue: value,
      duration: duration,
      speed: Platform.OS == "ios" ? 60 : 50,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    const SHOW_KEYBOARD_EVENT =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const HIDE_KEYBOARD_EVENT =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, windowHeight * -0.18, 400);
    });
    const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
      animatedKeyBoard(headerMotion, 0, 400);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    dispatch(resetMessage());

    dispatch(loadDone());
    if (user) {
      user?.role === "distributor"
        ? navigation.navigate("MainDistributor", {
            screen: "Home",
            initial: false,
          })
        : navigation.navigate("MainRetailer", {
            screen: "Home",
            initial: false,
          });
    }
  }, []);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormValues) => {
    loginUser(data, dispatch, navigation);
  };
  return (
    <Animated.View style={[{ flex: 1 }, { marginTop: headerMotion }]}>
      <ScrollView
        style={{
          flex: 1,
          zIndex: 2,
          paddingTop: Platform.OS === "ios" ? 60 : 0,
          backgroundColor: "#fff",
        }}
      >
        <StatusBar
          animated={true}
          backgroundColor={"#fff"}
          hidden={false}
          barStyle={"dark-content"}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.nameApp}>One Commune - One Product</Text>
        </View>
        <View style={styles.boxInput}>
          <LoginInput
            control={control}
            iconClass={FontAwesome5}
            iconName={"phone-alt"}
            label={"Phone number"}
            secureTextEntry={false}
            name="phoneNumber"
            rules={{
              required: "Phone is required",
              pattern: { value: PHONE_REGEX, message: "Phone is invalid" },
            }}
          />
          <LoginInput
            control={control}
            iconClass={FontAwesome5}
            iconName={"lock"}
            label={"Password"}
            secureTextEntry={true}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be minimum 3 characters long",
              },
            }}
          />
          <Text
            style={{
              fontFamily: "RobotoSlab-VariableFont_wght",
              marginVertical: 2,
              color: "red",
            }}
          >
            {message}
          </Text>
        </View>
        <View style={styles.boxForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </View>
        <View style={styles.button}>
          <AwesomeButton
            backgroundColor={color.Primary}
            textColor="#fff"
            backgroundActive="#8CEC89"
            backgroundShadow="#8CEC89"
            backgroundProgress="#8CEC89"
            backgroundDarker="#8CEC89"
            textSize={24}
            borderRadius={20}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            onPressIn={handleSubmit(onSubmit)}
          >
            Log in
          </AwesomeButton>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default Login;
