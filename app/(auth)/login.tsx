import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { LoginFormType, loginSchema } from "@/utils/validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const { login: loginUser } = useAuth();

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    const res = await loginUser(data.email, data.password);
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Login", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login now to track all your expenses
          </Typo>
          {/* input */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                placeholder="Enter your email"
                onChangeText={field.onChange}
                icon={
                  <Icons.At
                    size={verticalScale(26)}
                    color={colors.neutral300}
                    weight="fill"
                  />
                }
              />
            )}
          />
          {errors.email && (
            <Typo size={14} color={colors.rose}>
              {errors.email.message}
            </Typo>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onChangeText={field.onChange}
                icon={
                  <Icons.Lock
                    size={verticalScale(26)}
                    color={colors.neutral300}
                    weight="fill"
                  />
                }
                endIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Icons.EyeSlash
                        size={verticalScale(26)}
                        color={colors.neutral400}
                      />
                    ) : (
                      <Icons.Eye
                        size={verticalScale(26)}
                        color={colors.neutral400}
                      />
                    )}
                  </Pressable>
                }
              />
            )}
          />
          {errors.password && (
            <Typo size={14} color={colors.rose}>
              {errors.password.message}
            </Typo>
          )}
          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>
          <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Login
            </Typo>
          </Button>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15}>Don't have an account ?</Typo>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Typo size={15} color={colors.primary} fontWeight={"700"}>
              Sign Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
    borderRadius: 16,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
