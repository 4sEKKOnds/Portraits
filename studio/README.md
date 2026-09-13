# Portfolio — Portraits studio

Site statique (HTML/CSS/JS, aucune dépendance de build) prêt à héberger sur GitHub Pages.

## Démarrage rapide

Le site est déjà écrit avec les vraies dimensions de tes 20 photos. Il n'y a
rien à calculer ni à exécuter :

1. Dépose tes photos (déjà en AVIF/WebP à 800/1600/2560, traitées via ton
   pipeline NX Studio + script local) dans `images/avif/{800,1600,2560}/`
   et `images/webp/{800,1600,2560}/`, en gardant exactement les noms
   `Studio (1).avif` … `Studio (20).avif` (et `.webp`), à la place des
   placeholders.
2. Ouvre `index.html` dans un navigateur pour vérifier le rendu.
3. Personnalise les textes (section 2 plus bas), puis déploie (section 3).

## Structure

```
index.html
css/style.css
js/script.js
images/
  hero-portrait-*.{avif,webp,jpg}   ← image d'ouverture (placeholders)
  avif/800/   Studio (1).avif  … à  Studio (20).avif
  avif/1600/  Studio (1).avif  … à  Studio (20).avif
  avif/2560/  Studio (1).avif  … à  Studio (20).avif
  webp/800/   Studio (1).webp  … à  Studio (20).webp
  webp/1600/  Studio (1).webp  … à  Studio (20).webp
  webp/2560/  Studio (1).webp  … à  Studio (20).webp
```

Pas de JPG : le WebP sert de repli pour les rares navigateurs sans AVIF
(WebP est supporté partout sauf Safari < 14).

## 1. Remplacer les photos (détails)

Chaque figure de la galerie a un bloc `<picture>` avec un `srcset` déjà
rempli à partir des dimensions réelles que tu m'as données pour tes 20
photos (534×800, 800×1200, 800×1100, 800×1067, 800×1235, 800×800 —
scalées ×2 et ×3.2 pour les paliers 1600 et 2560). Si une largeur ne
correspond pas exactement à une de tes photos une fois remplacée, ce n'est
pas grave : ça reste un `srcset` valide, le navigateur choisit juste une
taille légèrement moins optimale dans de rares cas — rien ne casse.

Après avoir déposé tes fichiers, réécris le texte `alt` et la légende
(`<span class="frame__meta">`) de chaque figure dans `index.html` —
actuellement "à personnaliser".

Aucun cadrage n'est forcé côté CSS : la grille est en masonry (colonnes
CSS), donc chaque photo garde sa vraie proportion telle qu'exportée —
2:3, carrée, ou autre.

L'image hero (`images/hero-portrait-*`) reste sur un système séparé
(480/800/1200/1600 + JPG) puisque ce n'est pas une de tes 20 photos studio ;
remplace-la directement par une de tes photos exportée à ces largeurs.

## 2. Approche mobile-first

Le CSS est écrit mobile-first : le style de base (sans media query) est
celui du mobile, et chaque `min-width` ajoute une couche pour un écran plus
grand :

- **Mobile (base, jusqu'à 699px)** : une seule colonne pleine largeur —
  chaque portrait s'affiche dans sa vraie proportion, sans recadrage.
- **Tablette (dès 700px)** : masonry à 2 colonnes.
- **Desktop (dès 1100px)** : masonry à 3 colonnes, puis 4 à partir de
  1500px sur les grands écrans.

La grille utilise `columns` en CSS (masonry natif via colonnes) plutôt
qu'une grille à formes fixes : comme tes photos sont presque toutes dans
un ratio proche (2:3) avec quelques exceptions, une grille imposant des
formes différentes aurait forcé des recadrages inutiles. Chaque photo
garde sa hauteur naturelle.

Le `sizes` de chaque `<picture>` est calé sur ces mêmes points de rupture,
pour que le navigateur télécharge la taille d'image réellement affichée
(pas plus) — important sur mobile en particulier, où le visiteur est
souvent en 4G/5G.

## 2b. Personnaliser le texte

- Titre et accroche : dans `<section class="hero">`.
- Légendes de chaque portrait : `<figcaption>` sous chaque image (numéro +
  courte description).
- Bio : `<section class="about">`.
- Email de contact : `mailto:contact@example.com` dans le footer, à remplacer
  par ta vraie adresse.

## 3. Déployer sur GitHub Pages

1. Crée un nouveau repo sur GitHub (public), par ex. `portfolio-portraits`.
2. Depuis ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Portfolio portraits studio"
   git branch -M main
   git remote add origin https://github.com/<ton-user>/portfolio-portraits.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Build and deployment → Source** :
   choisis `Deploy from a branch`, branche `main`, dossier `/ (root)`.
4. Le site sera en ligne quelques minutes après sur :
   `https://<ton-user>.github.io/portfolio-portraits/`

### Nom de domaine perso (optionnel)

Si tu veux brancher un domaine à toi : ajoute un fichier `CNAME` à la racine
contenant juste ton domaine (ex. `portraits.tonsite.fr`), puis configure un
enregistrement CNAME chez ton registrar pointant vers
`<ton-user>.github.io`.
