import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';


const productsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    main: z.object({
      id: z.number(),
      content: z.string(),
      imgCard: image(),
      imgMain: image(),
      imgAlt: z.string(),
    }),
    tabs: z.array(
      z.object({
        id: z.string(),
        dataTab: z.string(),
        title: z.string(),
      })
    ),
    longDescription: z.object({
      title: z.string(),
      subTitle: z.string(),
      btnTitle: z.string(),
      btnURL: z.string(),
    }),
    descriptionList: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ),
    specificationsLeft: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ),
    specificationsRight: z.array(
      z.object({
        title: z.string(),
        subTitle: z.string(),
      })
    ).optional(),
    tableData: z.array(
      z.object({
        feature: z.array(z.string()),
        description: z.array(z.array(z.string())),
      })
    ).optional(),
    blueprints: z.object({
      first: image().optional(),
      second: image().optional(),
    }),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
    title: z.string(),
    description: z.string(),
    contents: z.array(z.string()),
    author: z.string(),
    role: z.string().optional(),
    authorImage: image(),
    authorImageAlt: z.string(),
    pubDate: z.date(),
    cardImage: image(),
    cardImageAlt: z.string(),
    readTime: z.number(),
    tags: z.array(z.string()).optional(),
  }),
});

const insightsCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
    title: z.string(),
    description: z.string(),
    cardImage: image(),
    cardImageAlt: z.string(),
  }),
});


// Define common schemas
const productHighlight = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string()
});

const productSpec = z.record(z.string(), z.record(z.string(), z.string()));

const keySpec = z.object({
  label: z.string(),
  value: z.string()
});

// Define the specs collection schema
const specsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    productId: z.string(),
    category: z.string(),
    image: z.string().optional(),
    price: z.string().optional(),
    highlights: z.array(productHighlight).optional(),
    keySpecs: z.array(keySpec).optional(),
    specs: productSpec,
    order: z.number().optional().default(0),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false)
  })
});

// Define the comparisons collection schema
const comparisonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    productIds: z.array(z.string()),
    showProfiles: z.boolean().optional().default(true),
    featuresToCompare: z.array(z.object({
      label: z.string(),
      path: z.string()
    })),
    draft: z.boolean().optional().default(false)
  })
});

// Define feed schema
const feedCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    // Add content field for the main content
    content: z.string(),
    // Add any additional metadata fields
    metadata: z.object({
      views: z.number().optional(),
      readTime: z.number().optional(),
    }).optional(),
  })
});



export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  'products': productsCollection,
  'blog': blogCollection,
  'insights': insightsCollection,
  'specs': specsCollection,
  'comparisons': comparisonsCollection,
  'feed': feedCollection,

};
