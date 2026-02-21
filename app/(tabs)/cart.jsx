import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useAppStyles } from '../_Styles'
import { ChevronLeft, ShoppingCart, Trash2 } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Cart = () => {
    const { styles, theme } = useAppStyles();
    const route = useRoute();
    const navigation = useNavigation();

    const [cartItems, setCartItems] = useState([]);

    const removeItem = (productName) => {
        setCartItems(cartItems.filter(item => item.productName !== productName));
        console.log('Item removed', cartItems);
    };
    // Get parameters from route with safety fallback
    const {
        productImage,
        productName,
        productDescription,
        productPrice,
        productSize,
        productMilk,
        productSweetness,
        productQuantity
    } = route.params || {};

    if (!productName) {
        return (
            <View style={styles.container}>
                <View style={styles.menuheader}>
                    <View style={styles.menuHeaderRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ChevronLeft size={24} color={theme.terracotta} />
                        </TouchableOpacity>
                        <Text style={styles.menuTitle}>Your Cart</Text>
                        <View style={{ width: 24 }} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                    <ShoppingCart size={80} color={theme.textMuted} strokeWidth={1} />
                    <Text style={{ marginTop: 20, fontSize: 18, color: theme.textMuted, textAlign: 'center' }}>
                        Your cart is empty.{"\n"}Go grab a coffee!
                    </Text>
                    <TouchableOpacity
                        style={[styles.claimButton, { marginTop: 30, width: '100%' }]}
                        onPress={() => navigation.navigate('menu')}
                    >
                        <Text style={styles.claimButtonText}>Browse Menu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuheader}>
                <View style={styles.menuHeaderRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={theme.terracotta} />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Your Cart</Text>
                    <View style={{ width: 24 }} />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                <View style={[styles.menuItemCard, { height: 'auto', padding: 15, flexDirection: 'row', alignItems: 'flex-start' }]}>
                    <Image source={{ uri: productImage }} style={[styles.menuItemImage, { width: 100, height: 100, borderRadius: 15 }]} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.menuItemName, { fontSize: 18 }]}>{productName}</Text>
                            <TouchableOpacity onPress={() => removeItem(productName)}>
                                <Trash2 size={24} color={theme.terracotta} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.menuItemDescription, { fontSize: 13 }]} numberOfLines={2}>{productDescription}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' }}>
                            <View style={{ backgroundColor: theme.card, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 6, marginBottom: 4 }}>
                                <Text style={{ fontSize: 11, color: theme.textMuted }}>{productSize}</Text>
                            </View>
                            <View style={{ backgroundColor: theme.card, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 6, marginBottom: 4 }}>
                                <Text style={{ fontSize: 11, color: theme.textMuted }}>{productMilk} Milk</Text>
                            </View>
                            <View style={{ backgroundColor: theme.card, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4 }}>
                                <Text style={{ fontSize: 11, color: theme.textMuted }}>{productSweetness} Sugar</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={[styles.menuItemPrice, { fontSize: 20 }]}>{productPrice}</Text>
                            <Text style={{ fontWeight: '600', color: theme.textMuted }}>Qty: {productQuantity}</Text>
                        </View>
                    </View>
                </View>

                {/* Checkout Summary Placeholder */}
                <View style={{ marginTop: 30, backgroundColor: theme.card, borderRadius: 20, padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textMain, marginBottom: 15 }}>Order Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ color: theme.textMuted }}>Subtotal</Text>
                        <Text style={{ color: theme.textMain, fontWeight: '600' }}>{productPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ color: theme.textMuted }}>Delivery Fee</Text>
                        <Text style={{ color: theme.textMain, fontWeight: '600' }}>$1.00</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.textMain }}>Total</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primary }}>
                            ${(parseFloat(productPrice.replace('$', '')) + 1).toFixed(2)}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={[styles.detailAddToCartBtn, { marginTop: 30, width: '100%' }]}>
                    <Text style={styles.detailAddToCartText}>Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Cart;