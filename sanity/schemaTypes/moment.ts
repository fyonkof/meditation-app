import { defineField, defineType } from 'sanity';

export const moment = defineType({
  name: 'moment',
  title: 'Moment',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Short line shown over the video.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description:
        'Streaming URL from your video host (for example a Mux .m3u8 link). Loop length up to 60 seconds, no audio track.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'music',
      type: 'file',
      options: { accept: 'audio/*' },
      description: 'Background music. Loops while the moment is on screen.',
    }),
    defineField({
      name: 'voiceover',
      type: 'file',
      options: { accept: 'audio/*' },
      description: 'Guided voiceover. Plays once each time the moment is shown.',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'published',
      type: 'boolean',
      initialValue: false,
      description: 'Only published moments appear in the app.',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'caption' } },
});
