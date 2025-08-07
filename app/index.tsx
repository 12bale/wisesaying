import { useQuoteStore } from "@/store/useQuoteStore";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { quotes } from "./data/quotes";



export default function Home() {
  const [todayQuote, setTodayQuote] = useState(quotes[0]);
  const addFavorite = useQuoteStore((state) => state.addFavorite);
  const favorites = useQuoteStore((state) => state.favorites);
  const isFavorite = useQuoteStore((state) => state.isFavorite);
  const removeFavorite = useQuoteStore((state) => state.removeFavorite);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setTodayQuote(quotes[randomIndex]);
  }, []);

  const handleToggleFavorite = () => {
    if (isFavorite(todayQuote)) {
      removeFavorite(todayQuote);
    } else {
      addFavorite(todayQuote);
    }
  };

  const displayText = isFavorite(todayQuote) ? `⭐ "${todayQuote.text}"` : `"${todayQuote.text}"`;

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text>Today&#39;s Quote</Text>
        <Text style={styles.quote}>{displayText}</Text>
        <Text style={styles.author}>- {todayQuote.author}</Text>
      </View>

      <Button
        title={isFavorite(todayQuote) ? '즐겨찾기 제거' : '즐겨찾기 추가'}
        onPress={handleToggleFavorite}
      />

      {/* <Button title="즐겨찾기 추가" onPress={() => addFavorite(todayQuote)} /> */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="다음 명언 보기"
          onPress={() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setTodayQuote(quotes[randomIndex]);
          }}
        />
      </View>

      <Text style={{ marginTop: 30, fontWeight: 'bold', marginBottom: 20 }}>⭐ 즐겨찾기 목록</Text>

      {favorites.length === 0 ? (
        <Text>아직 즐겨찾기한 명언이 없습니다.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteRow}>
              <Text style={styles.favoriteItem}>⭐ &quot;{item.text}&quot; - {item.author}</Text>
              <TouchableOpacity onPress={() => removeFavorite(item)}>
                <Text style={styles.removeBtn}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 80 },
  quote: { fontSize: 20, marginVertical: 10, textAlign: 'center' },
  author: { fontSize: 16, fontStyle: 'italic', marginBottom: 10, textAlign: 'center' },
  favoriteItem: { marginBottom: 6, fontSize: 16, flex: 1 },
  favoriteRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 10 },
  removeBtn: { color: 'red', fontSize: 14 },
});
