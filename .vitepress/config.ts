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
    {
      collapsed: false,
      link: '/guide/rules',
      text: 'Writing Rules',
      items: [
        {
          link: '/guide/rule-example',
          text: 'Rule Example',
        },
        {
          link: '/guide/rule-syntax',
          text: 'Rule Syntax',
        },
        {
          link: '/guide/prerequisite-types',
          text: 'Types of Prerequisites',
        },
        {
          link: '/guide/wildcards',
          text: 'Using Wildcard Characters in File Names',
        },
        {
          link: '/guide/wildcard-examples',
          text: 'Wildcard Examples',
        },
        {
          link: '/guide/wildcard-pitfall',
          text: 'Pitfalls of Using Wildcards',
        },
        {
          link: '/guide/wildcard-function',
          text: 'The Function wildcard',
        },
        {
          link: '/guide/directory-search',
          text: 'Searching Directories for Prerequisites',
        },
        {
          link: '/guide/general-search',
          text: 'VPATH: Search Path for All Prerequisites',
        },
        {
          link: '/guide/selective-search',
          text: 'The vpath Directive',
        },
        {
          link: '/guide/search-algorithm',
          text: 'How Directory Searches are Performed',
        },
        {
          link: '/guide/recipes-search',
          text: 'Writing Recipes with Directory Search',
        },
        {
          link: '/guide/implicit-search',
          text: 'Directory Search and Implicit Rules',
        },
        {
          link: '/guide/libraries-search',
          text: 'Directory Search for Link Libraries',
        },
        {
          link: '/guide/phony-targets',
          text: 'Phony Targets',
        },
        {
          link: '/guide/force-targets',
          text: 'Rules without Recipes or Prerequisites',
        },
        {
          link: '/guide/empty-targets',
          text: 'Empty Target Files to Record Events',
        },
        {
          link: '/guide/special-targets',
          text: 'Special Built-in Target Names',
        },
        {
          link: '/guide/multiple-targets',
          text: 'Multiple Targets in a Rule',
        },
        {
          link: '/guide/multiple-rules',
          text: 'Multiple Rules for One Target',
        },
        {
          link: '/guide/static-pattern',
          text: 'Static Pattern Rules',
        },
        {
          link: '/guide/static-usage',
          text: 'Syntax of Static Pattern Rules',
        },
        {
          link: '/guide/static-versus-implicit',
          text: 'Static Pattern Rules versus Implicit Rules',
        },
        {
          link: '/guide/double-colon',
          text: 'Double-Colon Rules',
        },
        {
          link: '/guide/automatic-prerequisites',
          text: 'Generating Prerequisites Automatically',
        },
      ],
    },
    {
      collapsed: false,
      link: '/guide/recipes',
      text: 'Writing Recipes in Rules',
      items: [
        {
          link: '/guide/recipe-syntax',
          text: 'Recipe Syntax',
        },
        {
          link: '/guide/splitting-recipe-lines',
          text: 'Splitting Recipe Lines',
        },
        {
          link: '/guide/variables-in-recipes',
          text: 'Using Variables in Recipes',
        },
        {
          link: '/guide/echoing',
          text: 'Recipe Echoing',
        },
        {
          link: '/guide/execution',
          text: 'Recipe Execution',
        },
        {
          link: '/guide/one-shell',
          text: 'Using One Shell',
        },
        {
          link: '/guide/choosing-the-shell',
          text: 'Choosing the Shell',
        },
        {
          link: '/guide/parallel',
          text: 'Parallel Execution',
        },
        {
          link: '/guide/parallel-disable',
          text: 'Disabling Parallel Execution',
        },
        {
          link: '/guide/parallel-output',
          text: 'Output During Parallel Execution',
        },
        {
          link: '/guide/parallel-input',
          text: 'Input During Parallel Execution',
        },
        {
          link: '/guide/errors',
          text: 'Errors in Recipes',
        },
        {
          link: '/guide/interrupts',
          text: 'Interrupting or Killing make',
        },
        {
          link: '/guide/recursion',
          text: 'Recursive Use of make',
        },
        {
          link: '/guide/make-variable',
          text: 'How the MAKE Variable Works',
        },
        {
          link: '/guide/variables-recursion',
          text: 'Communicating Variables to a Sub-make',
        },
        {
          link: '/guide/options-recursion',
          text: 'Communicating Options to a Sub-make',
        },
        {
          link: '/guide/the-option',
          text: 'The --print-directory Option',
        },
        {
          link: '/guide/canned-recipes',
          text: 'Defining Canned Recipes',
        },
        {
          link: '/guide/empty-recipes',
          text: 'Using Empty Recipes',
        },
      ],
    },
    {
      collapsed: false,
      link: '/guide/using-variables',
      text: 'How to Use Variables',
      items: [
        {
          link: '/guide/reference',
          text: 'Basics of Variable References',
        },
        {
          link: '/guide/flavors',
          text: 'The Two Flavors of Variables',
        },
        {
          link: '/guide/recursive-assignment',
          text: 'Recursively Expanded Variable Assignment',
        },
        {
          link: '/guide/simple-assignment',
          text: 'Simply Expanded Variable Assignment',
        },
        {
          link: '/guide/immediate-assignment',
          text: 'Immediately Expanded Variable Assignment',
        },
        {
          link: '/guide/conditional-assignment',
          text: 'Conditional Variable Assignment',
        },
        {
          link: '/guide/advanced',
          text: 'Advanced Features for Reference to Variables',
        },
        {
          link: '/guide/substitution-refs',
          text: 'Substitution References',
        },
        {
          link: '/guide/computed-names',
          text: 'Computed Variable Names',
        },
        {
          link: '/guide/values',
          text: 'How Variables Get Their Values',
        },
        {
          link: '/guide/setting',
          text: 'Setting Variables',
        },
        {
          link: '/guide/appending',
          text: 'Appending More Text to Variables',
        },
        {
          link: '/guide/override-directive',
          text: 'The override Directive',
        },
        {
          link: '/guide/multi-line',
          text: 'Defining Multi-Line Variables',
        },
        {
          link: '/guide/undefine-directive',
          text: 'Undefining Variables',
        },
        {
          link: '/guide/environment',
          text: 'Variables from the Environment',
        },
        {
          link: '/guide/target-specific',
          text: 'Target-specific Variable Values',
        },
        {
          link: '/guide/pattern-specific',
          text: 'Pattern-specific Variable Values',
        },
        {
          link: '/guide/suppressing-inheritance',
          text: 'Suppressing Inheritance',
        },
        {
          link: '/guide/special-variables',
          text: 'Other Special Variables',
        },
      ],
    },
    {
      collapsed: false,
      link: '/guide/conditionals',
      text: 'Conditional Parts of Makefiles',
      items: [
        {
          link: '/guide/conditional-example',
          text: 'Example of a Conditional',
        },
        {
          link: '/guide/conditional-syntax',
          text: 'Syntax of Conditionals',
        },
        {
          link: '/guide/testing-flags',
          text: 'Conditionals that Test Flags',
        },
      ],
    },
  ]
}
