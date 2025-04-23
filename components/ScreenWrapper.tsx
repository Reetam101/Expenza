import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { verticalScale } from "@/utils/styling";
const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 20;

  return (
    <View
      style={[
        { paddingTop, flex: 1, backgroundColor: colors.neutral800 },
        style,
      ]}
    >
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={verticalScale(5)}
        enableOnAndroid={true}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
