import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { login as loginApi } from '../../services/auth';
import { showToast } from '../../services/toast';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      showToast('error', 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน');
      return;
    }

    setLoading(true);
    try {
      const data = await loginApi(username, password);
      await login(data);
      showToast('success', 'เข้าสู่ระบบสำเร็จ!');
    } catch (error: any) {
      showToast('error', error.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header Bar */}
      <View className="px-6 py-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Text className="text-blue-600 text-xl font-bold">←</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 justify-center"
      >
        {/* Welcome Text Section */}
        <View className="mb-10 items-center">
          <View className="w-20 h-20 bg-blue-100 rounded-3xl items-center justify-center mb-4">
            <Text className="text-4xl">🔐</Text>
          </View>
          <Text className="text-3xl font-black text-gray-900 text-center">
            ยินดีต้อนรับกลับมา
          </Text>
          <Text className="text-gray-500 mt-2 text-base text-center">
            กรุณาเข้าสู่ระบบเพื่อจัดการหนังสือของคุณ
          </Text>
        </View>

        {/* Login Card */}
        <View className="bg-white p-8 rounded-[32px] shadow-xl shadow-blue-100/40 border border-gray-50">
          <View className="space-y-5">
            
            {/* Username Input */}
            <View>
              <Text className="text-gray-700 ml-1 mb-2 font-bold text-sm">ชื่อผู้ใช้งาน</Text>
              <TextInput
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 focus:border-blue-500"
                placeholder="ระบุชื่อผู้ใช้งานของคุณ"
                placeholderTextColor="#9ca3af"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-700 ml-1 font-bold text-sm">รหัสผ่าน</Text>
                {/* แถมปุ่มลืมรหัสผ่านเล็กๆ ให้ดูสมจริงแบบเว็บ */}
                <TouchableOpacity>
                  <Text className="text-blue-500 text-xs font-semibold">ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-800 focus:border-blue-500"
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className={`mt-10 p-4 rounded-2xl items-center shadow-lg ${
              loading ? 'bg-blue-400' : 'bg-blue-600 shadow-blue-200'
            }`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white font-extrabold text-lg">
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <TouchableOpacity 
            className="mt-6 py-2" 
            onPress={() => router.push('../auth/register')}
          >
            <Text className="text-center text-gray-500">
              ยังไม่มีบัญชีสมาชิก? <Text className="text-blue-600 font-bold">สมัครเลย</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Decorative Text */}
        <Text className="text-gray-400 text-center mt-10 text-xs tracking-tighter">
          ความปลอดภัยข้อมูลของคุณคือความสำคัญอันดับหนึ่งของเรา
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}