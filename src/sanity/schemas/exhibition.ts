import { defineType, defineField, defineArrayMember } from 'sanity';

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Exhibition Title',
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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this exhibition in the gallery',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'artwork' }],
        }),
      ],
    }),
    defineField({
      name: 'rooms',
      title: 'Gallery Rooms',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'room',
          title: 'Room',
          fields: [
            {
              name: 'name',
              title: 'Room Name',
              type: 'string',
            },
            {
              name: 'modelFile',
              title: '3D Model File (GLB/GLTF)',
              type: 'file',
              options: {
                accept: '.glb,.gltf',
              },
            },
            {
              name: 'frames',
              title: 'Frame Configurations',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'frame',
                  title: 'Frame',
                  fields: [
                    {
                      name: 'frameId',
                      title: 'Frame ID',
                      type: 'string',
                      description: 'Unique identifier matching the frame in the 3D model',
                    },
                    {
                      name: 'position',
                      title: 'Position',
                      type: 'object',
                      fields: [
                        { name: 'x', type: 'number', title: 'X' },
                        { name: 'y', type: 'number', title: 'Y' },
                        { name: 'z', type: 'number', title: 'Z' },
                      ],
                    },
                    {
                      name: 'rotation',
                      title: 'Rotation',
                      type: 'object',
                      fields: [
                        { name: 'x', type: 'number', title: 'X' },
                        { name: 'y', type: 'number', title: 'Y' },
                        { name: 'z', type: 'number', title: 'Z' },
                      ],
                    },
                    {
                      name: 'size',
                      title: 'Size',
                      type: 'object',
                      fields: [
                        { name: 'width', type: 'number', title: 'Width' },
                        { name: 'height', type: 'number', title: 'Height' },
                      ],
                    },
                    {
                      name: 'artwork',
                      title: 'Assigned Artwork',
                      type: 'reference',
                      to: [{ type: 'artwork' }],
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      isActive: 'isActive',
      media: 'coverImage',
    },
    prepare({ title, startDate, endDate, isActive, media }) {
      const status = isActive ? '🟢 Active' : '⚫ Inactive';
      return {
        title: `${title} ${status}`,
        subtitle: `${startDate} - ${endDate}`,
        media: media,
      };
    },
  },
});
