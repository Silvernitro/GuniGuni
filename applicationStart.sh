#!/bin/bash
cd /home/ubuntu/hashtap-app
sudo npm install
sudo npm run build
sudo systemctl restart nginx