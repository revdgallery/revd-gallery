import { defineType, defineField, defineArrayMember } from 'sanity';

export const archive = defineType({
  name: 'archive',
  title: 'Archive',
  type: 'document',
  fields: [
    defineField({
      name: 'exhibition',
      title: 'Exhibition',
      type: 'reference',
      to: [{ type: 'exhibition' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'catalogPdf',
      title: 'Exhibition Catalog (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'photos',
      title: 'Exhibition Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'archivedDate',
      title: 'Archived Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'curatorNotes',
      title: 'Curator Notes',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'pressLinks',
      title: 'Press Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Link Title',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      exhibitionTitle: 'exhibition.title',
      archivedDate: 'archivedDate',
      media: 'coverImage',
    },
    prepare({ exhibitionTitle, archivedDate, media }) {
      return {
        title: exhibitionTitle || 'Untitled Exhibition',
        subtitle: `Archived: ${archivedDate}`,
        media: media,
      };
    },
  },
});
