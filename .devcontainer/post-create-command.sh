#!/bin/bash

echo "#### post-create-command.sh: $(date) - start"

set -e

env

me=$(basename "$0")

echo "#### post-create-command.sh: $(date) - me is $(me)"

sed -i "s#POSTGRES_URL#${POSTGRES_URL}#g" .vscode/settings.json

npm install

echo "#### post-create-command.sh: $(date) - end"
