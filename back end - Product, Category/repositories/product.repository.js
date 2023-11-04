import Product from '../models/product.model.js';
import Image from '../models/image.model.js';
import Category from '../models/category.model.js';

const productRepository = {
  create: async ({ name, price, images = [], category }) => {
    const docCategory = await Category.findOne({ name: category })
      .then((docCategory) => {
        if (!docCategory) {
          throw new Error("Category doesn' exist");
        }
        return docCategory;
      })
      .catch((err) => {
        console.log(err.toString());
      });
    const docProduct = await Product.create({
      name,
      price,
      category: docCategory._id,
    })
      .then((docProduct) => {
        if (!docProduct) {
          throw new Error("Creat product failed");
        }
        return docProduct;
      })
      .catch((err) => {
        console.log(err.toString());
      });
    images.map(({ url, caption, path }) => {
      Image.create({ url, caption, path, createdAt: Date.now() }).then(
        (docImage) => {
          console.log(docProduct);
          return Product.findByIdAndUpdate(docProduct._id, {
            $push: {
              images: {
                _id: docImage._id,
                url: url,
                caption: caption,
              },
            },
          });
        }
      );
    });
  },

    getAll: async () => {
        const product = await Product.find().populate('category');
        return product
    },
    getProductById: async (id) => {
        try {
          const product = await Product.findById(id)
            .populate('category')
          return product;
        } catch (error) {
          throw new Error('Unable to get the product by ID');
        }
    },
    deleteById: async (id) => {
        try {
          const product = await Product.deleteOne({ _id: id });
          if (product.deletedCount === 0) {
            throw new Error('Product not found');
          }
          return product;
        } catch (error) {
          throw new Error('Unable to delete the product by ID: ' + error.message);
        }
    }
    

};

export default productRepository;