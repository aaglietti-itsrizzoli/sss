#!/bin/bash

set -e

echo "#### do-it.sh: $(date) - start"

echo "#### ffmpeg version START"
ffmpeg -version
echo "#### ffmpeg version END"

echo "yt-dlp --version: $(yt-dlp --version)"

ME=$(basename "$0")

echo "#### do-it.sh: $(date) - me is ${ME}"

echo "#### Insert the football player name"
read FOOTBALL_PLAYER_NAME
echo "#### FOOTBALL_PLAYER_NAME: ${FOOTBALL_PLAYER_NAME}"

echo "#### Insert the YouTube video URL"
read YOUTUBE_VIDEO_URL

echo "#### YOUTUBE_VIDEO_URL: ${YOUTUBE_VIDEO_URL}"
YOUTUBE_VIDEO_FILENAME=tmp

# yt-dlp --format=mp4 --output=$YOUTUBE_VIDEO_FILENAME https://www.youtube.com/watch?v=2ZEA7O3qdnE
yt-dlp --format=mp4 --output=$YOUTUBE_VIDEO_FILENAME $YOUTUBE_VIDEO_URL

rm $YOUTUBE_VIDEO_FILENAME
