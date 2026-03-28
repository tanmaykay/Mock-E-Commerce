import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Clean up
    await prisma.review.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.product.deleteMany()
    await prisma.order.deleteMany()
    await prisma.user.deleteMany()

    const products = [
        // Hardware
        {
            name: 'Alpha VR Headset Premium',
            description: 'The ultimate standalone VR experience with 4K resolution and haptic feedback. Enjoy immersive worlds at TechStore.',
            price: 499.00,
            stock: 50,
            image_url: 'https://images.unsplash.com/photo-1622979146659-052496200293?auto=format&fit=crop&w=800&q=80',
            category: 'Hardware',
            average_rating: 4.8,
            popularity: 95,
        },
        {
            name: 'Titan Graphics Card RTX-M',
            description: 'High-performance GPU for 8K gaming and professional 3D rendering optimized for TechStore users.',
            price: 1199.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
            category: 'Hardware',
            average_rating: 4.9,
            popularity: 98,
        },
        {
            name: 'TechSync WebCam 4K Pro',
            description: 'Auto-tracking webcam with noise-canceling dual microphones. Perfect for streaming and meetings at TechStore.',
            price: 149.00,
            stock: 100,
            image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
            category: 'Hardware',
            average_rating: 4.5,
            popularity: 80,
        },
        {
            name: 'Precision Gamer Mouse Pad X',
            description: 'Ultra-low friction surface for competitive gaming precision. A TechStore exclusive for professional gamers.',
            price: 29.99,
            stock: 200,
            image_url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80',
            category: 'Hardware',
            average_rating: 4.2,
            popularity: 60,
        },
        {
            name: 'Mechanical Gaming Keyboard',
            description: 'RGB Backlit mechanical keyboard with custom switches and TechStore exclusive keycaps.',
            price: 159.99,
            stock: 30,
            image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
            category: 'Hardware',
            average_rating: 4.7,
            popularity: 88,
        },

        // Software
        {
            name: 'Cipher Suite OS v2',
            description: 'Privacy-focused operating system with integrated AI assistant exclusively for TechStore customers.',
            price: 109.00,
            stock: 1000,
            image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            category: 'Software',
            average_rating: 4.7,
            popularity: 90,
        },
        {
            name: 'Logic Pro Editor',
            description: 'AI-driven code editor for developers who want to write clean code faster in the TechStore ecosystem.',
            price: 89.00,
            stock: 1000,
            image_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
            category: 'Software',
            average_rating: 4.6,
            popularity: 85,
        },
        {
            name: 'Cloud Armor VPS',
            description: 'Scalable cloud server hosting with 99.99% uptime guarantee for TechStore enterprise partners.',
            price: 59.00,
            stock: 500,
            image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            category: 'Software',
            average_rating: 4.3,
            popularity: 70,
        },

        // Firmware
        {
            name: 'Quantum Kernel Patch X',
            description: 'Micro-kernel optimization for massive parallel computing tasks on high-end TechStore hardware.',
            price: 299.00,
            stock: 100,
            image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            category: 'Firmware',
            average_rating: 4.9,
            popularity: 92,
        },
        {
            name: 'Edge Router Firmware',
            description: 'Improve network stability and low-latency packet routing for TechStore smart homes.',
            price: 39.99,
            stock: 300,
            image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
            category: 'Firmware',
            average_rating: 4.3,
            popularity: 65,
        },
        {
            name: 'Smart BIOS Update Pro',
            description: 'Secure BIOS update for next-gen motherboard compatibility. Fast, safe, and certified by TechStore.',
            price: 19.00,
            stock: 10000,
            image_url: 'https://images.unsplash.com/photo-1558494949-ef0109121c0b?auto=format&fit=crop&w=800&q=80',
            category: 'Firmware',
            average_rating: 4.5,
            popularity: 78,
        },
    ]

    for (const p of products) {
        const product = await prisma.product.create({
            data: {
                ...p,
                reviews: {
                    create: [
                        { user_name: 'TechExpert', rating: 5, comment: 'Simply the best in its class!' },
                        { user_name: 'EarlyAdopter', rating: 5, comment: 'I buy all my tech at TechStore. Exceptional quality.' },
                        { user_name: 'Reviewer1', rating: 4, comment: 'Reliable product, decent price.' }
                    ]
                }
            },
        })
        console.log(`Created product with id: ${product.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
