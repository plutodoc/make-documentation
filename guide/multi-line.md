# 6.8 Defining Multi-Line Variables

Another way to set the value of a variable is to use the `define` directive.
This directive has an unusual syntax which allows newline characters to be included in the value, which is convenient for defining both canned sequences of commands (see [Defining Canned Recipes](./canned-recipes)), and also sections of makefile syntax to use with `eval` (see [Eval Function](./eval-function)).

The `define` directive is followed on the same line by the name of the variable being defined and an (optional) assignment operator, and nothing more.
The value to give the variable appears on the following lines.
The end of the value is marked by a line containing just the word `endef`.

Aside from this difference in syntax, `define` works just like any other variable definition.
The variable name may contain function and variable references, which are expanded when the directive is read to find the actual variable name to use.

The final newline before the `endef` is not included in the value;
if you want your value to contain a trailing newline you must include a blank line.
For example in order to define a variable that contains a newline character you must use _two_ empty lines, not one:

```makefile
define newline


endef
```

You may omit the variable assignment operator if you prefer.
If omitted, `make` assumes it to be `=` and creates a recursively-expanded variable (see [The Two Flavors of Variables](./flavors)).
When using a `+=` operator, the value is appended to the previous value as with any other append operation: with a single space separating the old and new values.

You may nest `define` directives: `make` will keep track of nested directives and report an error if they are not all properly closed with `endef`.
Note that lines beginning with the recipe prefix character are considered part of a recipe, so any `define` or `endef` strings appearing on such a line will not be considered `make` directives.

```makefile
define two-lines
echo foo
echo $(bar)
endef
```

When used in a recipe, the previous example is functionally equivalent to this:

```makefile
two-lines = echo foo; echo $(bar)
```

since two commands separated by semicolon behave much like two separate shell commands.
However, note that using two separate lines means `make` will invoke the shell twice, running an independent sub-shell for each line. See [Recipe Execution](./execution).

If you want variable definitions made with `define` to take precedence over command-line variable definitions, you can use the `override` directive together with `define`:

```makefile
override define two-lines =
foo
$(bar)
endef
```

See [The `override` Directive](./override-directive).
