import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    // We'll return true if it's already there, false if it's a new add
    addToCart: (product) => {
        let alreadyExists = false;
        set((state) => {
            const existing = state.cart.find((item) => item.id === product.id);
            if (existing) {
                alreadyExists = true;
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        });
        return alreadyExists;
    },
    updateQuantity: (id, amount) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        ),
    })),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),
    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
