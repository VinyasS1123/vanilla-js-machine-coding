const baseProducts = [
    { id: 1, title: "Wireless Mouse", category: "Electronics", price: 25 },
    { id: 2, title: "Mechanical Keyboard", category: "Electronics", price: 75 },
    { id: 3, title: "USB-C Charger", category: "Electronics", price: 30 },
    { id: 4, title: "Bluetooth Speaker", category: "Electronics", price: 90 },
    { id: 5, title: "Gaming Headset", category: "Electronics", price: 110 },

    { id: 6, title: "Running Shoes", category: "Footwear", price: 120 },
    { id: 7, title: "Casual Sneakers", category: "Footwear", price: 85 },
    { id: 8, title: "Leather Boots", category: "Footwear", price: 160 },
    { id: 9, title: "Flip Flops", category: "Footwear", price: 20 },
    { id: 10, title: "Sports Sandals", category: "Footwear", price: 55 },

    { id: 11, title: "Coffee Mug", category: "Home", price: 18 },
    { id: 12, title: "Table Lamp", category: "Home", price: 42 },
    { id: 13, title: "Wall Clock", category: "Home", price: 35 },
    { id: 14, title: "Office Chair", category: "Home", price: 210 },
    { id: 15, title: "Study Desk", category: "Home", price: 320 },

    { id: 16, title: "Backpack", category: "Accessories", price: 65 },
    { id: 17, title: "Travel Bag", category: "Accessories", price: 140 },
    { id: 18, title: "Leather Wallet", category: "Accessories", price: 38 },
    { id: 19, title: "Sunglasses", category: "Accessories", price: 70 },
    { id: 20, title: "Wrist Watch", category: "Accessories", price: 180 },

    { id: 21, title: "Novel Book", category: "Books", price: 22 },
    { id: 22, title: "JavaScript Guide", category: "Books", price: 48 },
    { id: 23, title: "React Handbook", category: "Books", price: 55 },
    { id: 24, title: "Clean Code", category: "Books", price: 60 },
    { id: 25, title: "System Design", category: "Books", price: 75 },

    { id: 26, title: "Cricket Bat", category: "Sports", price: 130 },
    { id: 27, title: "Football", category: "Sports", price: 40 },
    { id: 28, title: "Basketball", category: "Sports", price: 38 },
    { id: 29, title: "Yoga Mat", category: "Sports", price: 28 },
    { id: 30, title: "Dumbbell Set", category: "Sports", price: 150 },

    { id: 31, title: "Water Bottle", category: "Fitness", price: 20 },
    { id: 32, title: "Protein Shaker", category: "Fitness", price: 18 },
    { id: 33, title: "Resistance Bands", category: "Fitness", price: 35 },
    { id: 34, title: "Skipping Rope", category: "Fitness", price: 15 },
    { id: 35, title: "Gym Gloves", category: "Fitness", price: 25 },

    { id: 36, title: "Smartphone Stand", category: "Electronics", price: 14 },
    { id: 37, title: "Laptop Sleeve", category: "Accessories", price: 32 },
    { id: 38, title: "Portable SSD", category: "Electronics", price: 145 },
    { id: 39, title: "Monitor", category: "Electronics", price: 280 },
    { id: 40, title: "Webcam", category: "Electronics", price: 68 },
];

const allProducts = [];

for (let i = 1; i <= 5; i++) {
    for (const product of baseProducts) {
        allProducts.push({
            ...product,
            id: allProducts.length + 1,
            title: `${product.title} ${i}`
        });
    }
}