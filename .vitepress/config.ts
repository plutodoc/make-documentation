// import third-party modules
import { defineConfig } from 'vitepress';


export default defineConfig({
  description: "A tool which controls the generation of executables and other non-source files of a program from the program's source files",
  lang: 'en-US',
  lastUpdated: true,
  title: 'GNU Make',
  themeConfig: {
    nav: nav(),
    outline: [2, 3],
    sidebar: {
      '/guide/': sidebarGuide(),
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://git.savannah.gnu.org/cgit/make.git/',
      }
    ],
    footer: {
      copyright: `Copyright © 2019-${new Date().getFullYear()} My Project, Inc. Built with VitePress`
    },
  },
})

function nav() {
  return [
    {
      activeMatch: '/guide/',
      link: '/guide/overview',
      text: 'Guide',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      link: '/guide/intro',
      text: 'Intro',
    },
    {
      collapsed: false,
      link: '/guide/overview',
      text: 'Overview of make',
      items: [
        {
          link: '/guide/reading',
          text: 'How to Read This Manual',
        },
        {
          link: '/guide/bugs',
          text: 'Problems and Bugs',
        },
      ],
    },
    {
      collapsed: false,
      link: '/guide/introduction',
      text: 'An Introduction to Makefiles',
      items: [
        {
          link: '/guide/rule-introduction',
          text: 'What a Rule Looks Like',
        },
        {
          link: '/guide/simple-makefile',
          text: 'A Simple Makefile',
        },
        {
          link: '/guide/how-make-works',
          text: 'How make Processes a Makefile',
        },
        {
          link: '/guide/variables-simplify',
          text: 'Variables Make Makefiles Simpler',
        },
        {
          link: '/guide/make-deduces',
          text: 'Letting make Deduce the Recipes',
        },
        {
          link: '/guide/combine-by-prerequisite',
          text: 'Another Style of Makefile',
        },
        {
          link: '/guide/cleanup',
          text: 'Rules for Cleaning the Directory',
        },
      ],
    },
    {
      collapsed: false,
      link: '/guide/makefiles',
      text: 'Writing Makefiles',
      items: [
        {
          link: '/guide/makefile-contents',
          text: 'What Makefiles Contain',
        },
        {
          link: '/guide/splitting-lines',
          text: 'Splitting Long Lines',
        },
        {
          link: '/guide/makefile-names',
          text: 'What Name to Give Your Makefile',
        },
        {
          link: '/guide/include',
          text: 'Including Other Makefiles',
        },
        {
          link: '/guide/makefiles-variable',
          text: 'The Variable MAKEFILES',
        },
        {
          link: '/guide/remaking-makefiles',
          text: 'How Makefiles Are Remade',
        },
        {
          link: '/guide/overriding-makefiles',
          text: 'Overriding Part of Another Makefile',
        },
        {
          link: '/guide/reading-makefiles',
          text: 'How make Reads a Makefile',
        },
        {
          link: '/guide/parsing-makefiles',
          text: 'How Makefiles Are Parsed',
        },
        {
          link: '/guide/secondary-expansion',
          text: 'Secondary Expansion',
        },
      ],
    },
  ]
}
