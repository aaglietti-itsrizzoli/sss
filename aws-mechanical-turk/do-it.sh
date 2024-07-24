#!/bin/bash

set -e

echo "#### do-it.sh: $(date) - start"

echo "#### ffmpeg version START"
ffmpeg -version
echo "#### ffmpeg version END"

echo "yt-dlp --version: $(yt-dlp --version)"

me=$(basename "$0")

echo "#### do-it.sh: $(date) - me is $(me)"
