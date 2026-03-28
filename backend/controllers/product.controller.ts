import { Request, Response } from 'express';
import * as productService from '../services/product.service.js';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, search, sortBy } = req.query;
        const products = await productService.getAllProducts({
            category: category as string,
            search: search as string,
            sortBy: sortBy as string,
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(Number(id));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

export const addProductReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_name, rating, comment } = req.body;
        const review = await productService.addReview(Number(id), { user_name, rating, comment });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
    }
};
