import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, TouchableNativeFeedback, TouchableWithoutFeedback, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStyles } from '../../constants/Styles';
import { ChevronLeft, ShoppingBag, Search, Plus } from 'lucide-react-native';

const MENU_ITEMS = [
    {
        id: '1',
        name: 'Caramel Macchiato',
        description: 'Freshly steamed milk with vanilla-flavored syrup marked with...',
        price: '₹450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3hiW90Dvkgtd9WanH-4G5alCTz4GcnzOHkJxCabWVhairyNwqgxMcTk1H1Vsou0dDGEj6OYcMejuU_Jd_RJdA7z1iAbeE4SfOW48E7VjeA4d6mKABWCKoyaTg0EGCzOr9iDlZBe0Ww6IBzeQIAc_RpxddU6BlPRLEZnhXeUwBmd1ZEtnBvgtZBQW95oz_q7uf6HtvSaGSetOanND1p93N8O9xk0T3WDveabCGKR1s3zFF_RwM_4MD-vIk3vxWqxDWA-9jKu5qhj4J',
    },
    {
        id: '2',
        name: 'Nitro Cold Brew',
        description: 'Signature cold brew infused with nitrogen for a velvety finish.',
        price: '₹490',
        image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=1000',
    },
    {
        id: '3',
        name: 'Caffè Latte',
        description: 'Rich espresso balanced with steamed milk and a light layer of...',
        price: '₹380',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGaJEOZBK8iUevsSjTAjSeFDY9xoBg6s43052OErrVG92im9rk3QDh129inOKj6C83rFJ3xAe3ZJDfkOUjcX4TiDifcvvDjSsHAVfAGJM6dWzRGXO4Gm_B7k2dYFd2W8gAS3arafuROoZOfkkl1oEAOKJsxw-KcBS3KKSwslZSLvZIUUv1QYuSnm2IyAry0N46lgyKnklxiTp5mqfPgt8EYlikqLMXdInQ3NGPa6aD_Ti47y3X0GxpFXNkbJrXKxirLYDDFOeZ4aA7',
    },
    {
        id: '4',
        name: 'Butter Croissant',
        description: 'Flaky, golden-brown pastry made with 100% French butter.',
        price: '₹220',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZp7FxoczNzn2jVs9ChqXl8mYNjG10C8zZrrxWIZrlGgVIOPuFnG_nvFFzfSYUnS8GFOsDYdmh1L4b0ccMzyUYHRZaWA-41gi_UDZ9RYsA26p1OWncsCdY4wTu0uMbbwIELdKIvooUpZFQxXfmLV0SxmSEofBkuP9CQAyiLx0g98lE_BGQk6EV9obafswmADsoZrGXNjT02-YjEqKLF1mw2vJ8dUSxp7LbLvpBeNDexOjQ33hUqW7G-EeQuSYWwX2OthJssJvjcxM4',
    },
    {
        id: '5',
        name: 'Iced Americano',
        description: 'Espresso shots topped with cold water and ice for a crisp finish.',
        price: '₹340',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnMYdw0TTu73MvY3l20qQ3EDzTzQ8ijNEzP5XkPm3tS_X189I-1UAPepNvCiY5qjnFlgmdctu0ddSYBondu28bUyc77cXabkX--kNef5HHGR4f-Vc4o1uVB3TdTf_3dnpa98r8_HsHpG25jBe6CgLjmm6DTGHPPeawhhsQFW-7i9sA2ph2ffHcZnlnIEl8JbWpGC56rOMBC5unfwKwBUf-urbmQIJF_NaZHYPjDll6ev2-YUjxAu6lpGFLRcsBqA6CIQdhYo1lcUdI',
    },
];

const CATEGORIES = ['Hot Coffee', 'Cold Brew', 'Pastries', 'Tea'];

const Menu = () => {
    const { styles, theme } = useAppStyles();
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('Hot Coffee');

    return (
        <View style={styles.container}>
            <View style={styles.menuheader}>
                <View style={styles.menuHeaderRow}>
                    <TouchableOpacity>
                        <ChevronLeft size={24} color={theme.terracotta} />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Coffee Menu</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                        <ShoppingBag size={24} color={theme.terracotta} />
                    </TouchableOpacity>
                </View>
                {/* Search Bar */}
                <View style={styles.menuSearchContainer}>
                    <Search size={20} color={theme.textMuted} />
                    <TextInput
                        placeholder="Search your favorite coffee..."
                        placeholderTextColor={theme.textMuted}
                        style={styles.menuSearchInput}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            style={[
                                styles.categoryChip,
                                activeCategory === cat && styles.categoryChipActive
                            ]}
                        >
                            <Text style={[
                                styles.categoryText,
                                activeCategory === cat && styles.categoryTextActive
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
                {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItemCard}
                        onPress={() => navigation.navigate('product-details', {
                            productImage: item.image,
                            productName: item.name,
                            productDescription: item.description,
                            productPrice: item.price,
                        })}
                    >
                        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                        <View style={styles.menuItemInfo}>
                            <View>
                                <Text style={styles.menuItemName}>{item.name}</Text>
                                <Text style={styles.menuItemDescription}>{item.description}</Text>
                            </View>
                            <View style={styles.menuItemFooter}>
                                <Text style={styles.menuItemPrice}>{item.price}</Text>
                                <TouchableOpacity
                                    style={styles.menuItemAddBtn}
                                    onPress={() => navigation.navigate('product-details', {
                                        productImage: item.image,
                                        productName: item.name,
                                        productDescription: item.description,
                                        productPrice: item.price,
                                    })}
                                >
                                    <Plus size={20} color="#FFFFFF" strokeWidth={3} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Menu;
