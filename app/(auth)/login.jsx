import {
    View,
    Text,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react'
import { Link } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStyles } from "../_Styles"

const Login = () => {
    const { styles, theme } = useAppStyles();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const coffeeImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwlMKehHVqC-x5VIhnRhWsesm25w4VJxmWFlBOZyALRZU9bEJAPruW7qgeBLTY-QF2yBY4sm2qFahv4SRA1m28dsoh1pakGhPN46VZLnjjStNwfvCou4dKUpI7YcHneM7gSsbaJcnRelAsjccPk5ae-xHig9A68yHVcX38MFVcZg3rIoRZrWwKpafdn2LPjuMi97BXcVQI2ghiJxHGUd-fUGa9K-CSQYnHhmfsoWEzHKbwbs8akUUAt4JRlHtKpU9nD_2XcHUwpoBH'

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.logincontainer} >

                {/* 45% Height Curved Image Header */}
                <View style={styles.authVisualHeaderlogin}>
                    <Image source={{ uri: coffeeImage }} style={styles.authVisualHeaderImage} resizeMode="cover" />
                    <LinearGradient
                        colors={['transparent', theme.background]}
                        style={styles.headerGradient}
                    />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        bounces={false}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* Title Section */}
                        <View>
                            <Text style={styles.morningRitualsTitle}>Morning Rituals</Text>
                            <Text style={styles.morningRitualsSubtitle}>The perfect brew awaits you.</Text>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Mail color={theme.textMuted} size={20} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="hello@coffeeapp.com"
                                    placeholderTextColor={theme.textMuted}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Lock color={theme.textMuted} size={20} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="••••••••"
                                    secureTextEntry={!passwordVisible}
                                    placeholderTextColor={theme.textMuted}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? (
                                        <EyeOff color={theme.textMuted} size={20} />
                                    ) : (
                                        <Eye color={theme.textMuted} size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Orange Terracotta Login Button */}
                        <Link href="/home" asChild>
                            <TouchableOpacity style={styles.terracottaBtn}>
                                <Text style={styles.terracottaBtnText}>Login</Text>
                                <ArrowRight color="#FFFFFF" size={20} strokeWidth={3} />
                            </TouchableOpacity>
                        </Link>

                        <View style={styles.signupFooter}>
                            <Text style={{ color: theme.textMuted, fontSize: 16 }}>Don't have an account? </Text>
                            <Link href="/signup" asChild>
                                <TouchableOpacity>
                                    <Text style={{ color: '#6F4E37', fontWeight: '700', fontSize: 16 }}>Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login