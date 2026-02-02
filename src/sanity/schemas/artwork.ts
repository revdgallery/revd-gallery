import { defineType, defineField } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1000).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Oil on canvas, Digital print, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'framePosition',
      title: 'Frame Position',
      type: 'object',
      description: 'Position of the artwork in the gallery',
      fields: [
        {
          name: 'room',
          title: 'Room Number',
          type: 'number',
          initialValue: 1,
        },
        {
          name: 'frame',
          title: 'Frame Number',
          type: 'number',
          initialValue: 1,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      year: 'year',
      media: 'image',
    },
    prepare({ title, artist, year, media }) {
      return {
        title: title,
        subtitle: `${artist} (${year})`,
        media: media,
      };
    },
  },
});
