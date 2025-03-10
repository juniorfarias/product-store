import { useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products: ", products);
  return (
    <Container maxW="container.x1" py={12}>
      <VStack>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        <Text
          fontSize={"x1"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products found 😥{" "}
          <Text
            as="span"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            <Link to={"/create"}>Create a product</Link>
          </Text>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
