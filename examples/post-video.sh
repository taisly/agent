#!/usr/bin/env bash
set -euo pipefail

: "${TAISLY_API_KEY:?Set TAISLY_API_KEY first}"

VIDEO_PATH="${1:?Usage: ./post-video.sh ./video.mp4 platform_id_1,platform_id_2 \"Caption\"}"
PLATFORMS="${2:?Pass comma-separated platform ids}"
DESCRIPTION="${3:?Pass a caption/description}"

taisly posts:create \
  --video "$VIDEO_PATH" \
  --platforms "$PLATFORMS" \
  --description "$DESCRIPTION"
