import { Colors } from "@/constants/theme";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  details?: Details;
}
interface Details {
  materials: string;
  difficulty: string;
  estimatedTime: string;
  likes: number;
  shoppers: number;
  autor: string;
}

export default function Products() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "10 patrones en 1 de animalitos super lindos",
      description:
        "Hermoso set de amigurumis de animalitos para cualquier ocasión 🧸",
      price: 150,
      image: require("@/assets/images/amigurumi1.png"),
      details: {
        materials:
          "Hilo de algodón, aguja de crochet, relleno, ojos de seguridad",
        difficulty: "Fácil",
        estimatedTime: "4-6 horas",
        likes: 120,
        shoppers: 266,
        autor: "c.craftycreationss",
      },
    },
    {
      id: 2,
      name: "Lindo gatito siames, sin costuras",
      description: "Lindo patrón de gatito siamés, gratis 🐱",
      price: 0,
      image: require("@/assets/images/amigurumi2.png"),
      details: {
        materials:
          "Hilo de algodón, aguja de crochet, relleno, fieltro color negro",
        difficulty: "Fácil",
        estimatedTime: "2-4 horas",
        likes: 212,
        shoppers: 346,
        autor: "nessie_crochet",
      },
    },
    {
      id: 3,
      name: "Caballerito de Hollow Knight, nivel intermedio",
      description:
        "Patrón de caballerito de Hollow Knight, nivel intermedio 🗡️",
      price: 230,
      image: require("@/assets/images/amigurumi3.png"),
      details: {
        materials:
          "Hilo de algodón, aguja de crochet, relleno, ojos de seguridad",
        difficulty: "Intermedio",
        estimatedTime: "6-8 horas",
        likes: 150,
        shoppers: 15,
        autor: "just_yarny",
      },
    },
    {
      id: 4,
      name: "Pocchaco y pollito, nivel fácil",
      description: "Lindo patrón de pochhaco y su pollito 🐥",
      price: 120,
      image: require("@/assets/images/Amigurumi4.png"),
      details: {
        materials:
          "Hilo de algodón, aguja de crochet, relleno, fieltro color café",
        difficulty: "Fácil",
        estimatedTime: "5-6 horas",
        likes: 80,
        shoppers: 100,
        autor: "bunny_crochet",
      },
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Eurigurumis</Text>
      </View>
      <ScrollView>
        <View style={styles.ViewTop}>
          <Text style={{ color: colors.text, fontSize: 27 }}>
            Patrones amigurumi 🧶
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.viewCard}>
              <View style={styles.imageContainer}>
                <Image source={product.image} style={styles.productImage} />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.buttonAdd,
                      { backgroundColor: pressed ? "#512da8" : "#9575cd" },
                    ]}
                    onPress={() => {
                      Alert.alert(
                        "Agregado al carrito",
                        `${product.name} Fue agregado al carrito.`
                      );
                    }}
                  >
                    <Text style={styles.addIcon}>🛒</Text>
                    <Text style={styles.buttonText}>Agregar</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.buttonDetails,
                      { backgroundColor: pressed ? "#9575cd" : "#d1c4e9" },
                    ]}
                    onPress={() => openModal(product)}
                  >
                    <Text style={styles.detailsIcon}>🔍</Text>
                    <Text style={styles.detailsText}>Detalles</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={selectedProduct.image}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedProduct.description}
                </Text>
                <Text style={styles.modalPrice}>
                  Precio: ${selectedProduct.price}
                </Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Text style={styles.modalDescription}>
                    Likes: {selectedProduct.details?.likes}
                  </Text>
                  <Text style={styles.modalDescription}>
                    Ventas: {selectedProduct.details?.shoppers}
                  </Text>
                </View>
                <Text style={styles.modalDescription}>
                  Materiales: {selectedProduct.details?.materials}
                </Text>
                <Text style={styles.modalDescription}>
                  Dificultad: {selectedProduct.details?.difficulty}
                </Text>
                <Text style={styles.modalDescription}>
                  Tiempo estimado: {selectedProduct.details?.estimatedTime}
                </Text>
                <Text style={styles.modalDescription}>
                  Creadora: {selectedProduct.details?.autor}
                </Text>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ViewTop: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
  },
  header: {
    backgroundColor: "#9575cd",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 20,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  viewCard: {
    width: "48%",
    borderRadius: 10,
    backgroundColor: "#ede7f6",
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  productDetails: {
    alignItems: "flex-start",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
    justifyContent: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  addIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  buttonDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  detailsIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  detailsText: {
    color: "#512da8",
    fontSize: 14,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#512da8",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#9575cd",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#9575cd",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
