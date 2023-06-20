# 6.1 Basics of Variable References

To substitute a variable's value, write a dollar sign followed by the name of the variable in parentheses or braces: either `$(foo)` or `${foo}` is a valid reference to the variable `foo`.
This special significance of `$` is why you must write `$$` to have the effect of a single dollar sign in a file name or recipe.

Variable references can be used in any context: targets, prerequisites, recipes, most directives, and new variable values.
Here is an example of a common case, where a variable holds the names of all the object files in a program:

```makefile
objects = program.o foo.o utils.o
program : $(objects)
        cc -o program $(objects)

$(objects) : defs.h
```

Variable references work by strict textual substitution.
Thus, the rule

```makefile
foo = c
prog.o : prog.$(foo)
        $(foo)$(foo) -$(foo) prog.$(foo)
```

could be used to compile a C program `prog.c`.
Since spaces before the variable value are ignored in variable assignments, the value of `foo` is precisely `c`.
(Don't actually write your makefiles this way!)

A dollar sign followed by a character other than a dollar sign, open-parenthesis or open-brace treats that single character as the variable name.
Thus, you could reference the variable `x` with `$x`.
However, this practice can lead to confusion (e.g., `$foo` refers to the variable `f` followed by the string `oo`) so we recommend using parentheses or braces around all variables, even single-letter variables, unless omitting them gives significant readability improvements.
One place where readability is often improved is automatic variables (see [Automatic Variables](./automatic-variables)).
