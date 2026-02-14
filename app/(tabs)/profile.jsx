import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, User, ChevronRight, Settings, Bell, Shield } from 'lucide-react-native';
import { useAppStyles } from '../_Styles';

const Profile = () => {
    const router = useRouter();
    const { styles, theme, isDark } = useAppStyles();

    const handleLogout = () => {
        router.replace('/');
    };

    const ProfileOption = ({ icon: Icon, label }) => (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: theme.recentBorder
        }}>
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.reorderBtn,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15
            }}>
                <Icon color={theme.primary} size={20} />
            </View>
            <Text style={{ flex: 1, fontSize: 16, color: theme.textMain, fontWeight: '500' }}>{label}</Text>
            <ChevronRight color={theme.textMuted} size={20} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, padding: 25 }}>
                {/* Profile Header */}
                <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: theme.recentBorder,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 15
                    }}>
                        <User color={theme.textMuted} size={50} />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: theme.textMain }}>Alex Johnson</Text>
                    <Text style={{ fontSize: 14, color: theme.textMuted, marginTop: 5 }}>alex.j@example.com</Text>
                </View>

                {/* Profile Options */}
                <View style={{ backgroundColor: theme.card, borderRadius: 20, paddingHorizontal: 15 }}>
                    <ProfileOption icon={Settings} label="Account Settings" />
                    <ProfileOption icon={Bell} label="Notifications" />
                    <ProfileOption icon={Shield} label="Privacy & Security" />
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 'auto',
                        marginBottom: 20,
                        paddingVertical: 15,
                        borderRadius: 15,
                        backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEE2E2',
                    }}
                >
                    <LogOut color="#EF4444" size={20} style={{ marginRight: 10 }} />
                    <Text style={{ color: '#EF4444', fontSize: 16, fontWeight: '700' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
