# 4.4.1 Wildcard Examples

Wildcards can be used in the recipe of a rule, where they are expanded by the shell.
For example, here is a rule to delete all the object files:

```makefile
clean:
        rm -f *.o
```

Wildcards are also useful in the prerequisites of a rule.
With the following rule in the makefile, `make print` will print all the `.c` files that have changed since the last time you printed them:

```makefile
print: *.c
        lpr -p $?
        touch print
```

This rule uses `print` as an empty target file;
see [Empty Target Files to Record Events](./empty-targets).
(The automatic variable `$?` is used to print only those files that have changed;
see [Automatic Variables](./automatic-variables).)

Wildcard expansion does not happen when you define a variable.
Thus, if you write this:

```makefile
objects = *.o
```

then the value of the variable `objects` is the actual string `*.o`.
However, if you use the value of `objects` in a target or prerequisite, wildcard expansion will take place there.
If you use the value of `objects` in a recipe, the shell may perform wildcard expansion when the recipe runs.
To set `objects` to the expansion, instead use:

```makefile
objects := $(wildcard *.o)
```

See [Wildcard Function](./wildcard-function).
