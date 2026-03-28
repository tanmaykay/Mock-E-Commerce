import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductDetails);
router.post('/:id/reviews', productController.addProductReview);

export default router;
