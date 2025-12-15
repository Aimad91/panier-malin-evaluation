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

let panier = [];

// FONCTION 1 : AFFICHER LES PRODUITS
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

// FONCTION 2 : AJOUTER UN PRODUIT AU PANIER
function ajouterAuPanier(idProduit) {
  // Trouver le produit dans le tableau
  const produit = produits.find((p) => p.id === idProduit);

  // Vérifier si le produit existe déjà dans le panier
  const produitExistant = panier.find((item) => item.id === idProduit);

  if (produitExistant) {
    // Si le produit existe, on augmente la quantité
    produitExistant.quantite++;
  } else {
    // Sinon, on ajoute le produit avec quantité = 1
    panier.push({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: 1,
    });
  }

  // Mettre à jour l'affichage du panier
  afficherPanier();
}

// FONCTION 3 : AFFICHER LE PANIER
function afficherPanier() {
  const panierListe = document.getElementById("panier-liste");

  // Si le panier est vide
  if (panier.length === 0) {
    panierListe.innerHTML = "<p>Votre panier est vide.</p>";
    calculerTotal();
    return;
  }

  // Vider le conteneur
  panierListe.innerHTML = "";

  // Boucler sur chaque article du panier
  panier.forEach((item) => {
    // Calculer le sous-total de la ligne
    const sousTotal = item.prix * item.quantite;

    // Créer l'élément de panier
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-panier";

    itemDiv.innerHTML = `
            <div class="item-info">
                <h4>${item.nom}</h4>
                <p>${item.prix.toFixed(2)} € x ${
      item.quantite
    } = ${sousTotal.toFixed(2)} €</p>
            </div>
            <div class="item-actions">
                <button onclick="retirerDuPanier(${item.id})">Retirer</button>
            </div>
        `;

    panierListe.appendChild(itemDiv);
  });

  // Calculer et afficher le total
  calculerTotal();
}
