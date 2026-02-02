import { defineType, defineField, defineArrayMember } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'featuredExhibition',
      title: 'Featured Exhibition',
      type: 'reference',
      to: [{ type: 'exhibition' }],
    }),
    defineField({
      name: 'featuredBulletins',
      title: 'Featured Bulletins',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'bulletin' }],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
      };
    },
  },
});
