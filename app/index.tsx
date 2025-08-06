import { useQuoteStore } from "@/store/useQuoteStore";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { quotes } from "./data/quotes";

export default function Home() {
  const [todayQuote, setTodayQuote] = useState(quotes[0]);
  const addFavorite = useQuoteStore((state) => state.addFavorite);

  useEffect(() => {
    // const index = new Date().getDate() % quotes.length;
    // setTodayQuote(quotes[index]);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setTodayQuote(quotes[randomIndex]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>&quot;{todayQuote.text}&quot;</Text>
      <Text style={styles.author}>- {todayQuote.author}</Text>
      <Button title="즐겨찾기 추가" onPress={() => addFavorite(todayQuote)} />
      <Button title="다음 명언 보기" onPress={() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setTodayQuote(quotes[randomIndex]);
      }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  quote: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
  author: { fontSize: 16, fontStyle: 'italic', marginBottom: 20 },
});