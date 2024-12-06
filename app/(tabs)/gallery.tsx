import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { UploadedImage } from "@/interface";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";

export default function GalleryScreen() {
  const [uploadedThings, setUploadedThings] = useState<UploadedImage[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const fetchUploadedThings = async () => {
      setLoadingImage(true);
      try {
        const response = await fetch(
          "https://1d15b001011cb992.mokky.dev/uploads"
        );
        const data: UploadedImage[] = await response.json();
        setUploadedThings(data);
      } catch (error) {
        console.error("Ошибка загрузки загруженных фото:", error);
      } finally {
        setLoadingImage(false);
      }
    };

    fetchUploadedThings();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Необходимо разрешение для доступа к вашей галерее.");
      return false;
    }
    return true;
  };

  const fetchUpload = async (uri: string) => {
    setLoadingImage(true);
    const formData = new FormData();
    const fileName = uri.split("/").pop();
    formData.append("file", { uri, name: fileName, type: "image/jpeg" } as any);

    try {
      const response = await fetch(
        "https://1d15b001011cb992.mokky.dev/uploads",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        alert("Фото добавлено успешно!");
        const newImage: UploadedImage = await response.json();
        setUploadedThings([...uploadedThings, newImage]);
      } else alert("Ошибка при добавлении фото");
    } catch (error) {
      alert("Произошла ошибка при добавлении фото");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleImagePick = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        await fetchUpload(imageUri);
      } else {
        console.log("Пользователь отменил действие");
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Наш фотоальбом
        </ThemedText>

        {loadingImage ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : (
          <FlatList
            nestedScrollEnabled={true}
            data={uploadedThings}
            renderItem={({ item }) => (
              <View style={styles.thingCardGrid}>
                <Image source={{ uri: item.url }} style={styles.thingImage} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          <Text style={styles.uploadButtonText}>+</Text>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
  thingCardGrid: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  uploadButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  uploadButtonText: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
  sectionContainer: {
    marginTop: 50,

    marginHorizontal: 8,
    marginVertical: 8,
    textAlign: "center",
    backgroundColor: "white",
  },
  sectionTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    marginBottom: 8,
  },
  cartContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  loadingText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginVertical: 20,
  },
  thingImage: {
    height: 150,
    width: "100%",
    borderRadius: 12,
  },
});
