---
title: Bereitstellung einer Hugo-Anwendung mit GitHub Actions auf einem selbstgehosteten Server
date: 2025-01-01T20:35:10+02:00
draft: false
author: Ugur Köysüren
lang: de
tags: 
  - Hugo
  - Github
  - Workflows
  - Github Actions
  - Devops
---
# Bereitstellung einer Hugo-Anwendung mit GitHub Actions auf einem selbstgehosteten Server

In diesem Tutorial wird der Prozess beschrieben, wie Sie eine Hugo-Website auf einem selbstgehosteten Server mithilfe von GitHub Actions bereitstellen können. Diese Konfiguration ermöglicht einen automatisierten Workflow, bei dem Änderungen automatisch erstellt und auf den Server übertragen werden, sobald sie in Ihr Repository gepusht werden.

---

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes haben:

1. Eine Hugo-Anwendung, die auf GitHub gehostet wird.
2. Zugriff auf einen selbstgehosteten Server mit aktivierter SSH-Verbindung.
3. GitHub CLI installiert oder Zugriff auf die Einstellungen Ihres Repositorys.

---

## Schritt 1: Server vorbereiten

1. Stellen Sie sicher, dass Ihr Server per SSH erreichbar ist.
2. Installieren Sie einen Webserver (z. B. Nginx oder Apache), um Ihre Hugo-Website bereitzustellen.
3. Erstellen Sie ein Verzeichnis auf dem Server, in dem die Hugo-Website bereitgestellt wird (z. B. `/var/www/hugo-site`).

---

## Schritt 2: SSH-Schlüsselpaar generieren

1. Generieren Sie auf Ihrem lokalen Rechner ein SSH-Schlüsselpaar:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```  
   Speichern Sie den Schlüssel ohne Passphrase.

2. Kopieren Sie den öffentlichen Schlüssel auf den Server:
   ```bash
   ssh-copy-id user@your-server-ip
   ```  

3. Fügen Sie den privaten Schlüssel als Geheimnis in Ihr GitHub-Repository ein:

   - Navigieren Sie zu **Settings > Secrets and variables > Actions**.
   - Fügen Sie ein neues Geheimnis mit dem Namen `DEPLOY_KEY` hinzu und fügen Sie den privaten Schlüssel ein.

---

## Schritt 3: Zusätzliche Secrets hinzufügen

Fügen Sie die folgenden Secrets in Ihrem GitHub-Repository hinzu:

- **DEPLOY_HOST_IP**: Die IP-Adresse Ihres Servers (z. B. `192.168.1.100`).
- **DEPLOY_USER**: Der SSH-Benutzername (z. B. `user`).
- **DEPLOY_PATH**: Der Pfad, in dem die Hugo-Website bereitgestellt wird (z. B. `/var/www/hugo-site`).
- **HUGO_VERSION** (optional): Die Version von Hugo, die verwendet werden soll (z. B. `0.117.0`).

---

## Schritt 4: GitHub Actions Workflow konfigurieren

Erstellen Sie in Ihrem Repository eine neue Datei unter `.github/workflows/deploy.yml` und fügen Sie den folgenden Inhalt ein:

```yaml
name: Deploy Hugo Blog to Production

on: push

jobs:
  deploy-hugo-blog:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Load Hugo version from environment
        run: |
          . ./.env
          echo "HUGO_VERSION=${HUGO_VERSION}" >> $GITHUB_ENV

      - name: Install Hugo static site generator
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '${{ env.HUGO_VERSION }}'
          extended: true

      - name: Configure Hugo module cache
        uses: actions/cache@v3
        with:
          path: /tmp/hugo_cache
          key: ${{ runner.os }}-hugo-modules-${{ hashFiles('**/go.sum') }}
          restore-keys: |
            ${{ runner.os }}-hugo-modules-

      - name: Generate static site
        env:
          TZ: 'Europe/Berlin'
        run: hugo --minify

      - name: Configure SSH deployment key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.DEPLOY_KEY }}
          known_hosts: unnecessary

      - name: Configure SSH known hosts
        run: ssh-keyscan -H ${{ secrets.DEPLOY_HOST_IP }} >> ~/.ssh/known_hosts

      - name: Sync site to production server
        run: rsync -vaz --delete ./public/ ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST_IP }}:${{ secrets.DEPLOY_PATH }}
```

---

## Fazit

Dieser Workflow ermöglicht es Ihnen, Ihre Hugo-Website effizient und automatisiert auf einem selbstgehosteten Server bereitzustellen. Weitere Informationen und Beispiele finden Sie in der [Pipeline dieses Blogs](https://github.com/ugurkoysuren/ugurkoysuren.com/blob/main/.github/workflows/publish.yml).
