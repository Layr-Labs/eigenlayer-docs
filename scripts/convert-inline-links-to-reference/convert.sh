#!/bin/bash

# Find all .md files in the current directory and its subdirectories
files=($(ag -l -G "\.md\$"))

# Get the total number of files
total=${#files[@]}

# Initialize the progress counter
counter=1

# Process each file using pandoc
for file in "${files[@]}"; do
  python3 scripts/convert-inline-links-to-reference/convert_links.py "$file"
  
  # Calculate the progress percentage
  progress=$((counter * 100 / total))
  
  # Print the progress
  echo "Processing file $counter of $total ($progress%): $file"
  
  # Increment the progress counter
  ((counter++))
done

echo "Conversion complete!"

