import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';

import { getAllBooks } from '../../services/book';
import { borrowBook } from '../../services/borrowing';
import { showToast } from '../../services/toast';
import { CustomModal } from '../../components/CustomModal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UserBookScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch {
      showToast('error', 'โหลดข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const openBorrowModal = (book: any) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleConfirmBorrow = async () => {
    if (!selectedBook) return;

    try {
      await borrowBook(selectedBook.book_id, returnDate);
      showToast('success', 'ยืมหนังสือสำเร็จ');
      setModalVisible(false);
      fetchBooks();
    } catch (error: any) {
      showToast('error', error.error || 'ไม่สามารถยืมได้');
    }
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || returnDate;
    setShowDatePicker(Platform.OS === 'ios');
    setReturnDate(currentDate);
  };

  const renderBookItem = ({ item }: any) => (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-slate-100">
      <View className="flex-row justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-slate-800">
            {item.title}
          </Text>

          <Text className="text-slate-500 text-sm mt-1">
            {item.author}
          </Text>

          <Text className="text-slate-400 text-xs mt-2">
            {item.BookType?.book_type_name || 'General'}
          </Text>
        </View>

        <View className="items-end justify-between">
          <View
            className={`px-3 py-1 rounded-full ${
              item.status === 'available'
                ? 'bg-emerald-50'
                : 'bg-rose-50'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                item.status === 'available'
                  ? 'text-emerald-600'
                  : 'text-rose-600'
              }`}
            >
              {item.status === 'available' ? 'Available' : 'Borrowed'}
            </Text>
          </View>

          {item.status === 'available' && (
            <TouchableOpacity
              className="bg-indigo-600 px-4 py-2 rounded-xl mt-4 shadow-sm active:opacity-80"
              onPress={() => openBorrowModal(item)}
            >
              <Text className="text-white text-xs font-semibold tracking-wide">
                Borrow
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-100 pt-14 px-6">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-slate-800 tracking-tight">
          Library
        </Text>
        <Text className="text-slate-400 mt-1 text-sm">
          Browse and borrow available books
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.book_id.toString()}
          renderItem={renderBookItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <Text className="text-center text-slate-400 mt-10">
              ไม่มีหนังสือในระบบ
            </Text>
          }
        />
      )}

      {/* Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirm Borrow"
      >
        <View className="mt-2">
          <Text className="text-slate-500 text-center text-sm">
            You are borrowing
          </Text>

          <Text className="text-xl font-semibold text-indigo-600 text-center mt-2 mb-6">
            {selectedBook?.title}
          </Text>

          <Text className="text-slate-600 mb-2 font-medium">
            Return Date
          </Text>

          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={returnDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setReturnDate(new Date(e.target.value))
              }
              style={{
                padding: 14,
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                width: '100%',
                fontSize: 15
              }}
              min={new Date().toISOString().split('T')[0]}
            />
          ) : (
            <>
              <TouchableOpacity
                className="bg-white p-4 rounded-2xl border border-slate-200"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-center text-slate-700">
                  {returnDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={returnDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </>
          )}

          <View className="flex-row mt-8">
            <TouchableOpacity
              className="flex-1 bg-slate-200 p-4 rounded-2xl mr-3"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-slate-600 text-center font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-indigo-600 p-4 rounded-2xl shadow-sm"
              onPress={handleConfirmBorrow}
            >
              <Text className="text-white text-center font-semibold tracking-wide">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </View>
  );
}
