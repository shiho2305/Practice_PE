import repositories from "../repositories/index.js";

const productController = {
    create: async (req, res) => {
        try {
            const {name, price,discountPercentage, image,quantity, category} = req.body;
            const product = await repositories.productRepository.create(req.body);
            res.status(200).send({
                product,
                message: "Product created successfully"
            });
        } catch (err) {
            res.status(400).send({ message: 'Product created Fail' });
        }
    },
    getAll: async (req, res) => {
        try {
            const products = await repositories.productRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            res.status(404).send({ message: 'Not found' });
        }
    },
    getProductById: async (req, res) => {
        try {
          const {id} = req.params;
          const product = await repositories.productRepository.getProductById(id);
          res.status(200).send(product);
        } catch (error) {
          throw new Error('Unable to get the product by ID');
        }
    },
    deleteById: async (req, res) => {
        try {
            const {id} = req.params;
            const product = await repositories.productRepository.deleteById(id);
            res.status(200).send(product);
        } catch (error) {
            console.log(error)
            throw new Error('Unable to get the product by ID');
        }
    }

};
export default productController;