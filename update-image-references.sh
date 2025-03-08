#!/bin/bash

# Move all JPG files from static to assets if they don't already exist
for img in static/images/blog/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        if [ ! -f "assets/images/blog/$filename" ]; then
            echo "Moving $img to assets/images/blog/$filename"
            cp "$img" "assets/images/blog/$filename"
        fi
    fi
done

# Now remove all JPG files from static since they're in assets
echo "Removing duplicate images from static directory..."
rm -rf static/images/blog/*.jpg

# Update image references in content files
echo "Updating image references in content files..."
find content -name "*.md" -type f -exec sed -i '' 's|featured_image: "/images/blog/|featured_image: "/images/blog/|g' {} \;

echo "Image references updated and duplicates removed!" 