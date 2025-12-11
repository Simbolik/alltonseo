import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const PageHeroes: CollectionConfig = {
  slug: 'page-heroes',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'pageType', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Hero Name',
      admin: {
        description: 'Give this hero a descriptive name (e.g., "Homepage Hero", "About Page Hero")',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      label: 'Page Type',
      options: [
        { label: 'Homepage', value: 'homepage' },
        { label: 'Search Page', value: 'search' },
        { label: 'About Page', value: 'about' },
        { label: 'Contact Page', value: 'contact' },
        { label: 'Custom', value: 'custom' },
      ],
      admin: {
        description: 'Select which page type this hero is for (Category heroes are managed in the Categories collection)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Hero Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
}
