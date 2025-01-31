#!/bin/bash

echo "#### post-create-command.sh: $(date) - start"

set -e

env

me=$(basename "$0")

echo "#### post-create-command.sh: $(date) - me is $(me)"

sed -i "s#POSTGRES_URL#${POSTGRES_URL}#g" .vscode/settings.json

pip install yt-dlp

npm install

sudo apt-get update

sudo apt-get install -y ffmpeg

sudo apt-get install -y git-lfs

echo "#### post-create-command.sh: $(date) - end"
