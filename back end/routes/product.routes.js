import express from 'express';
import controllers from '../controllers/index.js';

const productRouter = express.Router();
productRouter.post('/', controllers.productController.create);
productRouter.get('/', controllers.productController.getAll);
productRouter.get('/:id', controllers.productController.getProductById);
productRouter.delete('/:id', controllers.productController.deleteById);

export default productRouter;