# 5.1 Recipe Syntax

Makefiles have the unusual property that there are really two distinct syntaxes in one file.
Most of the makefile uses `make` syntax (see [Writing Makefiles](../makefiles)).
However, recipes are meant to be interpreted by the shell and so they are written using shell syntax.
The `make` program does not try to understand shell syntax: it performs only a very few specific translations on the content of the recipe before handing it to the shell.

Each line in the recipe must start with a tab (or the first character in the value of the `.RECIPEPREFIX` variable;
see [Special Variables](../using-variables/special-variables)), except that the first recipe line may be attached to the target-and-prerequisites line with a semicolon in between.
_Any_ line in the makefile that begins with a tab and appears in a "rule context" (that is, after a rule has been started until another rule or variable definition) will be considered part of a recipe for that rule.
Blank lines and lines of just comments may appear among the recipe lines;
they are ignored.

Some consequences of these rules include:

- A blank line that begins with a tab is not blank: it's an empty recipe (see [Empty Recipes](./empty-recipes)).
- A comment in a recipe is not a `make` comment;
  it will be passed to the shell as-is.
  Whether the shell treats it as a comment or not depends on your shell.
- A variable definition in a "rule context" which is indented by a tab as the first character on the line, will be considered part of a recipe, not a `make` variable definition, and passed to the shell.
- A conditional expression (`ifdef`, `ifeq`, etc. see [Syntax of Conditionals](../conditionals/conditional-syntax)) in a "rule context" which is indented by a tab as the first character on the line, will be considered part of a recipe and be passed to the shell.
- [Splitting Recipe Lines](./splitting-recipe-lines)
- [Using Variables in Recipes](./variables-in-recipes)
