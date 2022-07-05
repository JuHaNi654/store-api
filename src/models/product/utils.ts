import productRepository from './productRepository'

type Product = { productId: number, quantity: number}
export default {
  checkStock: async (item: Product) => {
    const product = await productRepository.findById(item.productId);

    if (!product) {
      return {
        result: null,
        error: {
          message: "Product not found",
          property: "productId",
          value: item.productId,
        },
      };
    } else if (product.stock < item.quantity) {
      return {
        result: null,
        error: {
          message: "Not enough products in stock!",
          property: "productId",
          value: item.productId,
        },
      };
    }
    const updatedStock = product.stock - item.quantity;
    return {
      result: { ...product, stock: updatedStock },
      error: null
    };
  }
}