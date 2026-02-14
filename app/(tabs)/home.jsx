import React from 'react';
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Search } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { useAppStyles } from '../_Styles';

const PAGE_WIDTH = Dimensions.get('window').width;
console.log(PAGE_WIDTH + 8);

const PROMO_DATA = [
    { id: '1', title: 'Buy 1 Get 1 Free\non Latte', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3hiW90Dvkgtd9WanH-4G5alCTz4GcnzOHkJxCabWVhairyNwqgxMcTk1H1Vsou0dDGEj6OYcMejuU_Jd_RJdA7z1iAbeE4SfOW48E7VjeA4d6mKABWCKoyaTg0EGCzOr9iDlZBe0Ww6IBzeQIAc_RpxddU6BlPRLEZnhXeUwBmd1ZEtnBvgtZBQW95oz_q7uf6HtvSaGSetOanND1p93N8O9xk0T3WDveabCGKR1s3zFF_RwM_4MD-vIk3vxWqxDWA-9jKu5qhj4J' },
    { id: '2', title: '20% OFF on\nCold Brews', image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=1000' },
    { id: '3', title: 'New Arrival:\nOatmilk Flat White', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000' },
]

const Home = () => {
    const navigation = useNavigation();
    const { styles, theme, isDark } = useAppStyles();

    const animationStyle = React.useCallback((value) => {
        "worklet";
        const zIndex = interpolate(value, [-1, 0, 1], [-10, 20, -10]);
        const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-PAGE_WIDTH, 0, PAGE_WIDTH]
        );

        return {
            transform: [{ translateX }],
            zIndex,
        };
    }, []);

    const renderPromoItem = ({ index, item, animationValue }) => {
        return (
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.promoCard}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <View style={styles.promoOverlay}>
                        <View style={styles.dealBadge}>
                            <Text style={styles.dealBadgeText}>DEAL OF THE DAY</Text>
                        </View>
                        <Text style={styles.promoTitle}>{item.title}</Text>
                        <Text style={styles.promoValidity}>Valid until 11:00 AM today</Text>

                        <TouchableOpacity style={styles.claimButton}>
                            <Text style={styles.claimButtonText}>Claim Now</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    };
    return (
        <View style={styles.homepageContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>

                {/* 1. Header Section */}
                <LinearGradient
                    colors={isDark ? ['rgba(30,30,30,0.5)', 'transparent'] : ['rgba(0,0,0,0.05)', 'transparent']}
                    style={styles.headerRow}
                >
                    <View>
                        <Text style={styles.greetingText}>Good morning,</Text>
                        <Text style={styles.userName}>Alex! 👋</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('profile')}>
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiV_HUa58TdbS8XR5GYUqMLktePuPziqFMuIvbSOuLfwcJw589zNszcx1U3WUKJaVeAo5SABlYXnFJ2LgBjnioBXF1RGECWlwQ2dW2wFYKuC7HLNptOpqFoJ2Exsz0O0utZLntr-Uc4NpQomakrrp5h9P1vWVH_Pe8rjmmcIHX0hl0jSnjRLmAyMYNtYJ5Tm5sf060MOncHJJ_NzaOi4ZRfvQfOAvxgoD8xRAgLdAkjOLH3FO7IGREv-gv8t1tieNiAd7T2zkd1hs5" }}
                            style={styles.profileAvatar}
                        />
                    </TouchableWithoutFeedback>
                </LinearGradient>

                {/* 2. Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={[styles.searchInput, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Search color={theme.textMuted} size={20} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Find your coffee..."
                            style={{ flex: 1, color: theme.textMain, fontSize: 16 }}
                            placeholderTextColor={theme.textMuted}
                        />
                    </View>
                </View>

                {/* 3. Promo Carousel Section */}
                <View style={{ marginTop: 15 }}>
                    <Carousel
                        loop
                        width={Platform.OS === 'ios' ? PAGE_WIDTH + 5 : PAGE_WIDTH + 8}
                        height={200}
                        autoPlay={true}
                        autoPlayInterval={3000}
                        data={PROMO_DATA}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={renderPromoItem}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        style={{
                            paddingRight: 0
                        }}
                    />
                </View>

                {/* 4. Recommended for You Section */}
                <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Recommended for You</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('menu')}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.primary }}>See All</Text>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.recommendedContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.recommendedCard}>
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe4uw3XfUV1SqTqt7q4ZtIICTPhx6ZiNnI59x2AECb0vI4Pqd_6wsT5B0qPhi5WydI7v7cne5QEtpkkLaEmlp2vByqHezAZFymgrUydcmToKTAIqHT1WKoJsv3qY8tvKrfMOf0p815mqYUxlxbSI4_smGVyqAsMuR-eNR84te1ZqD15FcwZYOAHapv3a8iGjLAOrAkH4MtaTUg38TcBouUXHVD6rbWF-ia6TQ3hgIf87M6L0sxGf5IVcNdVoyaUTR2y0TLhbHnlplt" }}
                                style={styles.recommendedImage}
                            />
                            <Text style={styles.recommendedTitle}>Cold Brew</Text>
                            <Text style={styles.recommendedDescription}>Velvet Finish</Text>
                            <Text style={styles.recommendedPrice}>$5.25</Text>
                        </View>
                        <View style={styles.recommendedCard}>
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGaJEOZBK8iUevsSjTAjSeFDY9xoBg6s43052OErrVG92im9rk3QDh129inOKj6C83rFJ3xAe3ZJDfkOUjcX4TiDifcvvDjSsHAVfAGJM6dWzRGXO4Gm_B7k2dYFd2W8gAS3arafuROoZOfkkl1oEAOKJsxw-KcBS3KKSwslZSLvZIUUv1QYuSnm2IyAry0N46lgyKnklxiTp5mqfPgt8EYlikqLMXdInQ3NGPa6aD_Ti47y3X0GxpFXNkbJrXKxirLYDDFOeZ4aA7" }}
                                style={styles.recommendedImage}
                            />
                            <Text style={styles.recommendedTitle}>Coffee Latte</Text>
                            <Text style={styles.recommendedDescription}>A rich and creamy</Text>
                            <Text style={styles.recommendedPrice}>$4.25</Text>
                        </View>
                        <View style={styles.recommendedCard}>
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnMYdw0TTu73MvY3l20qQ3EDzTzQ8ijNEzP5XkPm3tS_X189I-1UAPepNvCiY5qjnFlgmdctu0ddSYBondu28bUyc77cXabkX--kNef5HHGR4f-Vc4o1uVB3TdTf_3dnpa98r8_HsHpG25jBe6CgLjmm6DTGHPPeawhhsQFW-7i9sA2ph2ffHcZnlnIEl8JbWpGC56rOMBC5unfwKwBUf-urbmQIJF_NaZHYPjDll6ev2-YUjxAu6lpGFLRcsBqA6CIQdhYo1lcUdI" }}
                                style={styles.recommendedImage}
                            />
                            <Text style={styles.recommendedTitle}>Iced Americano</Text>
                            <Text style={styles.recommendedDescription}>Crisp & refreshing</Text>
                            <Text style={styles.recommendedPrice}>$3.95</Text>
                        </View>
                        <View style={styles.recommendedCard}>
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3hiW90Dvkgtd9WanH-4G5alCTz4GcnzOHkJxCabWVhairyNwqgxMcTk1H1Vsou0dDGEj6OYcMejuU_Jd_RJdA7z1iAbeE4SfOW48E7VjeA4d6mKABWCKoyaTg0EGCzOr9iDlZBe0Ww6IBzeQIAc_RpxddU6BlPRLEZnhXeUwBmd1ZEtnBvgtZBQW95oz_q7uf6HtvSaGSetOanND1p93N8O9xk0T3WDveabCGKR1s3zFF_RwM_4MD-vIk3vxWqxDWA-9jKu5qhj4J" }}
                                style={styles.recommendedImage}
                            />
                            <Text style={styles.recommendedTitle}>Caramel Macchiato</Text>
                            <Text style={styles.recommendedDescription}>Rich & creamy</Text>
                            <Text style={styles.recommendedPrice}>$3.95</Text>
                        </View>

                    </ScrollView>
                </View>

                <View style={styles.recentOrdersContainer}>
                    <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('orders')}>
                        <Text style={{ fontSize: 16, fontWeight: 'semi-bold', color: theme.primary }}>History</Text>
                    </TouchableWithoutFeedback>
                </View>

                {/* Recent Order Items */}
                <View style={{ marginTop: 10 }}>
                    {/* Item 1: Butter Croissant */}
                    <View style={styles.recentOrdersCard}>
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZp7FxoczNzn2jVs9ChqXl8mYNjG10C8zZrrxWIZrlGgVIOPuFnG_nvFFzfSYUnS8GFOsDYdmh1L4b0ccMzyUYHRZaWA-41gi_UDZ9RYsA26p1OWncsCdY4wTu0uMbbwIELdKIvooUpZFQxXfmLV0SxmSEofBkuP9CQAyiLx0g98lE_BGQk6EV9obafswmADsoZrGXNjT02-YjEqKLF1mw2vJ8dUSxp7LbLvpBeNDexOjQ33hUqW7G-EeQuSYWwX2OthJssJvjcxM4" }}
                            style={styles.recentOrdersImage}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.recentOrdersName}>Butter Croissant</Text>
                            <Text style={styles.recentOrdersDescription}>Yesterday, 08:30 AM</Text>
                        </View>
                        <TouchableOpacity style={styles.recentOrdersReorderBtn}>
                            <Text style={styles.recentOrdersReorderText}>Re-order</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Item 2: Caramel Macchiato */}
                    <View style={styles.recentOrdersCard}>
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3hiW90Dvkgtd9WanH-4G5alCTz4GcnzOHkJxCabWVhairyNwqgxMcTk1H1Vsou0dDGEj6OYcMejuU_Jd_RJdA7z1iAbeE4SfOW48E7VjeA4d6mKABWCKoyaTg0EGCzOr9iDlZBe0Ww6IBzeQIAc_RpxddU6BlPRLEZnhXeUwBmd1ZEtnBvgtZBQW95oz_q7uf6HtvSaGSetOanND1p93N8O9xk0T3WDveabCGKR1s3zFF_RwM_4MD-vIk3vxWqxDWA-9jKu5qhj4J" }}
                            style={styles.recentOrdersImage}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.recentOrdersName}>Caramel Macchiato</Text>
                            <Text style={styles.recentOrdersDescription}>Mon, 14 Oct</Text>
                        </View>
                        <TouchableOpacity style={styles.recentOrdersReorderBtn}>
                            <Text style={styles.recentOrdersReorderText}>Re-order</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default Home;