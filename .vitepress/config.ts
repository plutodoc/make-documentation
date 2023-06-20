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
      link : '/guide/introduction',
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
  ]
}
