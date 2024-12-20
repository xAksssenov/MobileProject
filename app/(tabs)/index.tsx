import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  Switch,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Thing } from "@/interface";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function HomeScreen() {
  const [popularThings, setPopularThings] = useState<Thing[]>([]);
  const [catalogThings, setCatalogThings] = useState<Thing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedThing, setSelectedThing] = useState<Thing | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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

  const handleCardPress = (item: Thing) => {
    setSelectedThing(item);
  };

  const closeModal = () => {
    setSelectedThing(null);
  };

  const dispatch = useDispatch();

  const handleAddToCart = (item: Thing) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
    alert(`${item.name} добавлен в корзину!`);
  };

  return (
    <ScrollView
      style={[
        styles.wrapper,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      {Platform.OS === "ios" && (
        <View
          style={[
            styles.switchContainer,
            isDarkMode ? styles.darkBackground : styles.lightBackground,
          ]}
        >
          <Text style={[styles.switchText, isDarkMode && styles.darkText]}>
            Изменение темы
          </Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
      )}

      <ThemedView
        style={[
          styles.titleContainer,
          isDarkMode ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <ThemedText
          type="title"
          style={[
            styles.titleText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
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

      <ThemedView
        style={[
          styles.sectionContainer,
          isDarkMode ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <ThemedView
          style={[
            styles.welcomeContainer,
            isDarkMode ? styles.darkBackground : styles.lightBackground,
          ]}
        >
          <ThemedText
            type="subtitle"
            style={[
              styles.welcomeText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Самые популярные модели!
          </ThemedText>
          <ThemedText
            style={[
              styles.welcomeDescription,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Советуем ознакомиться с нашими популярными моделями ниже!
          </ThemedText>
        </ThemedView>

        {loading ? (
          <Text
            style={[
              styles.loadingText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Загрузка...
          </Text>
        ) : (
          <FlatList
            data={popularThings}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <View style={[styles.ThingCard, isDarkMode && styles.darkCard]}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.ThingImage}
                  />
                  <ThemedText
                    style={[
                      styles.ThingTitle,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {item.name}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.ThingPrice,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {item.price} ₽
                  </ThemedText>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ThemedView>

      <ThemedView
        style={[
          styles.sectionContainer,
          isDarkMode ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <ThemedView
          style={[
            styles.welcomeContainer,
            isDarkMode ? styles.darkBackground : styles.lightBackground,
          ]}
        >
          <ThemedText
            type="subtitle"
            style={[
              styles.welcomeText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Давайте оценим весь ассортимент!
          </ThemedText>
          <ThemedText
            style={[
              styles.welcomeDescription,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Советуем ознакомиться с нашим ассортиментом полностью!
          </ThemedText>
        </ThemedView>

        {loading ? (
          <Text
            style={[
              styles.loadingText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Загрузка...
          </Text>
        ) : (
          <FlatList
            data={catalogThings}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <View style={[styles.ThingCard, isDarkMode && styles.darkCard]}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.ThingImage}
                  />
                  <ThemedText
                    style={[
                      styles.ThingTitle,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {item.name}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.ThingPrice,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {item.price} ₽
                  </ThemedText>

                  <TouchableOpacity
                    style={[styles.cartButton, isDarkMode && styles.darkButton]}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Ionicons name="cart-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        )}
      </ThemedView>

      <Modal
        visible={!!selectedThing}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        {selectedThing && (
          <TouchableOpacity style={styles.overlay} onPress={closeModal}>
            <View
              style={[
                styles.modalContainer,
                isDarkMode && styles.darkBackground,
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                {selectedThing?.name}
              </Text>
              <Text
                style={[
                  styles.modalDescription,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                {selectedThing?.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  switchContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  switchText: {
    fontSize: 16,
    color: "black",
  },
  lightBackground: {
    backgroundColor: "white",
  },
  darkBackground: {
    backgroundColor: "#000000",
  },
  lightText: {
    color: "black",
  },
  darkText: {
    color: "white",
  },
  titleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  welcomeContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
  },
  welcomeText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  welcomeDescription: {
    textAlign: "center",
    color: "#555",
  },
  sectionContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
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
    height: 280,
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
  darkCard: {
    backgroundColor: "#555",
    borderColor: "#666",
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
  },
  ThingPrice: {
    fontSize: 14,
    color: "#858585",
    marginBottom: 8,
    textAlign: "center",
  },
  cartButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  darkButton: {
    backgroundColor: "#555",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginVertical: 20,
  },
});
