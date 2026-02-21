import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAppStyles } from "../constants/Styles";
import { ChevronLeft, Heart, Star, Minus, Plus, ShoppingBag, Coffee } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const MILK_OPTIONS = ['Whole', 'Oat', 'Almond', 'Soy', 'Coconut'];
const SWEETNESS_OPTIONS = ['0%', '25%', '50%', '75%', '100%'];
const SIZES = [
    { label: 'Small', icon: 'cup' },
    { label: 'Medium', icon: 'cup' },
    { label: 'Large', icon: 'cup' },
];

const CoffeeDetail = () => {
    const { styles, theme } = useAppStyles();
    const navigation = useNavigation();
    const route = useRoute();
    const { addToCart } = useCart();
    const scrollY = useRef(new Animated.Value(0)).current;

    // Get parameters from route
    const {
        productImage,
        productName,
        productDescription,
        productPrice
    } = route.params || {
        productImage: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000',
        productName: 'Caramel Macchiato',
        productDescription: 'Freshly steamed milk with vanilla-flavored syrup is marked with espresso and topped with caramel drizzle for an oh-so-sweet finish. Perfectly balanced for your morning boost.',
        productPrice: '₹450'
    };

    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [selectedMilk, setSelectedMilk] = useState('Whole');
    const [selectedSweetness, setSelectedSweetness] = useState('50%');
    const [quantity, setQuantity] = useState(1);

    const headerBlurOpacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.2, 1],
        extrapolate: 'clamp'
    });

    return (
        <View style={[styles.container, { marginTop: 0 }]}>
            <View style={[styles.detailHeroContainer, { position: 'absolute', top: 0, left: 0, right: 0 }]}>
                <Animated.Image
                    source={{ uri: productImage }}
                    style={[
                        styles.detailHeroImage,
                        { transform: [{ scale: imageScale }] }
                    ]}
                    resizeMode="cover"
                />

                <Animated.View style={{
                    ...styles.detailHeroImage,
                    position: 'absolute',
                    opacity: headerBlurOpacity
                }}>
                    <BlurView intensity={80} style={{ flex: 1 }} tint="dark" />
                </Animated.View>
            </View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >

                <View style={{ backgroundColor: 'transparent' }}>
                    <View style={[styles.detailHeaderButtons, { position: 'relative', top: 0, marginTop: 50 }]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                            <ChevronLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.iconCircle}>
                            <Heart size={24} color={isFavorite ? '#FF5252' : '#FFFFFF'} fill={isFavorite ? '#FF5252' : 'transparent'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 250 }}

                />

                <View style={[styles.detailContent, {
                    minHeight: 600,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35
                }]}>
                    <View style={styles.detailTitlePriceRow}>
                        <Text style={styles.detailTitle}>{productName}</Text>
                        <Text style={styles.detailPrice}>{productPrice}</Text>
                    </View>

                    <View style={styles.detailRatingRow}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.detailRatingText}>4.8</Text>
                        <Text style={styles.detailReviewsText}>(2.4k Reviews)</Text>
                    </View>

                    <Text style={styles.detailDescription}>
                        {productDescription}
                    </Text>

                    {/* Size Selection */}
                    <Text style={styles.detailSectionHeader}>Select Size</Text>
                    <View style={styles.sizeSelectionRow}>
                        {SIZES.map((size) => (
                            <TouchableOpacity
                                key={size.label}
                                onPress={() => setSelectedSize(size.label)}
                                style={[
                                    styles.sizeOption,
                                    selectedSize === size.label && styles.sizeOptionActive
                                ]}
                            >
                                <Coffee color={selectedSize === size.label ? theme.primary : theme.textMuted} size={24} />
                                <Text style={[
                                    styles.sizeLabel,
                                    selectedSize === size.label && styles.sizeLabelActive
                                ]}>{size.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Milk Choice */}
                    <Text style={styles.detailSectionHeader}>Milk Choice</Text>
                    <View style={styles.choiceChipsRow}>
                        {MILK_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setSelectedMilk(option)}
                                style={[
                                    styles.choiceChip,
                                    selectedMilk === option && styles.choiceChipActive
                                ]}
                            >
                                <Text style={[
                                    styles.choiceChipText,
                                    selectedMilk === option && styles.choiceChipTextActive
                                ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sweetness Level */}
                    <Text style={styles.detailSectionHeader}>Sweetness Level</Text>
                    <View style={styles.choiceChipsRow}>
                        {SWEETNESS_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setSelectedSweetness(option)}
                                style={[
                                    styles.choiceChip,
                                    selectedSweetness === option && styles.choiceChipActive
                                ]}
                            >
                                <Text style={[
                                    styles.choiceChipText,
                                    selectedSweetness === option && styles.choiceChipTextActive
                                ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>

            {/* 4. Bottom Basket Bar (Fixed) */}
            <View style={styles.bottomBasketBar}>
                <View style={styles.detailQuantitySelector}>
                    <TouchableOpacity
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        style={styles.quantityBtn}
                    >
                        <Minus size={20} color={theme.textMain} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity + 1)}
                        style={styles.quantityBtn}
                    >
                        <Plus size={20} color={theme.textMain} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.detailAddToCartBtn}
                    onPress={() => {
                        addToCart({
                            productImage: productImage,
                            productName: productName,
                            productDescription: productDescription,
                            productPrice: productPrice,
                            productSize: selectedSize,
                            productMilk: selectedMilk,
                            productSweetness: selectedSweetness,
                            productQuantity: quantity,
                        });

                        navigation.navigate('(tabs)', {
                            screen: 'cart'
                        });
                    }}
                >
                    <ShoppingBag size={20} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={styles.detailAddToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default CoffeeDetail;
