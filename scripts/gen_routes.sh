#!/bin/bash -e

source ./ci-scripts/run_with_status.sh

run_with_status "Building old site" yarn build
sed 's/xmlns="[^"]*"//g' build/sitemap.xml | xmllint --xpath '//*[local-name()="loc"]/text()' - | while read -r url; do
  echo "${url#https://docs.eigenlayer.xyz}"
done
