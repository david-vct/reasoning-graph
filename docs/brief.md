# Project Brief: Reasoning Graph

**Version:** 1.0  
**Date:** January 15, 2026  
**Author:** Davidou  
**Analyst:** Mary, Business Analyst

---

## Executive Summary

**Reasoning Graph** est une application web qui permet de créer et visualiser des graphes de raisonnement logique formel, où chaque node représente une étape logique (modus ponens, syllogisme, etc.) et les connexions illustrent le flux d'argumentation. L'outil s'adresse principalement aux chercheurs, étudiants avancés en philosophie/mathématiques et professionnels qui nécessitent une rigueur logique dans la structuration d'arguments complexes.

La proposition de valeur clé repose sur trois piliers : (1) une **validation rigoureuse en temps réel** avec détection automatique des incohérences logiques et des raisonnements circulaires, (2) une **architecture fractale** permettant la réutilisation de graphes complets comme composants dans d'autres raisonnements, et (3) une **flexibilité d'utilisation** offrant à la fois des nodes typés contraints pour la rigueur formelle et des nodes libres pour l'exploration créative.

Le système garantit la scalabilité pour les graphes complexes grâce à une validation en cascade où chaque node hérite du statut de validité de ses prédécesseurs, éliminant les problèmes de performance même avec des centaines de nodes interconnectés.

---

## Problem Statement

### Le Problème Actuel

Les chercheurs, étudiants avancés et professionnels qui construisent des arguments logiques complexes sont confrontés à un problème fondamental : **l'absence d'outils dédiés à la visualisation et validation de raisonnements formels**.

Aujourd'hui, ils doivent choisir entre trois approches insatisfaisantes :

**1. Outils papier/whiteboard traditionnels**

- Aucune validation automatique des erreurs logiques
- Impossible de détecter les raisonnements circulaires
- Pas de réutilisation possible des raisonnements construits
- Limite la complexité gérable (au-delà de 20-30 étapes, illisible)

**2. Mind mapping générique (Miro, Excalidraw, Obsidian)**

- Trop permissif : accepte n'importe quelle connexion sans validation de cohérence logique
- Pas de typage des prémisses/conclusions
- L'utilisateur doit manuellement vérifier chaque étape
- Aucune nomenclature sémantique pour guider la construction

**3. Proof assistants formels (Coq, Lean, Isabelle)**

- Courbe d'apprentissage extrêmement abrupte (plusieurs mois)
- Syntaxe complexe et non-visuelle
- Pas d'exploration libre : tout doit être rigoureusement spécifié dès le départ
- Inaccessible aux non-spécialistes

### Impact du Problème

Ce vide crée plusieurs conséquences négatives :

- **Erreurs logiques non détectées** : Les sophismes et incohérences passent inaperçus dans des arguments complexes, affaiblissant la qualité de la recherche académique
- **Réinvention perpétuelle** : Chaque chercheur reconstruit des raisonnements classiques (preuve par contraposée, syllogismes standards) au lieu de les réutiliser
- **Barrière d'accessibilité** : La logique formelle reste une discipline élitiste alors qu'elle devrait être un outil de pensée critique largement accessible
- **Perte de temps** : Validation manuelle fastidieuse qui pourrait être automatisée
- **Complexité limitée** : Les arguments très complexes (100+ étapes) sont impossibles à gérer sans outil dédié

### Pourquoi Maintenant?

L'urgence de résoudre ce problème s'explique par :

- **Montée de la désinformation** : Le besoin de structurer et valider des arguments rigoureux n'a jamais été aussi critique
- **Maturité technologique** : Les bibliothèques de graphes interactifs (React Flow) et les bases de données temps réel rendent la solution techniquement réalisable
- **Demande croissante** : L'essor des "digital gardens" et outils de pensée (Roam, Obsidian) montre l'appétit pour des outils de structuration cognitive

---

## Proposed Solution

**Reasoning Graph** résout ce problème en créant un espace unique entre les mind maps permissives et les proof assistants rigides : un **éditeur visuel de graphes logiques avec validation intelligente**.

### Approche Centrale

L'outil permet aux utilisateurs de construire des raisonnements comme des graphes dirigés où :

- **Chaque node = une étape logique** : L'utilisateur choisit un type logique (modus ponens, modus tollens, syllogisme, disjonction, affirmation simple) ou un node libre sans contraintes
- **Les prémisses sont typées et nommées** : Un node "modus ponens" expose automatiquement deux prémisses nommées "P" et "P→Q", guidant l'utilisateur
- **Les connexions transportent la vérité logique** : Relier la conclusion d'un node A à la prémisse d'un node B propage la validité
- **La validation est automatique et non-bloquante** : Le système détecte les erreurs (incompatibilité de types, cycles logiques) et les signale visuellement en rouge, mais permet de continuer à explorer

### Différenciateurs Clés

**1. Validation Intelligente Sans Frustration**

Contrairement aux proof assistants qui bloquent l'utilisateur à chaque erreur, Reasoning Graph adopte une approche "guide mais n'empêche pas" :

- Les connexions invalides s'affichent en rouge avec tooltip explicatif
- Les erreurs se propagent en cascade visuellement (un node invalide colore ses descendants)
- L'utilisateur peut ignorer les erreurs temporairement pour explorer, puis les corriger
- Détection automatique des raisonnements circulaires (cycles dans le graphe dirigé acyclique)

**2. Architecture Fractale : Graphes Réutilisables**

Toute preuve validée peut être encapsulée comme un node "container" :

- Un graphe complet devient un composant réutilisable dans d'autres raisonnements
- Les containers affichent seulement leurs entrées/sorties (interface simplifiée)
- Double-clic pour "entrer" dans un container et voir sa structure interne
- Permet de gérer la complexité : un graphe de 200 nodes peut être organisé en 10 containers de 20 nodes

**3. Flexibilité Expert : Dual-Mode**

L'outil offre deux modes coexistants :

- **Nodes typés contraints** : Structures logiques classiques avec prémisses fixes (rigueur maximale)
- **Nodes libres** : Nombre variable de prémisses sans contrainte de type (exploration créative)
- L'utilisateur choisit le niveau de rigueur selon le contexte

### Expérience Utilisateur

**Interface moderne et fluide** :

- Layout horizontal automatique (axiomes à gauche → conclusion finale à droite)
- Connexions en courbes Bézier naturelles (pas de traits droits)
- Auto-arrangement intelligent avec magnétisme style Obsidian
- Thème sombre/clair
- Interactions intuitives : drag & drop OU mode clic-clic pour les connexions

**Partage et collaboration** :

- Sauvegarde cloud automatique
- Partage par URL simple
- Graphes publics par défaut (option privée disponible)
- Bibliothèque de raisonnements classiques à venir (syllogismes célèbres, preuves mathématiques standards)

### Pourquoi Cette Solution Réussira

**Là où les autres échouent :**

- **vs Papier** : Validation automatique + réutilisabilité + scalabilité
- **vs Mind maps** : Rigueur logique + nomenclature sémantique + détection d'erreurs
- **vs Proof assistants** : Courbe d'apprentissage douce + interface visuelle + exploration libre

**Adoption facilitée :**

- Approche "learning by doing" : pas de tutorial complexe, l'interface guide naturellement
- Nomenclature pédagogique : voir "P" et "P→Q" enseigne implicitement le modus ponens
- Stack technique moderne et gratuite (Next.js, Supabase, Vercel) garantit disponibilité et performance

---

## Target Users

### Primary User Segment: Chercheurs et Doctorants en Philosophie/Logique

**Profil démographique:**

- Doctorants, post-docs, professeurs en philosophie analytique, logique mathématique, épistémologie
- Âge typique : 25-50 ans
- Familiers avec la logique formelle mais pas nécessairement avec les proof assistants
- Travaillent dans l'environnement académique (universités, instituts de recherche)

**Comportements et workflows actuels:**

- Construisent des arguments complexes pour publications, thèses, cours
- Utilisent actuellement : papier, LaTeX pour formalisation, mind maps occasionnellement
- Passent 30-50% de leur temps à structurer et vérifier la cohérence de raisonnements
- Collaborent avec pairs via emails, commentaires sur drafts

**Besoins spécifiques:**

- **Rigueur absolue** : Besoin de garantir la validité logique pour crédibilité académique
- **Gestion de complexité** : Arguments avec 50-200 étapes logiques dans certaines preuves philosophiques
- **Réutilisabilité** : Répéter des patterns de raisonnement standards (contraposée, réduction à l'absurde)
- **Communication** : Illustrer des arguments pour articles, présentations, enseignement
- **Documentation** : Tracer l'historique d'un raisonnement, annoter les étapes

**Objectifs:**

- Publier des recherches avec des arguments logiquement irréprochables
- Enseigner la logique formelle de manière plus accessible
- Réduire le temps de validation manuelle des preuves
- Créer une bibliothèque personnelle de raisonnements réutilisables

**Pain points résolus par Reasoning Graph:**

- Détection automatique d'erreurs que l'œil humain manque après des heures de travail
- Visualisation claire qui facilite la communication avec reviewers et étudiants
- Architecture fractale pour décomposer preuves complexes en modules compréhensibles

---

### Secondary User Segment: Étudiants en Master/Licence Avancée

**Profil démographique:**

- Étudiants en master de philosophie, mathématiques, informatique théorique
- Étudiants de licence avancée (L3) suivant des cours de logique formelle
- Âge typique : 21-26 ans
- Niveau variable en logique formelle : de "première exposition" à "compétent"

**Comportements et workflows actuels:**

- Apprennent la logique formelle via exercices, devoirs, préparation d'examens
- Utilisent principalement : cahiers, tableaux blancs, parfois des outils de diagrammes basiques
- Travaillent seuls ou en petits groupes d'étude
- Cherchent des ressources en ligne pour comprendre concepts difficiles

**Besoins spécifiques:**

- **Apprentissage guidé** : Besoin de feedback immédiat pour comprendre erreurs
- **Exemples concrets** : Accès à des raisonnements classiques bien construits pour s'inspirer
- **Expérimentation** : Pouvoir essayer différentes approches sans peur de "casser" quelque chose
- **Validation** : Confirmer que leur compréhension est correcte avant de soumettre devoirs

**Objectifs:**

- Maîtriser la logique formelle pour examens et projets académiques
- Développer l'intuition logique au-delà de la mémorisation de règles
- Produire des devoirs de qualité avec des preuves correctes
- Préparer thèses/mémoires avec arguments structurés

**Pain points résolus par Reasoning Graph:**

- Feedback immédiat sur validité des connexions (apprentissage actif vs passif)
- Nomenclature pédagogique (P, P→Q) qui enseigne les conventions
- Bibliothèque de raisonnements classiques comme exemples d'apprentissage
- Interface intuitive qui réduit la friction technique vs proof assistants

---

### Tertiary User Segment: Professionnels (Juristes, Analystes)

**Profil démographique:**

- Juristes construisant des argumentations légales complexes
- Analystes (stratégiques, politiques) structurant des recommandations
- Consultants développant des frameworks de décision
- Âge typique : 28-55 ans
- Formation logique variable : de "intuitive" à "formelle"

**Comportements et workflows actuels:**

- Construisent des chaînes d'arguments pour mémos, rapports, plaidoyers
- Utilisent : documents Word, PowerPoint, mind maps, parfois diagrammes Visio
- Doivent convaincre avec clarté et rigueur (clients, juges, décideurs)
- Travaillent sous pression temporelle avec enjeux élevés

**Besoins spécifiques:**

- **Clarté de communication** : Arguments visuels plus percutants que texte linéaire
- **Vérification rapide** : Identifier rapidement faiblesses dans raisonnement adverse
- **Professionnalisme** : Outil crédible pour présentation à stakeholders seniors
- **Efficacité** : Réutiliser structures argumentatives standards

**Objectifs:**

- Construire des argumentations solides qui résistent au contre-interrogatoire
- Communiquer des logiques complexes de manière accessible
- Identifier les failles dans arguments adverses
- Gagner du temps sur structuration répétitive

**Pain points résolus par Reasoning Graph:**

- Validation automatique révèle failles avant présentation
- Format visuel plus engageant que documents texte longs
- Architecture fractale pour réutiliser templates d'argumentation
- Partage facile pour revue collaborative avec collègues

---

## Goals & Success Metrics

### Business Objectives

- **Validation de concept (3 mois post-lancement)** : Atteindre 100 utilisateurs actifs hebdomadaires créant au moins un graphe complet, démontrant l'adéquation produit-marché initiale
- **Adoption académique (6 mois)** : Obtenir l'utilisation de Reasoning Graph dans au moins 3 cours universitaires de logique formelle comme outil pédagogique recommandé
- **Bibliothèque de contenu (6 mois)** : Constituer une bibliothèque publique de 50+ raisonnements classiques validés (syllogismes célèbres, preuves mathématiques standards, arguments philosophiques historiques)
- **Engagement démontré (6 mois)** : Atteindre un taux de rétention de 40% à 30 jours (utilisateurs revenant après première utilisation)
- **Validation technique (3 mois)** : Démontrer la scalabilité avec au moins 10 graphes publics dépassant 100 nodes sans problème de performance

### User Success Metrics

- **Création réussie** : 80%+ des nouveaux utilisateurs créent leur premier graphe complet (minimum 5 nodes connectés) dans les 15 premières minutes
- **Détection d'erreurs** : Moyenne de 2-3 erreurs logiques détectées automatiquement par graphe, confirmant l'utilité de la validation
- **Réutilisation** : 30%+ des utilisateurs actifs créent au moins un container réutilisable dans leur premier mois
- **Partage** : 50%+ des graphes créés sont partagés (URL publique générée), indiquant l'utilité collaborative
- **Satisfaction** : Net Promoter Score (NPS) ≥ 40 parmi utilisateurs ayant créé 3+ graphes

### Key Performance Indicators (KPIs)

- **Graphes créés par utilisateur actif** : Moyenne de 5 graphes/mois (indique engagement régulier)
- **Complexité moyenne des graphes** : 15-25 nodes par graphe (sweet spot entre trivial et trop complexe pour MVP)
- **Taux de validation successful** : 70%+ des graphes atteignent un état "entièrement valide" (aucune erreur logique), démontrant l'utilité pédagogique
- **Temps moyen de création** : 20-30 minutes pour un graphe de 15 nodes (efficacité vs outils actuels)
- **Taux de conversion visiteur → créateur** : 25%+ des visiteurs landing page créent au moins un node (friction faible)
- **Containers créés/partagés** : 10% des graphes deviennent containers réutilisés (adoption architecture fractale)
- **Graphes publics vs privés** : Ratio 70/30 (confirme l'hypothèse de partage par défaut)

---

## MVP Scope

### Core Features (Must Have)

- **Création de nodes typés** : 5 types logiques de base (modus ponens, modus tollens, syllogisme, disjonction, affirmation simple) + node libre sans contraintes. Chaque type expose automatiquement ses prémisses nommées (ex: P, P→Q pour modus ponens).

- **Système de connexion bimodal** : Drag & drop OU mode clic-clic (clic sur sortie puis clic sur entrée) pour créer les connexions entre nodes, permettant à chaque utilisateur de choisir son mode préféré.

- **Validation en temps réel avec propagation** : Vérification structurelle automatique des connexions (compatibilité de types), détection de cycles (raisonnements circulaires), propagation visuelle des erreurs en cascade. Traits rouges pour connexions invalides, verts pour valides.

- **Tooltips d'erreur contextuels** : Messages explicatifs au survol des connexions/nodes invalides, expliquant précisément la nature de l'incohérence logique.

- **Nomenclature sémantique** : Prémisses automatiquement nommées selon le contexte logique (P/Q pour modus ponens, majeur/mineur pour syllogisme) pour guidance pédagogique.

- **Distinction axiome/hypothèse** : Chaque prémisse peut être marquée comme axiome (point de départ accepté) ou hypothèse (nécessite preuve), avec indication visuelle.

- **Layout horizontal auto-arrangé** : Algorithme de positionnement automatique style DAG (Dagre.js) avec ordre topologique : axiomes à gauche → conclusion finale à droite. Magnétisme intelligent pour ajustement manuel fluide.

- **Visualisation moderne** : Nodes rectangulaires avec coins arrondis, connexions en courbes Bézier naturelles, animations fluides. Thème sombre et clair.

- **Interactions intuitives** : Clic gauche pour déplacer nodes, clic droit pour créer node, molette pour zoom, pan avec drag sur canvas vide.

- **Annotations par node** : Champ texte optionnel pour notes, commentaires, références sur chaque node.

- **Authentification et sauvegarde cloud** : Auth simple (email/password via Supabase), sauvegarde automatique des graphes dans le cloud.

- **Partage par URL** : Chaque graphe a une URL unique, graphes publics par défaut avec option privée disponible.

- **Interface responsive** : Optimisé pour écrans PC standard (desktop/laptop), support tablette acceptable.

- **Onboarding minimal** : Landing page → bouton "Créer mon premier graphe" → canvas directement. Learning by doing, pas de tutorial complexe.

### Out of Scope for MVP

- Nodes containers/composites et architecture fractale complète (reporté Phase 2)
- Double-clic pour entrer dans containers (Phase 2)
- Panel latéral de navigation/propriétés (Phase 2)
- Système de contradiction/réfutation explicite (Phase 2)
- Chemins alternatifs d'argumentation visualisés (Phase 2)
- Collaboration multi-utilisateurs en temps réel (Vision long-terme)
- Système de commentaires et discussions (Vision long-terme)
- Bibliothèque publique complète de raisonnements célèbres (Phase 2, quelques exemples seulement pour MVP)
- Clonage/fork de graphes (Phase 2)
- Export en formats multiples (LaTeX, PDF, image) (Phase 2)
- Système de tags et recherche avancée (Phase 2)
- Historique de versions/undo complet (MVP : undo basique seulement)
- Types logiques avancés (induction, abduction, logique modale) (Phase 2)
- Support mobile natif (web responsive seulement)
- Intégration avec proof assistants (Coq, Lean) (Vision long-terme)

### MVP Success Criteria

Le MVP sera considéré comme réussi si :

1. **Fonctionnel** : Un utilisateur peut créer un graphe de 15+ nodes interconnectés, le sauvegarder, et le partager sans bug bloquant
2. **Validation opérationnelle** : Le système détecte correctement 95%+ des erreurs logiques évidentes (incompatibilité de types, cycles)
3. **Performance** : Graphes jusqu'à 50 nodes s'affichent et se manipulent sans latence perceptible (<100ms pour interactions)
4. **Adoption initiale** : 50+ utilisateurs créent au moins un graphe complet dans les 6 premières semaines post-lancement
5. **Feedback qualitatif positif** : Au moins 5 utilisateurs actifs rapportent que l'outil "résout un problème réel" dans leurs retours

---

## Post-MVP Vision

### Phase 2 Features (3-6 mois post-MVP)

**Architecture fractale complète** : Implémentation des nodes containers permettant d'encapsuler tout graphe comme composant réutilisable. Double-clic pour entrer/sortir des containers, interface simplifiée montrant seulement entrées/sorties.

**Enrichissement de validation** : Types logiques additionnels (raisonnement par l'absurde, contraposée, induction), validation sémantique avancée (détection de sophismes classiques).

**Bibliothèque publique** : Catalogue de 100+ raisonnements classiques (syllogismes d'Aristote, preuves mathématiques standards, arguments philosophiques célèbres). Système de tags, recherche, et filtrage.

**Panel latéral** : Navigation arborescente des nodes, propriétés détaillées, historique de modifications, minimap pour graphes complexes.

**Clonage et templates** : Fork de graphes publics, création de templates de démarrage (structures de preuves courantes).

**Export et partage enrichi** : Export en image PNG/SVG, génération de liens embed pour intégration dans sites/blogs.

**Annotations enrichies** : Support Markdown, liens hypertexte, références bibliographiques structurées.

### Long-term Vision (1-2 ans)

**Plateforme collaborative** : Édition multi-utilisateurs en temps réel style Google Docs, système de commentaires par node, discussions argumentatives structurées.

**Intelligence artificielle** : Assistant IA suggérant complétions logiques, détection de sophismes subtils, génération de contre-arguments.

**Écosystème de contenu** : Marketplace de raisonnements vérifiés, système de réputation, certification académique de preuves.

**Intégrations académiques** : Export vers formats académiques (LaTeX, BibTeX), import depuis proof assistants, API publique pour extensions.

**Outils pédagogiques avancés** : Mode "challenge" avec exercices progressifs, système de badges/achievements pour apprentissage gamifié, analytics pour enseignants.

### Expansion Opportunities

**Vertical académique** : Partenariats avec universités pour adoption dans curriculum de logique, licences institutionnelles, workshops de formation.

**Vertical professionnel** : Version "Reasoning Graph Pro" pour cabinets juridiques et consulting, fonctionnalités d'équipe avancées, branding personnalisé.

**Internationalisation** : Support multilingue pour interface, bibliothèque de raisonnements traduits, communautés régionales.

**Domaines spécialisés** : Extensions pour logiques spécifiques (logique temporelle, déontique, épistémique), adaptation pour raisonnement médical/diagnostique.

---

## Technical Considerations

### Platform Requirements

- **Target Platforms** : Application web progressive (PWA), accessible via navigateurs modernes
- **Browser Support** : Chrome/Edge 100+, Firefox 100+, Safari 15+ (2 dernières versions majeures)
- **OS Support** : Indépendant de l'OS (web-based), optimisé pour desktop/laptop (Windows, macOS, Linux), support tablette acceptable
- **Performance Requirements** :
  - Temps de chargement initial < 3s sur connexion moyenne
  - Interactions canvas < 100ms de latence
  - Support jusqu'à 200 nodes sans dégradation perceptible
  - Rendu fluide 60fps pour animations et déplacements

### Technology Preferences

- **Frontend** :
  - Next.js 14+ (React framework avec SSR/SSG)
  - TypeScript pour type safety
  - React Flow ou ReactGraph pour rendering du graphe
  - TailwindCSS pour styling
  - Zustand ou Jotai pour state management léger
- **Backend** :

  - Next.js API routes (backend intégré)
  - Validation avec Zod pour schémas TypeScript
  - Engine de validation logique en TypeScript pur (module séparé testable)

- **Database** :

  - Supabase (PostgreSQL managed) pour données structurées + auth
  - Alternative : MongoDB Atlas si préférence NoSQL
  - Real-time subscriptions via Supabase pour sync

- **Hosting/Infrastructure** :
  - Vercel pour frontend/backend Next.js (tier gratuit généreux)
  - Supabase cloud (tier gratuit : 500MB DB, 2GB bandwidth)
  - Cloudflare pour CDN et protection DDoS

### Architecture Considerations

- **Repository Structure** : Monorepo avec structure Next.js standard, dossier `/lib` pour validation engine, `/components` pour React components, `/types` pour TypeScript types partagés

- **Service Architecture** :

  - Architecture serverless via Next.js API routes
  - Validation engine découplé de l'UI (pure TypeScript, testable indépendamment)
  - Pas de microservices pour MVP (simplicité)

- **Integration Requirements** :

  - Supabase SDK pour auth et DB
  - React Flow pour graphe rendering
  - Dagre.js pour algorithme de layout
  - Pas d'intégrations externes tierces pour MVP

- **Security/Compliance** :
  - HTTPS obligatoire (Vercel par défaut)
  - Auth sécurisée via Supabase (JWT tokens)
  - Row Level Security (RLS) PostgreSQL pour isolation des données utilisateurs
  - Validation côté serveur systématique (ne jamais faire confiance au client)
  - Rate limiting sur API routes pour prévenir abus
  - GDPR-compliant : données hébergées EU si utilisateurs européens (Supabase EU region)

---

## Constraints & Assumptions

### Constraints

- **Budget** : Développement solo/bootstrap, infrastructure gratuite uniquement (tiers gratuits Vercel + Supabase), pas de budget marketing initial

- **Timeline** : MVP ciblé pour 4-5 semaines de développement temps plein (ou 8-10 semaines temps partiel)

- **Resources** : Développeur solo (Davidou), pas d'équipe design dédiée (utilisation templates TailwindUI), pas de QA formel (testing manuel + amis early adopters)

- **Technical** :
  - Limites tier gratuit Supabase : 500MB DB, 2GB bandwidth/mois, 50,000 utilisateurs actifs/mois
  - Pas de budget pour APIs payantes (pas d'IA pour MVP)
  - Support desktop uniquement pour MVP (mobile = nice-to-have)

### Key Assumptions

- Les utilisateurs cibles (chercheurs, étudiants) sont à l'aise avec interfaces web modernes et n'ont pas besoin d'application native

- La validation structurelle automatique (types, cycles) apporte suffisamment de valeur même sans validation sémantique avancée pour le MVP

- React Flow est suffisamment performant et flexible pour supporter les besoins de visualisation sans développer un moteur de graphe custom

- 5 types logiques de base couvrent 70-80% des cas d'usage initiaux des early adopters

- Le public cible préfère publier par défaut (culture académique de partage) plutôt que garder privé

- L'onboarding minimal "learning by doing" est préféré à un tutorial guidé complexe pour une audience experte

- La nomenclature sémantique des prémisses (P, P→Q, majeur/mineur) est suffisamment pédagogique sans explications détaillées

- Les tiers gratuits (Vercel, Supabase) sont suffisants pour les 6 premiers mois (< 1000 utilisateurs actifs)

- L'architecture fractale peut être différée en Phase 2 sans tuer l'adoption MVP (les utilisateurs verront la valeur sans containers d'abord)

---

## Risks & Open Questions

### Key Risks

- **Courbe d'apprentissage sous-estimée** : Même avec public expert, la logique formelle peut être intimidante. Si < 25% des visiteurs créent un graphe, l'onboarding est insuffisant.

  - _Mitigation_ : Ajouter 2-3 graphes exemples pré-chargés cliquables, tooltip contextuelle sur premier node créé.

- **Performance avec graphes complexes** : React Flow peut montrer des limites au-delà de 100 nodes malgré les promesses.

  - _Mitigation_ : Testing de performance précoce avec graphes 150+ nodes, virtualization si nécessaire, avertissement soft limit à 100 nodes pour MVP.

- **Validation trop rigide ou trop permissive** : Trouver le bon équilibre entre "guide" et "frustre" est critique.

  - _Mitigation_ : A/B testing avec early adopters, toggle "mode strict/permissif" si feedback divergent.

- **Adoption académique lente** : Les chercheurs peuvent être conservateurs (inertie des outils existants).

  - _Mitigation_ : Outreach direct dans communities Reddit/Discord de philosophie/logique, présentation dans séminaires universitaires, articles de blog techniques.

- **Dépassement des tiers gratuits** : Succès viral inattendu pourrait coûter cher rapidement.
  - _Mitigation_ : Monitoring strict de quotas, migration plan vers tier payant, soft limits sur nombre de graphes par utilisateur gratuit si nécessaire.

### Open Questions

- Quel feedback visuel pour prémisses partiellement satisfaites (ex: disjonction P∨Q avec seulement P prouvé) ? Vert partiel ? Orange ?

- Comment présenter la bibliothèque publique : page dédiée avec galerie, ou intégrée dans workflow création (templates de démarrage) ?

- Faut-il permettre plusieurs conclusions par node, ou forcer "un node = une conclusion" pour simplicité ?

- Système d'annotations : texte libre simple, ou support Markdown/LaTeX dès MVP ?

- Comment gérer les graphes "work in progress" vs "finalisés/publiés" ? Statut explicite ou implicite ?

- Quelle stratégie de monétisation future si adoption forte : freemium (limites sur nombre de graphes), institutional licenses, ou features premium ?

### Areas Needing Further Research

- **Benchmarking UX détaillé** : Analyse approfondie de Obsidian graph view, Miro, Excalidraw pour patterns d'interaction à emprunter

- **Algorithmes de layout avancés** : Dagre.js vs alternatives (Elk.js, Graphviz) pour performances et qualité visuelle

- **Règles de validation formelle** : Documentation précise des règles logiques pour chaque type de node (modus ponens, tollens, syllogisme, etc.) avec références académiques

- **User testing qualitatif** : 5-10 entretiens avec chercheurs/étudiants avant lancement pour valider hypothèses d'UX

- **Competitive analysis approfondie** : Y a-t-il des outils similaires émergents ? (dernière vérification : aucun trouvé, mais écosystème évolue vite)

---

## Appendices

### A. Research Summary

Ce Project Brief s'appuie sur une session de brainstorming intensive menée le 15 janvier 2026 (voir [docs/brainstorming-session-results.md](brainstorming-session-results.md)) qui a généré 50+ idées et concepts structurés via :

- **Mind Mapping (30 min)** : Exploration systématique des dimensions principales (fonctionnalités cœur, visualisation, persistance, onboarding)
- **First Principles Thinking (15 min)** : Décomposition de la structure de données fondamentale (Node, Connection, Graph)
- **Progressive Convergence (10 min)** : Priorisation en catégories MVP / Phase 2 / Long-terme

**Insights clés identifiés :**

- Architecture fractale = game changer pour composabilité
- Validation non-bloquante encourage apprentissage vs frustration
- Nomenclature sémantique (P, P→Q) transforme l'outil en expérience pédagogique
- Stack zero-cost (Next.js + Supabase + Vercel) rend le projet réalisable en bootstrap

**Décisions architecturales documentées :**

- Prémisses en Map/Object vs Array pour clarté sémantique
- Validation non-bloquante pour UX exploratoire
- Layout horizontal strict (gauche → droite) pour cohérence logique

---

## Document History

- **v1.0** - 15 janvier 2026 : Création initiale par Mary (Business Analyst) en collaboration avec Davidou

---

**Prochain document recommandé** : Product Requirements Document (PRD) détaillé pour spécifications techniques et user stories.
