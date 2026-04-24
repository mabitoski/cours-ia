# TimeTravel Agency — Webapp Interactive

> Webapp immersive pour une agence de voyage temporel fictive de luxe, développée dans le cadre du cours M1/M2 Digital & IA — EPSI 2026.

**Live** : [https://cours-ia.mabitoski.fr](https://cours-ia.mabitoski.fr)

---

## Sommaire

- [Présentation](#présentation)
- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Installation locale](#installation-locale)
- [Déploiement](#déploiement)
- [IA & Chatbot](#ia--chatbot)
- [Infrastructure](#infrastructure)
- [Membres du groupe](#membres-du-groupe)

---

## Présentation

TimeTravel Agency est une webapp interactive qui présente une agence de voyage temporel fictive proposant 3 destinations :

| Destination | Époque | Prix | Durée |
|---|---|---|---|
| Paris | Belle Époque 1889 | 12 500 € | 7 jours |
| Crétacé | -65 000 000 ans | 18 900 € | 5 jours |
| Florence | Haute Renaissance 1504 | 14 200 € | 8 jours |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Navigateur (client)                   │
│                                                         │
│   React SPA  ──── /api/chat ──►  nginx reverse proxy    │
└──────────────────────────────────────┬──────────────────┘
                                       │ HTTPS (Let's Encrypt)
                              ┌────────▼────────┐
                              │  VM Debian 13   │
                              │  192.168.1.50   │
                              │                 │
                              │  nginx :443     │
                              │  ├── /         → /var/www/html (React build)
                              │  └── /api/chat → FastAPI :3001
                              │                 │
                              │  FastAPI proxy  │
                              │  └── clé API    │
                              │     stockée     │
                              │     /opt/proxy.env │
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │   Mistral AI    │
                              │  mistral-small  │
                              └─────────────────┘
```

**Sécurité clé API** : la clé Mistral n'est jamais exposée dans le bundle JavaScript. Le frontend appelle `/api/chat` (même domaine), nginx forward vers le proxy FastAPI local qui seul connaît la clé.

---

## Stack technique

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Bundler / dev server |
| Tailwind CSS | v4 | Styles utilitaires |
| Framer Motion | latest | Animations |
| Lucide React | latest | Icônes |

### Backend (proxy IA)
| Technologie | Version | Rôle |
|---|---|---|
| Python | 3.13 | Runtime |
| FastAPI | latest | API proxy |
| Uvicorn | latest | Serveur ASGI |
| httpx | latest | Client HTTP async |

### Infrastructure
| Composant | Détail |
|---|---|
| VM | Debian 13 — 2 cores, 2 Go RAM, 64 Go disque |
| Hyperviseur | Proxmox VE 8.4 |
| Serveur web | nginx 1.26 |
| TLS | Let's Encrypt (certbot) — renouvellement auto |
| DNS | cours-ia.mabitoski.fr → 88.125.141.134 |

---

## Fonctionnalités

### Page d'accueil — Hero section
- Champ d'étoiles animé en canvas (200 particules, scintillement dynamique)
- Titre avec animation d'entrée (Framer Motion)
- Statistiques animées (1 200+ voyageurs, 3 destinations, 100% sécurisé)
- CTA vers les destinations

### Galerie des destinations
- 3 cards interactives avec effet hover (élévation + bordure colorée)
- Image de destination avec zoom au survol
- Badge de catégorie (Populaire / Aventure / Culture)
- Modal détaillé au clic : description complète, highlights, prix, bouton réservation

### Chatbot IA — ChronoBot
- Widget flottant en bas à droite avec animation d'ouverture
- Indicateur "en ligne" + animation de frappe (3 points)
- Réponses rapides prédéfinies pour démarrer la conversation
- **Backend** : Mistral `mistral-small-latest` via proxy sécurisé
- **Fallback** : réponses intelligentes par mots-clés si API indisponible
- Contexte système : personnalité de conseiller temporel, connaissance des 3 destinations et tarifs

### Quiz de recommandation
- 4 questions avec barre de progression
- Algorithme de scoring par destination (culture→Florence, aventure→Crétacé, élégance→Paris)
- Résultat animé avec emoji, description personnalisée et prix
- Bouton "Recommencer"

### Design & UX
- Dark mode exclusif (fond `#080c14`)
- Palette dorée (`#d4a017`, `#b8860b`, `#f5d060`)
- Police Cinzel (serif élégant) pour les titres
- Animations au scroll (Framer Motion `useInView`)
- Header transparent → opaque au scroll
- Responsive mobile

---

## Installation locale

### Prérequis
- Node.js 18+
- npm 9+

### Démarrage rapide

```bash
git clone https://github.com/mabitoski/cours-ia.git
cd cours-ia
npm install
npm run dev
```

L'app est disponible sur `http://localhost:5173`.

### Activer le chatbot IA (optionnel)

Sans configuration, le chatbot fonctionne avec des réponses pré-programmées.

Pour activer Mistral :

```bash
cp .env.example .env
# Éditer .env et ajouter votre clé API Mistral
# Compte gratuit sur https://console.mistral.ai
```

```env
VITE_MISTRAL_API_KEY=votre_clé_ici
```

> En production, ne pas utiliser cette méthode — la clé serait exposée dans le bundle. Utiliser le proxy backend (voir [Déploiement](#déploiement)).

---

## Déploiement

### Build

```bash
npm run build
# Les fichiers statiques sont dans dist/
```

### Déploiement avec proxy sécurisé (recommandé)

Le dossier `dist/` est servi par nginx. Le chatbot passe par un proxy FastAPI qui stocke la clé côté serveur.

**1. Installer les dépendances sur le serveur**

```bash
apt install nginx python3-venv certbot python3-certbot-nginx
python3 -m venv /opt/proxy-env
/opt/proxy-env/bin/pip install fastapi uvicorn httpx
```

**2. Déployer le proxy**

```bash
# Stocker la clé API (chmod 600 obligatoire)
echo 'MISTRAL_API_KEY=votre_clé' > /opt/proxy.env
chmod 600 /opt/proxy.env

# Copier proxy.py dans /opt/
# Créer le service systemd timetravel-proxy
systemctl enable --now timetravel-proxy
```

**3. Copier le build**

```bash
cp -r dist/* /var/www/html/
```

**4. Configurer nginx + HTTPS**

```nginx
server {
    listen 443 ssl;
    root /var/www/html;

    ssl_certificate     /etc/letsencrypt/live/votre-domaine/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine/privkey.pem;

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**5. Certificat Let's Encrypt**

```bash
certbot --nginx -d votre-domaine.fr
```

### Déploiement simplifié (Vercel / Netlify)

```bash
npm run build
# Glisser-déposer dist/ sur Netlify
# ou : vercel deploy
```

> Sans le proxy backend, le chatbot utilisera le fallback local (pas de vraie IA).

---

## IA & Chatbot

### Modèle utilisé
- **Mistral Small Latest** (`mistral-small-latest`) via l'API officielle Mistral AI
- Prompt système : personnalité de conseiller temporel, connaissance des 3 destinations, réponses en français, max 3 phrases

### Architecture sécurisée
```
Frontend (React)
    │
    ├── fetch('/api/chat', { messages })   ← pas de clé dans le JS
    │
nginx (reverse proxy)
    │
    └── proxy_pass http://127.0.0.1:3001
            │
        FastAPI (Python)
            │
            ├── lit /opt/proxy.env (chmod 600)
            └── appelle api.mistral.ai avec la clé
```

### Fallback sans API
Si le proxy est indisponible, le chatbot répond localement via des règles par mots-clés (paris, crétacé, florence, prix, danger, sécurité...).

---

## Infrastructure

### VM Proxmox

| Paramètre | Valeur |
|---|---|
| VMID | 110 |
| Nom | debian13-linus |
| OS | Debian 13 Trixie |
| Kernel | 6.12 cloud-amd64 |
| IP locale | 192.168.1.50 |
| IP publique | 88.125.141.134 |
| RAM | 2 048 Mo |
| CPU | 2 vCores |
| Disque | 64 Go (LVM thin) |

### Schéma réseau

```
Internet
   │
   │ 88.125.141.134 (IP publique)
   │
[Box/Routeur] ── NAT 80/443 ──► 192.168.1.50
                                     │
                               [VM Debian 13]
                                     │
                               [Proxmox 8.4]
                               192.168.1.2
```

---

## Membres du groupe

| Nom | Prénom |
|---|---|
| *(À compléter)* | *(À compléter)* |
| *(À compléter)* | *(À compléter)* |
| *(À compléter)* | *(À compléter)* |
| *(À compléter)* | *(À compléter)* |

---

## Licence

Projet pédagogique — M1/M2 Digital & IA — EPSI 2026

Visuels : [Unsplash](https://unsplash.com) (licence libre)  
Polices : [Google Fonts](https://fonts.google.com) — Cinzel, Inter
