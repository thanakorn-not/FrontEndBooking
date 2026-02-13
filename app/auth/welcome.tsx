import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <StatusBar style="dark" />

      {/* Full Screen Card */}
      <View className="flex-1 bg-white rounded-t-3xl px-8 py-12 justify-between">

        {/* Top Content */}
        <View className="mt-10">
          <View className="w-24 h-24 bg-blue-600 rounded-2xl items-center justify-center mb-8">
            <Text className="text-white text-4xl font-bold">📚</Text>
          </View>

          <Text className="text-3xl font-bold text-gray-900 leading-tight">
            My Library
          </Text>

          <Text className="text-gray-500 mt-4 text-base leading-6 pr-6">
            ระบบจัดการห้องสมุดที่ช่วยให้คุณ
            จัดการหนังสือ ยืม-คืน และสมาชิก
            ได้อย่างง่ายดาย
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View>
          <TouchableOpacity
            className="bg-blue-600 py-5 rounded-2xl mb-4"
            onPress={() => router.push('../auth/login')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 py-5 rounded-2xl"
            onPress={() => router.push('../auth/register')}
          >
            <Text className="text-gray-800 text-center font-semibold text-lg">
              ลงทะเบียนสมาชิก
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-400 text-center mt-8 text-xs">
            © 2026 My Library Project
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
