# Lighthouse audit plugin

## Description

Ce plugin permet d'auditer une URL à l'aide de Lighthouse et de générer un rapport html dans le dossier `outputs`.

## installation

Tout d'abord vous devrez installer NodeJS et npm.
Pour cela vous pouvez suivre ce [lien](https://nodejs.org/en/download/).

Ensuite

- téléchargez le code source du plugin.
- Ouvrez un terminal de commande en cliquant sur le bouton droit de la souris dans le dossier où vous avez téléchargé le code source.
- cliquez sur `Ouvrir une fenêtre de commande ici`.

Une fois le terminal de commande ouvert, exécutez la commande suivante:

```bash
npm install
```

Une fois l'installation terminée, vous pouvez exécuter le plugin en utilisant la commande suivante:

```bash
node index.js "https://votre-url.com/"
```

IMPORTANT: Remplacez `https://votre-url.com/` par l'URL que vous souhaitez auditer et ne mettez pas de sous dossiers (exemple `https://votre-url.com/fr-fr`).

Le rapport sera généré dans le dossier `outputs` à la racine du projet.

Le script peut mettre un peu de temps à s'exécuter en fonction de la taille de la page à auditer. Veuillez donc ne pas interrompre le processus.

Une fois le processus terminé, vous verrez le message `Lighthouse report generated in outputs/lhreport-www.votre-url-/` dans le terminal de commande.
