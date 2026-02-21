import React from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStyles } from '../../constants/Styles';

export default function Home() {
  const { styles, theme } = useAppStyles();
  const coffeeImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGaJEOZBK8iUevsSjTAjSeFDY9xoBg6s43052OErrVG92im9rk3QDh129inOKj6C83rFJ3xAe3ZJDfkOUjcX4TiDifcvvDjSsHAVfAGJM6dWzRGXO4Gm_B7k2dYFd2W8gAS3arafuROoZOfkkl1oEAOKJsxw-KcBS3KKSwslZSLvZIUUv1QYuSnm2IyAry0N46lgyKnklxiTp5mqfPgt8EYlikqLMXdInQ3NGPa6aD_Ti47y3X0GxpFXNkbJrXKxirLYDDFOeZ4aA7'

  return (
    <View style={styles.welcomeWrapper}>
      {/* 45% Height Curved Header Segment */}
      <View style={styles.authVisualHeader}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)']}
          style={styles.headerGradient}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Morning Barista! ☕</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Main Content Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Daily Brew</Text>
          <Text style={styles.bodyText}>
            Ready to start your day with a perfect espresso? Please Login/Signup to continue
          </Text>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.buttonMain}>
              <Text style={styles.buttonTextMain}>Login</Text>
            </TouchableOpacity>
          </Link>


          <Link href="/signup" asChild>
            <TouchableOpacity style={styles.buttonSecondary}>
              <Text style={styles.buttonTextSecondary}>Create an Account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}