# Lighthouse audit plugin

## Description

Ce plugin permet d'auditer une URL à l'aide de Lighthouse et de générer un rapport html dans le dossier `outputs`.

## installation

Tout d'abord vous devrez installer NodeJS et npm.
Pour cela vous pouvez suivre ce [lien](https://nodejs.org/en/download/).

![image](/doc/assets/readme-images/Nodejs-DownloadButton.png)

Ensuite

- téléchargez le code source du plugin. ![image](/doc/assets/readme-images/Github-DownloadButton.png)![image](/doc/assets/readme-images/Github-DownloadZIP-Button.png)
- Extrayez le contenu du fichier zip dans un dossier de votre choix.
- Ouvrez un terminal de commande en cliquant sur le bouton droit de la souris dans le dossier où vous avez extrait le code source. Le dossier doit ressembler à ceci: ![image](/doc/assets/readme-images/source-code-folder.png)
- cliquez sur `Ouvrir une fenêtre de commande ici`. ![image](/doc/assets/readme-images/ouvrir-terminal-windows-avec-menu-contextuel-bureau-windows-11.png)

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

## Utilisation

Exemple de commande:

```bash
node index.js "https://www.google.com/"
```

Le rapport sera généré dans le dossier `outputs/lhreport-www.google.com/` à la racine du projet.

![image](/doc/assets/readme-images/lighthouse-report.png)

## Explication du rapport

Le rapport généré est un rapport html qui contient les informations suivantes:

- Performance
- Accessibility
- Best Practices
- SEO
- Mozilla's Observatory
- Style Stats

![image](/doc/assets/readme-images/report-html-overview.png)
