import { FlatList, Text, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Thing } from "@/interface";

export default function CartScreen() {
  const [cart, setCart] = useState<Thing[]>([]);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.cartTitle}>
        Корзина
      </ThemedText>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>
                {item.name} - {item.price} ₽
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyCartText}>Ваша корзина пуста.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cartItemText: {
    fontSize: 16,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});
