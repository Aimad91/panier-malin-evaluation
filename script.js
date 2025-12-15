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

// FONCTION 5 : CALCULER LE TOTAL
function calculerTotal() {
  // Calculer la somme totale
  let total = 0;

  panier.forEach((item) => {
    total += item.prix * item.quantite;
  });

  // Afficher le total
  document.getElementById("montant-total").textContent = total.toFixed(2);
}

//  FONCTION 6 : VALIDER L'EMAIL
function validerEmail(email) {
  // Regex pour valider le format email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// FONCTION 7 : PASSER LA COMMANDE
function passerCommande() {
  const emailInput = document.getElementById("email-client");
  const email = emailInput.value.trim();
  const messageFeedback = document.getElementById("message-feedback");

  // Réinitialiser les classes
  messageFeedback.className = "";
  messageFeedback.style.display = "none";

  // Vérification 1 : Le panier est-il vide ?
  if (panier.length === 0) {
    messageFeedback.className = "error";
    messageFeedback.textContent =
      "❌ Votre panier est vide ! Ajoutez des produits avant de commander.";
    return;
  }

  // Vérification 2 : L'email est-il valide ?
  if (!validerEmail(email)) {
    messageFeedback.className = "error";
    messageFeedback.textContent =
      "❌ Veuillez entrer une adresse email valide.";
    return;
  }

  // Si tout est OK, afficher le message de succès
  messageFeedback.className = "success";
  messageFeedback.textContent = `✅ Commande validée ! Un email de confirmation a été envoyé à ${email}.`;

  // Vider le panier et réinitialiser
  panier = [];
  emailInput.value = "";
  afficherPanier();
}

// INITIALISATION AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", function () {
  // Afficher les produits
  afficherProduits();

  // Ajouter l'événement sur le bouton commander
  document
    .getElementById("btn-commander")
    .addEventListener("click", passerCommande);
});
