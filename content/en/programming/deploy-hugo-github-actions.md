---
title: Deploying a Hugo Application using Github Actions on a a self hosted Server
date: 2025-01-01T20:35:10+02:00
draft: false
author: Ugur Köysüren
lang: en
tags: 
  - Hugo
  - Github
  - Workflows
  - Github Actions
  - Devops
---

# Deploying a Hugo Application Using GitHub Actions on a Self-Hosted Server

In this tutorial, we will walk through the process of deploying a Hugo static site to a self-hosted server using GitHub
Actions. This setup ensures an automated workflow where your changes are built and deployed to the server whenever you
push updates to your repository.

## Prerequisites

Before getting started, ensure you have the following:

1. A Hugo application hosted on GitHub.
2. Access to a self-hosted server with SSH enabled.
3. Installed GitHub CLI or access to your repository's settings.

---

## Step 1: Prepare Your Server

1. Ensure your server is accessible via SSH.
2. Install a web server (e.g., Nginx, Apache) to serve your Hugo site.
3. Create a directory on the server where the Hugo site will be deployed (e.g., `/var/www/hugo-site`).

---

## Step 2: Generate an SSH Key Pair

1. On your local machine, generate an SSH key pair:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

Save the key without a passphrase.

2. Copy the public key to the server:

   ```bash
    ssh-copy-id user@your-server-ip
   ```

3. Add the private key to your GitHub repository as a secret:

- Navigate to Settings > Secrets and variables > Actions.
- Add a new secret named DEPLOY_KEY and paste the private key.
  
## Step 3: Add Additional Secrets
  Add the server's IP address:

Secret name: DEPLOY_HOST_IP
Value: Your server's IP (e.g., 192.168.1.100).
Add the server's SSH username:

Secret name: DEPLOY_USER
Value: Your SSH username (e.g., user).
Add the deployment path on the server:

Secret name: DEPLOY_PATH
Value: The path where the Hugo site will be deployed (e.g., /var/www/hugo-site).
Add Hugo version (optional):

Secret name: HUGO_VERSION
Value: The version of Hugo you want to use (e.g., 0.117.0).
## Step 4: Configure the GitHub Actions Workflow
Create a new file in your repository at .github/workflows/deploy.yml and add the following content:

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

## Conclusion

You can also check the pipeline of this [blogs](https://github.com/ugurkoysuren/ugurkoysuren.com/blob/main/.github/workflows/publish.yml) workflow
