import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
import { useAppStyles } from '../../constants/Styles'
import { ChevronLeft, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const { styles, theme } = useAppStyles();
    const navigation = useNavigation();
    const { cartItems, removeFromCart, cartTotal, updateCartItemQuantity } = useCart();

    if (cartItems.length === 0) {
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
                        <Text style={[styles.claimButtonText, { textAlign: 'center' }]}>Browse Menu</Text>
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 15, paddingBottom: 350 }}>
                {cartItems.map((item) => (
                    <View key={item.id} style={[styles.menuItemCard, { height: 'auto', padding: 15, flexDirection: 'row', alignItems: 'stretch', marginBottom: 15 }]}>
                        <Image source={{ uri: item.productImage }} style={[styles.menuItemImage, { width: 110, height: 'auto', borderRadius: 15 }]} />
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.menuItemName, { fontSize: 18 }]}>{item.productName}</Text>
                                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                    <Trash2 size={22} color={theme.terracotta} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.descriptionText || styles.menuItemDescription, { fontSize: 13, color: theme.textMuted }]} numberOfLines={2}>
                                {item.productDescription}
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 2, flexWrap: 'wrap' }}>
                                <View style={{ backgroundColor: theme.card, paddingHorizontal: 2, paddingVertical: 6, borderRadius: 6, marginRight: 6, marginBottom: 4 }}>
                                    <Text style={{ fontSize: 10, color: theme.textMuted, fontWeight: 'bold' }}>{item.productSize}</Text>
                                </View>
                                <View style={{ backgroundColor: theme.card, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6, marginRight: 6, marginBottom: 4 }}>
                                    <Text style={{ fontSize: 10, color: theme.textMuted, fontWeight: 'bold' }}>{item.productMilk} Milk</Text>
                                </View>
                                <View style={{ backgroundColor: theme.card, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6, marginBottom: 4 }}>
                                    <Text style={{ fontSize: 10, color: theme.textMuted, fontWeight: 'bold' }}>{item.productSweetness} Sugar</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0 }}>
                                <Text style={[styles.menuItemPrice, { fontSize: 20 }]}>{item.productPrice}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 10, padding: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: theme.textMain, marginHorizontal: 12, minWidth: 20, textAlign: 'center', fontSize: 16 }}>
                                        Qty:
                                    </Text>
                                    <View style={{ backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row', alignItems: 'center', padding: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                                        <TouchableOpacity
                                            onPress={() => updateCartItemQuantity(item.id, item.productQuantity - 1)}
                                            style={{ padding: 5 }}
                                        >
                                            <Minus size={18} color={theme.terracotta} />
                                        </TouchableOpacity>
                                        <Text style={{ fontWeight: 'bold', color: theme.textMain, marginHorizontal: 12, minWidth: 20, textAlign: 'center' }}>
                                            {item.productQuantity}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => updateCartItemQuantity(item.id, item.productQuantity + 1)}
                                            style={{ padding: 5 }}
                                        >
                                            <Plus size={18} color={theme.terracotta} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={{
                backgroundColor: '#FFF',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 25,
                paddingBottom: Platform.OS === 'ios' ? 40 : 25,
                elevation: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                // Use a fixed height or minHeight to ensure it fits the content
                height: 300,
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textMain, marginBottom: 15 }}>Order Summary</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ color: theme.textMuted }}>Subtotal</Text>
                    <Text style={{ color: theme.textMain, fontWeight: '600' }} >₹{cartTotal.toFixed(2)}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ color: theme.textMuted }}>Delivery Fee</Text>
                    <Text style={{ color: theme.textMain, fontWeight: '600' }}>₹80.00</Text>
                </View>

                <View style={{ height: 1, backgroundColor: theme.background === '#121212' ? '#333' : '#F1F5F9', marginVertical: 10 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textMain }}>Total</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primary }}>
                        ₹{(cartTotal + 80).toFixed(2)}
                    </Text>
                </View>

                <TouchableOpacity style={{
                    backgroundColor: theme.primary,
                    borderRadius: 20,
                    padding: 18,
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Checkout</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
}

export default Cart;