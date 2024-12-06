import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Thing } from "@/interface";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [popularThings, setPopularThings] = useState<Thing[]>([]);
  const [catalogThings, setCatalogThings] = useState<Thing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchThings = async () => {
    try {
      const popularResponse = await fetch(
        "https://1d15b001011cb992.mokky.dev/popular"
      );
      const popularData: Thing[] = await popularResponse.json();
      setPopularThings(popularData);

      const catalogResponse = await fetch(
        "https://1d15b001011cb992.mokky.dev/catalog"
      );
      const catalogData: Thing[] = await catalogResponse.json();
      setCatalogThings(catalogData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThings();
  }, []);

  return (
    <ScrollView style={styles.wrapper}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Магазин одежды
        </ThemedText>
      </ThemedView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sliderContainer}
      >
        <Image
          source={require("../../assets/images/image1.jpg")}
          style={styles.sliderImage}
        />
        <Image
          source={require("../../assets/images/image2.jpg")}
          style={styles.sliderImage}
        />
        <Image
          source={require("../../assets/images/image3.jpg")}
          style={styles.sliderImage}
        />
      </ScrollView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type="subtitle" style={styles.welcomeText}>
            Самые популярные модели!
          </ThemedText>
          <ThemedText style={styles.welcomeDescription}>
            Советуем ознакомиться с нашими популярными моделями ниже!
          </ThemedText>
        </ThemedView>

        {loading ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : (
          <FlatList
            data={popularThings}
            renderItem={({ item }) => (
              <View style={styles.ThingCard}>
                <Image source={{ uri: item.image }} style={styles.ThingImage} />
                <ThemedText style={styles.ThingTitle}>{item.name}</ThemedText>
                <ThemedText style={styles.ThingPrice}>
                  {item.price} ₽
                </ThemedText>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ThemedView>

      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="subtitle" style={styles.welcomeText}>
          Давайте оценим весь ассортимент!
        </ThemedText>
        <ThemedText style={styles.welcomeDescription}>
          Советуем ознакомиться с нашим ассортиментом полностью!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : (
          <FlatList
            data={catalogThings}
            renderItem={({ item }) => (
              <View style={styles.ThingCard}>
                <Image source={{ uri: item.image }} style={styles.ThingImage} />
                <ThemedText style={styles.ThingTitle}>{item.name}</ThemedText>
                <ThemedText style={styles.ThingPrice}>
                  {item.price} ₽
                </ThemedText>

                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => alert("Добавлено в корзину")}
                >
                  <Ionicons name="cart-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "white",
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
  },
  welcomeContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 12,
    backgroundColor: "black",
    borderRadius: 10,
  },
  welcomeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  welcomeDescription: {
    color: "grey",
    textAlign: "center",
  },
  sectionContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    textAlign: "center",
    backgroundColor: "white",
  },
  sliderContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  sliderImage: {
    width: 370,
    height: 270,
    borderRadius: 10,
    marginRight: 10,
  },
  ThingCard: {
    display: "flex",
    justifyContent: "space-between",
    width: 182,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    marginBottom: 8,
  },
  ThingImage: {
    height: 130,
    width: "100%",
  },
  ThingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    textAlign: "center",
    color: "black",
  },
  ThingText: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 4,
    textAlign: "center",
    color: "black",
  },
  ThingPrice: {
    fontSize: 14,
    color: "#858585",
    marginBottom: 8,
    textAlign: "center",
  },
  cartContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
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
    color: "black",
  },
  emptyCartText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginVertical: 20,
  },
});
