/**
 * Campus photos. Drop more images into public/campus/ and add them here:
 * { src: '/campus/<file>', alt: 'what the photo shows', caption: 'short label', position: 'center' }
 * The first photo is used as the hero background; every photo appears in the Campus section.
 */
export const campusPhotos = [
  {
    src: '/campus/campus-sunset.webp',
    alt: 'DUET academic block and lawn with a fountain at sunset',
    caption: 'Main academic block and lawn at sunset',
    position: 'center',
  },
];

/** Used when a photo has no entry for a given spot, so the layout never breaks. */
export const heroPhoto = campusPhotos[0];
