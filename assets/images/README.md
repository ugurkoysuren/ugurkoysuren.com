# Image Assets for Hugo Processing

This directory contains the original, high-quality images that Hugo will process on-demand.

## Organization

- `profile/` - Contains profile images (like ugur.webp)
- `blog/` - Contains blog post images (named to match their references in content files)

## How Hugo Processes Images

Hugo processes these images on-demand using its built-in image processing capabilities:

1. **Resizing**: Images are automatically resized based on their display context
   - Avatar: 150x150px for profile photo
   - Blog cards: 200px height (width calculated to preserve aspect ratio)
   - Featured images: 350px height (width calculated to preserve aspect ratio)

2. **Format Conversion**: 
   - Images are converted to WebP for optimal compression
   - Original dimensions are maintained for images outside of these contexts

3. **Caching**:
   - Processed images are stored in the `/resources/_gen/images/` directory
   - If you commit this directory to version control, Hugo won't need to regenerate images in your build pipeline

## Adding New Images

1. Place high-quality original images in the appropriate folder
2. Reference them in your content files with the standard path format
3. Hugo will process them automatically with the right sizes and formats

## Cleaning Up

If you change or remove images, you can clean up unused processed images with:

```
hugo --gc
``` 