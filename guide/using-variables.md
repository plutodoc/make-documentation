# 6 How to Use Variables

A _variable_ is a name defined in a makefile to represent a string of text, called the variable's _value_.
These values are substituted by explicit request into targets, prerequisites, recipes, and other parts of the makefile.
(In some other versions of `make`, variables are called _macros_.)

Variables and functions in all parts of a makefile are expanded when read, except for in recipes, the right-hand sides of variable definitions using `=`, and the bodies of variable definitions using the `define` directive.

Variables can represent lists of file names, options to pass to compilers, programs to run, directories to look in for source files, directories to write output in, or anything else you can imagine.

A variable name may be any sequence of characters not containing `:`, `#`, `=`, or whitespace.
However, variable names containing characters other than letters, numbers, and underscores should be considered carefully, as in some shells they cannot be passed through the environment to a sub-`make` (see [Communicating Variables to a Sub-`make`](./variables-recursion)).
Variable names beginning with `.` and an uppercase letter may be given special meaning in future versions of `make`.

Variable names are case-sensitive.
The names `foo`, `FOO`, and `Foo` all refer to different variables.

It is traditional to use upper case letters in variable names, but we recommend using lower case letters for variable names that serve internal purposes in the makefile, and reserving upper case for parameters that control implicit rules or for parameters that the user should override with command options (see [Overriding Variables](./overriding)).

A few variables have names that are a single punctuation character or just a few characters.
These are the _automatic variables_, and they have particular specialized uses.
See [Automatic Variables](./automatic-variables).
