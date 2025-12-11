import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  InlineCodeFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  HorizontalRuleFeature,
  UploadFeature,
  AlignFeature,
  IndentFeature,
  RelationshipFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HTMLConverterFeature,
  EXPERIMENTAL_TableFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    // Toolbars
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    
    // Basic text
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    
    // Text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    
    // Links and relationships
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    RelationshipFeature(),
    
    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    
    // Blocks
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    
    // Layout
    AlignFeature(),
    IndentFeature(),
    
    // Media
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
          ],
        },
      },
    }),
    
    // Advanced features
    BlocksFeature({
      blocks: [],
    }),
    EXPERIMENTAL_TableFeature(),
    HTMLConverterFeature(),
  ],
})
