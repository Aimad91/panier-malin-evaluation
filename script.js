// ===== DONNÉES PRODUITS =====
const produits = [
  {
    id: 1,
    nom: "Thé Vert Bio",
    prix: 12.99,
    image: "https://placehold.co/150",
  },
  { id: 2, nom: "Café Arabica", prix: 8.5, image: "https://placehold.co/150" },
  {
    id: 3,
    nom: "Infusion Menthe",
    prix: 5.0,
    image: "https://placehold.co/150",
  },
  {
    id: 4,
    nom: "Chocolat Chaud",
    prix: 15.0,
    image: "https://placehold.co/150",
  },
];

// ===== PANIER (tableau pour stocker les articles) =====
let panier = [];

// ===== FONCTION 1 : AFFICHER LES PRODUITS =====
function afficherProduits() {
  // Récupérer le conteneur des produits
  const container = document.getElementById("produits-container");

  // Vider le conteneur
  container.innerHTML = "";

  // Boucler sur chaque produit
  produits.forEach((produit) => {
    // Créer la carte produit
    const carte = document.createElement("div");
    carte.className = "carte-produit";

    // Contenu de la carte
    carte.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <h3>${produit.nom}</h3>
            <p>${produit.prix.toFixed(2)} €</p>
            <button onclick="ajouterAuPanier(${
              produit.id
            })">Ajouter au panier</button>
        `;

    // Ajouter la carte au conteneur
    container.appendChild(carte);
  });
}
