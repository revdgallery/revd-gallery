import { defineType, defineField } from 'sanity';

export const bulletin = defineType({
  name: 'bulletin',
  title: 'Bulletin',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Bulletin Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      description: 'Toggle to show/hide this bulletin',
      initialValue: false,
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date (if applicable)',
      type: 'date',
    }),
    defineField({
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
      description: 'e.g., 18:00 - 21:00',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      isPublished: 'isPublished',
      media: 'poster',
    },
    prepare({ title, publishDate, isPublished, media }) {
      const status = isPublished ? '🟢 Published' : '⚫ Draft';
      return {
        title: `${title} ${status}`,
        subtitle: publishDate,
        media: media,
      };
    },
  },
});
