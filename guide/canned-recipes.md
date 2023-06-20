# 5.8 Defining Canned Recipes

When the same sequence of commands is useful in making various targets, you can define it as a canned sequence with the `define` directive, and refer to the canned sequence from the recipes for those targets.
The canned sequence is actually a variable, so the name must not conflict with other variable names.

Here is an example of defining a canned recipe:

```makefile
define run-yacc =
yacc $(firstword $^)
mv y.tab.c $@
endef
```

Here `run-yacc` is the name of the variable being defined; `endef` marks the end of the definition;
the lines in between are the commands.
The `define` directive does not expand variable references and function calls in the canned sequence;
the `$` characters, parentheses, variable names, and so on, all become part of the value of the variable you are defining.
See [Defining Multi-Line Variables](../using-variables/multi-line), for a complete explanation of `define`.

The first command in this example runs Yacc on the first prerequisite of whichever rule uses the canned sequence.
The output file from Yacc is always named `y.tab.c`.
The second command moves the output to the rule's target file name.

To use the canned sequence, substitute the variable into the recipe of a rule.
You can substitute it like any other variable (see [Basics of Variable References](../using-variables/reference)).
Because variables defined by `define` are recursively expanded variables, all the variable references you wrote inside the `define` are expanded now. For example:

```makefile
foo.c : foo.y
        $(run-yacc)
```

`foo.y` will be substituted for the variable `$^` when it occurs in `run-yacc`'s value, and `foo.c` for `$@`.

This is a realistic example, but this particular one is not needed in practice because `make` has an implicit rule to figure out these commands based on the file names involved (see [Using Implicit Rules](../implicit-rules)).

In recipe execution, each line of a canned sequence is treated just as if the line appeared on its own in the rule, preceded by a tab.
In particular, `make` invokes a separate sub-shell for each line.
You can use the special prefix characters that affect command lines (`@`, `-`, and `+`) on each line of a canned sequence.
See [Writing Recipes in Rules](../recipes).
For example, using this canned sequence:

```makefile
define frobnicate =
@echo "frobnicating target $@"
frob-step-1 $< -o $@-step-1
frob-step-2 $@-step-1 -o $@
endef
```

`make` will not echo the first line, the `echo` command.
But it _will_ echo the following two recipe lines.

On the other hand, prefix characters on the recipe line that refers to a canned sequence apply to every line in the sequence.
So the rule:

```makefile
frob.out: frob.in
        @$(frobnicate)
```

does not echo _any_ recipe lines.
(See [Recipe Echoing](./echoing), for a full explanation of `@`.)
