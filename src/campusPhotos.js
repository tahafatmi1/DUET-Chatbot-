/**
 * Campus photos. Drop more images into public/campus/ and add them here:
 * { src: '/campus/<file>', alt: 'what the photo shows', caption: 'short label', position: 'center' }
 * Mark one photo with hero: true to use it as the hero background.
 * The Campus section shows the first non-hero photo large and the rest as thumbnails.
 */
export const campusPhotos = [
  {
    src: '/campus/campus-sunset.webp',
    alt: 'DUET academic block and lawn with a fountain at sunset',
    caption: 'Academic block and lawn at sunset',
    position: 'center',
    hero: true,
  },
  {
    src: '/campus/campus-entrance.webp',
    alt: 'DUET building with the Dawood University of Engineering and Technology sign',
    caption: 'Dawood University of Engineering & Technology',
    position: 'center',
  },
  {
    src: '/campus/campus-courtyard.webp',
    alt: 'Courtyard lawn with seating areas and academic blocks',
    caption: 'Courtyard and lawn',
    position: 'center',
  },
];

export const heroPhoto = campusPhotos.find((p) => p.hero) ?? campusPhotos[0];

/** Campus section photos: the hero photo goes last so it is not repeated as the big picture. */
export const galleryPhotos = [...campusPhotos.filter((p) => p !== heroPhoto), heroPhoto];
