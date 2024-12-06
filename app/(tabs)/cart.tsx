import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  FlexAlignType,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";

export default function CartScreen() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const increaseQuantity = (id: string) => {
    const item = cart.find((item: { id: string }) => item.id === id);
    const newQuantity = (item?.quantity ?? 0) + 1;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const decreaseQuantity = (id: string) => {
    const currentQuantity = cart.find(
      (item: { id: string }) => item.id === id
    )?.quantity;
    if (currentQuantity && currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? // @ts-expect-error
          parseFloat(item.price.replace(",", ""))
        : item.price;

    if (typeof price === "number" && typeof item.quantity === "number") {
      return sum + price * item.quantity;
    }

    return sum;
  }, 0);

  const containerStyle = {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  };

  const textColor = {
    color: "black",
  };

  const cartItemStyle = {
    flexDirection: "row" as "row" | "column",
    alignItems: "center" as FlexAlignType,
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    backgroundColor: "#000000",
  };

  return (
    <View style={containerStyle}>
      <ThemedText type="subtitle" style={[styles.cartTitle, textColor]}>
        Корзина
      </ThemedText>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => {
            if (!item.price || !item.quantity) return null;

            return (
              <View style={cartItemStyle}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartItemImage}
                />
                <View style={styles.cartItemDetails}>
                  <ThemedText style={[styles.cartItemText, textColor]}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={[styles.cartItemText, textColor]}>
                    {item.price} ₽ за единицу
                  </ThemedText>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.id)}
                      style={[styles.quantityButton, buttonStyle]}
                    >
                      <ThemedText style={styles.quantityButtonText}>
                        -
                      </ThemedText>
                    </TouchableOpacity>
                    <ThemedText style={styles.quantityText}>
                      {item.quantity}
                    </ThemedText>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(item.id)}
                      style={[styles.quantityButton, buttonStyle]}
                    >
                      <ThemedText style={styles.quantityButtonText}>
                        +
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                  <Button
                    title="Удалить"
                    onPress={() => removeFromCartHandler(item.id)}
                    color="#000000"
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ThemedText>Ваша корзина пуста</ThemedText>
      )}
      {cart.length > 0 ? (
        <ThemedText style={styles.totalPrice}>
          Итого: {totalPrice.toFixed(2)} ₽
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cartTitle: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
    flexDirection: "column",
  },
  cartItemText: {
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  quantityButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    color: "black",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#000000",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});
