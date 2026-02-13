import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      <View className="flex-1 items-center justify-center px-6">
        
        {/* Main Content Card */}
        <View 
          className="bg-white p-10 rounded-[40px] shadow-2xl shadow-blue-200/50 items-center w-full max-w-md"
          style={{ elevation: 10 }}
        >
          {/* Logo Section */}
          <View className="mb-10">
            <View className="w-24 h-24 bg-blue-600 rounded-3xl items-center justify-center shadow-lg transform -rotate-3">
              <Text className="text-white text-5xl">📚</Text>
            </View>
            {/* ตกแต่งเงาหลังโลโก้เล็กน้อย */}
            <View className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-100 rounded-3xl -z-10 transform rotate-6" />
          </View>

          {/* Text Content */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-black text-gray-900 tracking-tight">
              My Library
            </Text>
            <View className="h-1 w-12 bg-blue-500 rounded-full mt-2 mb-4" />
            <Text className="text-center text-gray-500 text-base leading-6 px-2">
              ยกระดับการจัดการห้องสมุดของคุณ{"\n"}
              ให้เป็นเรื่องง่าย สะดวก และทันสมัย
            </Text>
          </View>

          {/* Buttons Group */}
          <View className="w-full space-y-4">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-blue-600 py-4 rounded-2xl shadow-xl shadow-blue-300"
              onPress={() => router.push('../auth/login')}
            >
              <Text className="text-white text-center font-bold text-lg">
                เข้าสู่ระบบตอนนี้
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-white py-4 rounded-2xl border-2 border-gray-100"
              onPress={() => router.push('../auth/register')}
            >
              <Text className="text-blue-600 text-center font-bold text-lg">
                ลงทะเบียนสมาชิก
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Detail */}
          <View className="mt-10 items-center">
            <Text className="text-gray-400 text-xs tracking-widest uppercase">
              Powered by My Library Cloud
            </Text>
          </View>
        </View>

        {/* Decorative Elements (Optional) */}
        <Text className="text-gray-300 text-sm mt-8">
          © 2026 My Library Project. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}