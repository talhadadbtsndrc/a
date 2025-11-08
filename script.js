console.log("Bienvenue sur mon site !");

// script.js (Ajouter au début du fichier)

// Durée du timeout en millisecondes (15 minutes = 15 * 60 * 1000 = 900,000 ms)
const TIMEOUT_DURATION = 900000; 
let timeoutId;

// Fonction pour effacer le jeton et recharger (c'est la même que 'logout')
function autoLogout(pageKey) {
    if (pageKey) {
        localStorage.removeItem(`access-${pageKey}`);
        alert("Session expirée. Veuillez entrer votre mot de passe à nouveau.");
        window.location.reload();
    }
}

// script.js (Ajoutez cette fonction après autoLogout)

function startTimeout(pageKey) {
    // 1. Annule le compte à rebours précédent
    clearTimeout(timeoutId);

    // 2. Démarre un nouveau compte à rebours
    timeoutId = setTimeout(() => autoLogout(pageKey), TIMEOUT_DURATION);
}

// Fonction pour écouter les activités de l'utilisateur
function resetTimeoutListener(pageKey) {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
        // Pour chaque activité, on redémarre le compte à rebours
        document.addEventListener(event, () => startTimeout(pageKey), true);
    });
    // Démarre le premier compte à rebours
    startTimeout(pageKey);
}

// Code JavaScript pour basculer la classe 'dark-mode' et mémoriser le choix.
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Fonction pour appliquer le thème
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Mode Clair';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Mode Sombre';
        localStorage.setItem('theme', 'light');
    }
}

// Gérer le clic
themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(currentTheme);
});

// Charger la préférence au démarrage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    // Si aucune préférence n'est enregistrée, on commence en clair.
    applyTheme(savedTheme || 'light'); 
});

// script.js (Nouvelle fonction pour gérer plusieurs mots de passe)

// 🔥 Définissez les mots de passe pour chaque professeur ici ! 🔥
const PASSWORDS = {
    'festoc': 'festoc2025', // Mot de passe pour M. Festoc
    'josselin': 'josselin2025', // Mot de passe pour Mme. Josselin
    'courtin': 'courtin2025' // Mot de passe pour Mme. Courtin
};

function checkPassword(pageKey) {
    const inputElement = document.getElementById('password-input');
    const enteredPassword = inputElement.value;
    
    // Récupère le mot de passe correct en fonction de la clé (festoc, josselin, courtin)
    const CORRECT_PASSWORD = PASSWORDS[pageKey];
    
    const protectedContent = document.getElementById('protected-content');
    const formContainer = document.getElementById('password-form-container');
    const errorMessage = document.getElementById('error-message');

    if (enteredPassword === CORRECT_PASSWORD) {
        // Succès
        formContainer.style.display = 'none';
        protectedContent.style.display = 'block';
        
        // Enregistrer l'accès par professeur (pour éviter de redemander le MDP)
        localStorage.setItem(`access-${pageKey}`, 'true');

        resetTimeoutListener(pageKey);
        
    } else {
        // Erreur
        errorMessage.textContent = "Mot de passe incorrect. Veuillez réessayer.";
        inputElement.value = ""; 
    }
}

// Mise à jour de la vérification au chargement (pour se souvenir de l'accès)
document.addEventListener('DOMContentLoaded', () => {
    // script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ... votre code existant pour le thème sombre ...
    
    // ... votre code existant pour vérifier l'accès aux pages profs (if (pageKey))...

    // ===============================================
    // 🔥 AJOUTER CE BLOC POUR LE FILTRE DU FORMULAIRE 🔥
    // ===============================================
    
    // On cible le formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    // Ce code ne s'exécutera que si le formulaire existe (donc, sur contact.html)
    if (contactForm) {
        
        // La liste des mots que vous voulez bannir
        // Mettez-les en minuscules
        const bannedWords = [
            "insulte", 
            "grosmot", 
            "spam", 
            "idiot"
            // Ajoutez tous les mots que vous souhaitez bloquer ici
        ];

        contactForm.addEventListener('submit', function(event) {
            
            const messageInput = document.getElementById('message');
            const errorMessageElement = document.getElementById('form-error-message');
            
            // On récupère le message et on le met en minuscules pour la comparaison
            const message = messageInput.value.toLowerCase();
            
            let isBanned = false;
            
            // On vérifie si le message contient un des mots bannis
            for (const word of bannedWords) {
                if (message.includes(word)) {
                    isBanned = true;
                    break; // Arrête la boucle dès qu'un mot est trouvé
                }
            }

            if (isBanned) {
                // 1. Empêche l'envoi du formulaire
                event.preventDefault(); 
                
                // 2. Affiche un message d'erreur
                errorMessageElement.textContent = "Votre message contient des termes non autorisés. Veuillez le modifier.";
                messageInput.style.border = "2px solid red"; // Met le champ en rouge
            } else {
                // Si tout va bien, on efface l'erreur
                errorMessageElement.textContent = "";
                messageInput.style.border = "1px solid #555"; // Réinitialise la bordure
            }
        });
    }
});
    // Vérifier si l'utilisateur a déjà le mot de passe pour cette page
    const pagePath = window.location.pathname;
    let pageKey = null;

    if (pagePath.includes('festoc.html')) {
        pageKey = 'festoc';
    } else if (pagePath.includes('josselin.html')) {
        pageKey = 'josselin';
    } else if (pagePath.includes('courtin.html')) {
        pageKey = 'courtin';
    }

    if (pageKey) {
        const hasAccess = localStorage.getItem(`access-${pageKey}`);
        
        const protectedContent = document.getElementById('protected-content');
        const formContainer = document.getElementById('password-form-container');

        if (hasAccess === 'true' && protectedContent && formContainer) {
            formContainer.style.display = 'none';
            protectedContent.style.display = 'block';
            resetTimeoutListener(pageKey);
        }
    }
    // ... Garder le code existant pour le mode sombre ici !
});

function logout() {
    // Détermine la clé d'accès à supprimer en fonction de la page actuelle
    let pageKey = null;
    const pagePath = window.location.pathname;

    if (pagePath.includes('festoc.html')) {
        pageKey = 'festoc';
    } else if (pagePath.includes('josselin.html')) {
        pageKey = 'josselin';
    } else if (pagePath.includes('courtin.html')) {
        pageKey = 'courtin';
    }

    if (pageKey) {
        // Supprime le jeton d'accès spécifique au professeur
        localStorage.removeItem(`access-${pageKey}`);
        
        // Recharge la page
        window.location.reload();
    }
}