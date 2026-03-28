import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (filters: { category?: string; search?: string; sortBy?: string } = {}) => {
    let orderBy = {};
    if (filters.sortBy === 'price-low') orderBy = { price: 'asc' };
    else if (filters.sortBy === 'price-high') orderBy = { price: 'desc' };
    else if (filters.sortBy === 'rating') orderBy = { average_rating: 'desc' };
    else if (filters.sortBy === 'popularity') orderBy = { popularity: 'desc' };

    return await prisma.product.findMany({
        where: {
            AND: [
                filters.category ? { category: { equals: filters.category } } : {},
                filters.search ? { name: { contains: filters.search } } : {},
            ],
        },
        orderBy,
    });
};

export const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id },
        include: { reviews: { orderBy: { created_at: 'desc' } } },
    });
};

export const addReview = async (productId: number, data: { user_name: string; rating: number; comment: string }) => {
    const review = await prisma.review.create({
        data: {
            ...data,
            product_id: productId,
        },
    });

    // Update average rating
    const reviews = await prisma.review.findMany({ where: { product_id: productId } });
    const average = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length;

    await prisma.product.update({
        where: { id: productId },
        data: { average_rating: average },
    });

    return review;
};
