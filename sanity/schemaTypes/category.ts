import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Used by the app to filter moments. Generate it from the title.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'string' }),
    defineField({ name: 'cover', title: 'Cover image', type: 'image' }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first on the home screen.',
    }),
  ],
});
