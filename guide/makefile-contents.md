# 3.1 What Makefiles Contain

Makefiles contain five kinds of things: _explicit rules_, _implicit rules_, _variable definitions_, _directives_, and _comments_.
Rules, variables, and directives are described at length in later chapters.

- An _explicit rule_ says when and how to remake one or more files, called the rule's _targets_.
  It lists the other files that the targets depend on, called the _prerequisites_ of the target, and may also give a recipe to use to create or update the targets.
  See [Writing Rules](./rules).
- An _implicit rule_ says when and how to remake a class of files based on their names.
  It describes how a target may depend on a file with a name similar to the target and gives a recipe to create or update such a target.
  See [Using Implicit Rules](./implicit-rules).
- A _variable definition_ is a line that specifies a text string value for a variable that can be substituted into the text later.
  The simple makefile example shows a variable definition for `objects` as a list of all object files (see [Variables Make Makefiles Simpler](./variables-simplify)).
- A _directive_ is an instruction for `make` to do something special while reading the makefile.
  These include:
  - Reading another makefile (see [Including Other Makefiles](./include)).
  - Deciding (based on the values of variables) whether to use or ignore a part of the makefile (see [Conditional Parts of Makefiles](./conditionals)).
  - Defining a variable from a verbatim string containing multiple lines (see [Defining Multi-Line Variables](./multi-line)).
- `#` in a line of a makefile starts a _comment_.
  It and the rest of the line are ignored, except that a trailing backslash not escaped by another backslash will continue the comment across multiple lines.
  A line containing just a comment (with perhaps spaces before it) is effectively blank, and is ignored.
  If you want a literal `#`, escape it with a backslash (e.g., `\#`).
  Comments may appear on any line in the makefile, although they are treated specially in certain situations.

  You cannot use comments within variable references or function calls: any instance of `#` will be treated literally (rather than as the start of a comment) inside a variable reference or function call.

  Comments within a recipe are passed to the shell, just as with any other recipe text.
  The shell decides how to interpret it: whether or not this is a comment is up to the shell.

  Within a `define` directive, comments are not ignored during the definition of the variable, but rather kept intact in the value of the variable.
  When the variable is expanded they will either be treated as `make` comments or as recipe text, depending on the context in which the variable is evaluated.
- [Splitting Long Lines](./splitting-lines)
