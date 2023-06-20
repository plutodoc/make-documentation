# 7.1 Example of a Conditional

The following example of a conditional tells `make` to use one set of libraries if the `CC` variable is `gcc`, and a different set of libraries otherwise.
It works by controlling which of two recipe lines will be used for the rule.
The result is that `CC=gcc` as an argument to `make` changes not only which compiler is used but also which libraries are linked.

```makefile
libs_for_gcc = -lgnu
normal_libs =

foo: $(objects)
ifeq ($(CC),gcc)
        $(CC) -o foo $(objects) $(libs_for_gcc)
else
        $(CC) -o foo $(objects) $(normal_libs)
endif
```

This conditional uses three directives: one `ifeq`, one `else` and one `endif`.

The `ifeq` directive begins the conditional, and specifies the condition.
It contains two arguments, separated by a comma and surrounded by parentheses.
Variable substitution is performed on both arguments and then they are compared.
The lines of the makefile following the `ifeq` are obeyed if the two arguments match;
otherwise they are ignored.

The `else` directive causes the following lines to be obeyed if the previous conditional failed.
In the example above, this means that the second alternative linking command is used whenever the first alternative is not used.
It is optional to have an `else` in a conditional.

The `endif` directive ends the conditional.
Every conditional must end with an `endif`.
Unconditional makefile text follows.

As this example illustrates, conditionals work at the textual level: the lines of the conditional are treated as part of the makefile, or ignored, according to the condition.
This is why the larger syntactic units of the makefile, such as rules, may cross the beginning or the end of the conditional.

When the variable `CC` has the value `gcc`, the above example has this effect:

```makefile
foo: $(objects)
        $(CC) -o foo $(objects) $(libs_for_gcc)
```

When the variable `CC` has any other value, the effect is this:

```makefile
foo: $(objects)
        $(CC) -o foo $(objects) $(normal_libs)
```

Equivalent results can be obtained in another way by conditionalizing a variable assignment and then using the variable unconditionally:

```makefile
libs_for_gcc = -lgnu
normal_libs =

ifeq ($(CC),gcc)
  libs=$(libs_for_gcc)
else
  libs=$(normal_libs)
endif

foo: $(objects)
        $(CC) -o foo $(objects) $(libs)
```
