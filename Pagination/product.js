const baseProducts = [
    { title: "Wireless Mouse", category: "Electronics", price: 25 },
    { title: "Mechanical Keyboard", category: "Electronics", price: 75 },
    { title: "USB-C Charger", category: "Electronics", price: 30 },
    { title: "Bluetooth Speaker", category: "Electronics", price: 90 },
    { title: "Gaming Headset", category: "Electronics", price: 110 },

    { title: "Running Shoes", category: "Footwear", price: 120 },
    { title: "Casual Sneakers", category: "Footwear", price: 85 },
    { title: "Leather Boots", category: "Footwear", price: 160 },
    { title: "Flip Flops", category: "Footwear", price: 20 },
    { title: "Sports Sandals", category: "Footwear", price: 55 },

    { title: "Coffee Mug", category: "Home", price: 18 },
    { title: "Table Lamp", category: "Home", price: 42 },
    { title: "Wall Clock", category: "Home", price: 35 },
    { title: "Office Chair", category: "Home", price: 210 },
    { title: "Study Desk", category: "Home", price: 320 },

    { title: "Backpack", category: "Accessories", price: 65 },
    { title: "Travel Bag", category: "Accessories", price: 140 },
    { title: "Leather Wallet", category: "Accessories", price: 38 },
    { title: "Sunglasses", category: "Accessories", price: 70 },
    { title: "Wrist Watch", category: "Accessories", price: 180 },

    { title: "Novel Book", category: "Books", price: 22 },
    { title: "JavaScript Guide", category: "Books", price: 48 },
    { title: "React Handbook", category: "Books", price: 55 },
    { title: "Clean Code", category: "Books", price: 60 },
    { title: "System Design", category: "Books", price: 75 },

    { title: "Cricket Bat", category: "Sports", price: 130 },
    { title: "Football", category: "Sports", price: 40 },
    { title: "Basketball", category: "Sports", price: 38 },
    { title: "Yoga Mat", category: "Sports", price: 28 },
    { title: "Dumbbell Set", category: "Sports", price: 150 },

    { title: "Water Bottle", category: "Fitness", price: 20 },
    { title: "Protein Shaker", category: "Fitness", price: 18 },
    { title: "Resistance Bands", category: "Fitness", price: 35 },
    { title: "Skipping Rope", category: "Fitness", price: 15 },
    { title: "Gym Gloves", category: "Fitness", price: 25 },

    { title: "Smartphone Stand", category: "Electronics", price: 14 },
    { title: "Laptop Sleeve", category: "Accessories", price: 32 },
    { title: "Portable SSD", category: "Electronics", price: 145 },
    { title: "Monitor", category: "Electronics", price: 280 },
    { title: "Webcam", category: "Electronics", price: 68 },

    { title: "Power Bank", category: "Electronics", price: 49 },
    { title: "Desk Organizer", category: "Home", price: 26 },
    { title: "Notebook", category: "Books", price: 12 },
    { title: "Camping Tent", category: "Sports", price: 230 },
    { title: "Bean Bag", category: "Home", price: 95 },
    { title: "Wireless Earbuds", category: "Electronics", price: 99 },
    { title: "Gaming Mouse Pad", category: "Electronics", price: 19 },
    { title: "Cycling Helmet", category: "Sports", price: 78 },
    { title: "Travel Pillow", category: "Accessories", price: 24 },
    { title: "Smart Watch", category: "Electronics", price: 199 }
];

const allProducts = [];

for (let i = 1; i <= 6; i++) {
    for (const product of baseProducts) {
        allProducts.push({
            id: allProducts.length + 1,
            title: `${product.title} ${i}`,
            category: product.category,
            price: product.price + i
        });
    }
}

