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

### General

Le rapport généré est un rapport html qui contient les informations suivantes:

- Performance
- Accessibility
- Best Practices
- SEO
- Mozilla's Observatory
- Style Stats

![image](/doc/assets/readme-images/report-html-overview.png)

Chaque section contient des informations sur les points à améliorer et des conseils pour les améliorer.

![image](/doc/assets/readme-images/general-section-details.png)

Les éléments rouges sont les points d'amélioration importants, les éléments jaunes sont les points d'amélioration souhaitables et les éléments verts sont les points positifs.

Vous pouvez cliquer sur chaque éléments pour obtenir plus de détails: une description et certaines fois un tableau avec plus d'informations.

![image](/doc/assets/readme-images/general-audit-details.png)

### Mozilla's Observatory

La section Mozilla's Observatory contient des informations sur la sécurité du site web analysé. Le score affiché dans le cercle est un indicateur général. Ce score `NE REPRESENTE PAS LE SCORE MOZILLA` mais le ratio de tests réussis par rapport au nombre total de tests effectués.

`Le score Mozilla est affiché dans le 1er test de la section.`

![image](/doc/assets/readme-images/Mozilla-audit-details.png)

Dans l'exemple ci-dessus, le score global est de 71% mais le score Mozilla est de 65/100

Dans le groupe "OBSERVATORY DETAILS" vous trouverez la liste des tests effectués et leur résultat.
En cliquant sur un test, vous pourrez obtenir plus de détails sur la réussite ou de l'échec du test.

![image](/doc/assets/readme-images/Mozilla-audit-observatory-details.png)

### Style Stats

La section Style Stats contient 2 groupes de données:

- CSS Stats: qui contient des informations sur les styles CSS utilisés sur la page.
- Yellow Labs: qui contient des informations plus poussées sur le style et la qualité générale du site analysé.

#### CSS Stats

En cliquant sur le test, vous pourrez voir un tableau regroupant les informations suivantes:

- Unique colors
- Unique background colors
- Total declarations

avec le résultat et une icône indiquant si le résultat est bon (vert), moyen (orange) ou mauvais (rouge).

#### Yellow Labs

Sur le boutton du test, vous pourrez voir le nom du test ainsi que le score du test.

En cliquant sur le test, vous pourrez voir une description du test et pourquoi il est utile ainsi tableau regroupant les informations suivantes:

- isOkThreshold: en dessous de cette valeur, le test est considéré comme bon `(1/1)`
- isBadThreshold: au dessus de cette valeur, le test est considéré comme mauvais `(0.5/1)`
- isAbnormalThreshold: au dessus de cette valeur, le test est considéré comme anormal/raté `(0/1)`

Grâce au tableau, vous pourrez comparer le score et voir où il se situe par rapport aux seuils.

![image](/doc/assets/readme-images/Style-stats-audit.png)
