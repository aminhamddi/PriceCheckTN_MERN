const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');
const colors = require('colors'); // Pour de jolis logs (optionnel)
const Product = require('./models/Product'); // Votre modèle
const connectDB = require('./config/db'); // Votre connexion DB

dotenv.config();
connectDB();

// Image par défaut si manquante (Un joli laptop générique)
const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/2933/2933245.png";

// Liste des marques à détecter dans le titre si la colonne 'brand' est vide
const BRAND_KEYWORDS = ["MSI", "ASUS", "LENOVO", "HP", "DELL", "APPLE", "ACER", "GIGABYTE", "SAMSUNG"];

const importData = async () => {
    try {
        // 1. Nettoyer la base existante (Optionnel: commentez si vous voulez garder les anciennes données)
        await Product.deleteMany();
        console.log('Données existantes supprimées...'.red.inverse);

        const products = [];

        // 2. Lire le CSV
        fs.createReadStream('00_initial_data.csv') // Assurez-vous que le fichier est à la racine du backend
            .pipe(csv())
            .on('data', (row) => {
                // --- LOGIQUE DE NETTOYAGE ---

                // A. Gestion du Prix (Si vide, on skip ou on met 0)
                if (!row.price && !row.regular_price) return; // On ignore les produits sans prix (Mytek)

                let finalPrice = parseFloat(row.price || row.regular_price);

                // B. Conversion EUR -> TND (Approx x3.4)
                if (row.currency === 'EUR') {
                    finalPrice = finalPrice * 3.4;
                    row.currency = 'TND';
                }

                // C. Extraction de la Marque depuis le Titre (Si vide)
                let brand = row.brand;
                if (!brand || brand.trim() === '') {
                    const titleUpper = row.title.toUpperCase();
                    const foundBrand = BRAND_KEYWORDS.find(b => titleUpper.includes(b));
                    brand = foundBrand || "AUTRE";
                }

                // D. Gestion Image (Si vide)
                let image = row.image;
                if (!image || image.trim() === '') {
                    image = DEFAULT_IMAGE;
                }

                // E. Construction de l'objet Product
                const product = {
                    title: row.title,
                    price: Math.round(finalPrice), // Prix arrondi
                    currency: 'TND', // On force TND
                    brand: brand.toUpperCase(),
                    image: image,
                    source: row.source,
                    link: row.url,
                    inStock: row.in_stock === 'True',
                    specs: {
                        cpu: row.processor || 'Non spécifié',
                        gpu: row.gpu || 'Non spécifié',
                        ram: row.ram_gb ? `${row.ram_gb} GB` : 'Non spécifié',
                        storage: row.storage || 'Non spécifié',
                    }
                };

                products.push(product);
            })
            .on('end', async () => {
                // 3. Insérer dans MongoDB
                try {
                    await Product.insertMany(products);
                    console.log(`Succès ! ${products.length} produits importés.`.green.inverse);
                    process.exit();
                } catch (error) {
                    console.error(`${error}`.red.inverse);
                    process.exit(1);
                }
            });

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // Ajoutez une fonction destroyData si besoin
} else {
    importData();
}