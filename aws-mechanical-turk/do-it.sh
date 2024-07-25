#!/bin/bash

set -e

echo "#### do-it.sh: $(date) - start"

echo "#### ffmpeg version START"
ffmpeg -version
echo "#### ffmpeg version END"

echo "yt-dlp --version: $(yt-dlp --version)"

ME=$(basename "$0")
ME_DIR=$(dirname "$0")

echo "#### do-it.sh: $(date) - me is ${ME} in ${ME_DIR}"

echo "#### Insert the football player name"
read FOOTBALL_PLAYER_NAME
echo "#### FOOTBALL_PLAYER_NAME: ${FOOTBALL_PLAYER_NAME}"

echo "#### Insert the YouTube video URL"
read YOUTUBE_VIDEO_URL

echo "#### YOUTUBE_VIDEO_URL: ${YOUTUBE_VIDEO_URL}"
VIDEO_DIGEST=$(printf $YOUTUBE_VIDEO_URL | sha256sum)
VIDEO_DIGEST_LEFT=${VIDEO_DIGEST:0:6}
YOUTUBE_VIDEO_FILENAME=${FOOTBALL_PLAYER_NAME}-${VIDEO_DIGEST_LEFT}.mp4
YOUTUBE_VIDEO_FILEPATH=${ME_DIR}/videos/${YOUTUBE_VIDEO_FILENAME}

# yt-dlp --format=mp4 --output=tmp https://www.youtube.com/watch?v=2ZEA7O3qdnE
if [ ! -f ${YOUTUBE_VIDEO_FILEPATH} ]; then
    echo "File ${YOUTUBE_VIDEO_FILEPATH} NOT found, donwload it!"
    yt-dlp --format=mp4 --output=$YOUTUBE_VIDEO_FILEPATH $YOUTUBE_VIDEO_URL
fi

echo "#### Insert HH:MM:SS"
read FFMPEG_SEEK

echo "#### How many frames?"
read FFMPEG_FRAMES_COUNT

# ffmpeg -ss 00:00:08 -i tmp -frames:v 4 output-%04d.png
ffmpeg -ss $FFMPEG_SEEK -i $YOUTUBE_VIDEO_FILEPATH -frames:v $FFMPEG_FRAMES_COUNT ${ME_DIR}/frames/${YOUTUBE_VIDEO_FILENAME}-%04d.png

PICS_FRAMES_FOLDER=${ME_DIR}/../public/pics/frames/${VIDEO_DIGEST_LEFT}
echo "### PICS_FRAMES_FOLDER: ${PICS_FRAMES_FOLDER}"

mkdir -p ${PICS_FRAMES_FOLDER}

echo "#### manually select frames from ${ME_DIR}/frames/ moving them to ${PICS_FRAMES_FOLDER}"
echo "#### then press enter"
read CONFIRM

PWD_BEFORE=$(pwd)
cd ${PICS_FRAMES_FOLDER}
for file in ${FOOTBALL_PLAYER_NAME}-*; do mv "$file" "${file#${FOOTBALL_PLAYER_NAME}-}";done;
cd $PWD_BEFORE

git add public/pics/frames/${VIDEO_DIGEST_LEFT}/*

echo "#### verify that staged frames on Git are the ones you want, eventually unstage some of them"
echo "#### then press enter"
read CONFIRM

FRAMES_JSON_FILE=pics/frames/${VIDEO_DIGEST_LEFT}.json
PWD_BEFORE=$(pwd)
cd public/
ls -l pics/frames/${VIDEO_DIGEST_LEFT}/*.png | \
    awk '{print $9}' | \
    jq -R -s -c 'split("\n") | map(select(length>0)) | {frames: .}' | \
    jq > ${FRAMES_JSON_FILE}
cd $PWD_BEFORE

git add ${FRAMES_JSON_FILE}

git commit -m "chore(frames): ${VIDEO_DIGEST_LEFT}"

echo "#### everything fine, frame index JSON file is ${FRAMES_JSON_FILE}"
