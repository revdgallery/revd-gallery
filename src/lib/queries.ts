import { groq } from 'next-sanity';

// Homepage queries
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    heroImage,
    aboutText,
    "featuredExhibition": featuredExhibition-> {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      isActive,
      coverImage
    },
    "featuredBulletins": featuredBulletins[]-> {
      _id,
      title,
      slug,
      poster,
      publishDate,
      isPublished
    }[isPublished == true]
  }
`;

// Exhibition queries
export const activeExhibitionQuery = groq`
  *[_type == "exhibition" && isActive == true][0] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    isActive,
    coverImage,
    "artworks": artworks[]-> {
      _id,
      title,
      artist,
      year,
      medium,
      description,
      image,
      framePosition
    },
    rooms[] {
      _key,
      name,
      "modelFile": modelFile.asset-> {
        _ref,
        url
      },
      frames[] {
        _key,
        frameId,
        position,
        rotation,
        size,
        "artwork": artwork-> {
          _id,
          title,
          artist,
          year,
          medium,
          description,
          image
        }
      }
    }
  }
`;

export const allExhibitionsQuery = groq`
  *[_type == "exhibition"] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    isActive,
    coverImage
  }
`;

export const exhibitionBySlugQuery = groq`
  *[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    isActive,
    coverImage,
    "artworks": artworks[]-> {
      _id,
      title,
      artist,
      year,
      medium,
      description,
      image,
      framePosition
    },
    rooms[] {
      _key,
      name,
      "modelFile": modelFile.asset-> {
        _ref,
        url
      },
      frames[] {
        _key,
        frameId,
        position,
        rotation,
        size,
        "artwork": artwork-> {
          _id,
          title,
          artist,
          year,
          medium,
          description,
          image
        }
      }
    }
  }
`;

// Bulletin queries
export const publishedBulletinsQuery = groq`
  *[_type == "bulletin" && isPublished == true] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    poster,
    publishDate,
    isPublished
  }
`;

export const bulletinBySlugQuery = groq`
  *[_type == "bulletin" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    poster,
    publishDate,
    isPublished
  }
`;

// Archive queries
export const archiveItemsQuery = groq`
  *[_type == "archive"] | order(archivedDate desc) {
    _id,
    "exhibition": exhibition-> {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      "artworks": artworks[]-> {
        _id,
        title,
        artist,
        year,
        medium,
        description,
        image
      }
    },
    coverImage,
    "catalogPdf": catalogPdf.asset-> {
      url
    },
    photos,
    archivedDate
  }
`;

export const archiveByIdQuery = groq`
  *[_type == "archive" && _id == $id][0] {
    _id,
    "exhibition": exhibition-> {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      "artworks": artworks[]-> {
        _id,
        title,
        artist,
        year,
        medium,
        description,
        image
      }
    },
    coverImage,
    "catalogPdf": catalogPdf.asset-> {
      url
    },
    photos,
    archivedDate
  }
`;

// Artwork queries
export const allArtworksQuery = groq`
  *[_type == "artwork"] | order(_createdAt desc) {
    _id,
    title,
    artist,
    year,
    medium,
    description,
    image,
    framePosition
  }
`;

export const artworkByIdQuery = groq`
  *[_type == "artwork" && _id == $id][0] {
    _id,
    title,
    artist,
    year,
    medium,
    description,
    image,
    framePosition
  }
`;

// Gallery rooms query
export const galleryRoomsQuery = groq`
  *[_type == "galleryRoom"] | order(order asc) {
    _id,
    name,
    order,
    "modelFile": modelFile.asset-> {
      url
    },
    frames[] {
      _key,
      frameId,
      position,
      rotation,
      size
    }
  }
`;
