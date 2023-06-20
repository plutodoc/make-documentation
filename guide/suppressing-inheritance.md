# 6.13 Suppressing Inheritance

As described in previous sections, `make` variables are inherited by prerequisites.
This capability allows you to modify the behavior of a prerequisite based on which targets caused it to be rebuilt.
For example, you might set a target-specific variable on a `debug` target, then running `make debug` will cause that variable to be inherited by all prerequisites of `debug`, while just running `make all` (for example) would not have that assignment.

Sometimes, however, you may not want a variable to be inherited.
For these situations, `make` provides the `private` modifier.
Although this modifier can be used with any variable assignment, it makes the most sense with target- and pattern-specific variables.
Any variable marked `private` will be visible to its local target but will not be inherited by prerequisites of that target.
A global variable marked `private` will be visible in the global scope but will not be inherited by any target, and hence will not be visible in any recipe.

As an example, consider this makefile:

```makefile
EXTRA_CFLAGS =

prog: private EXTRA_CFLAGS = -L/usr/local/lib
prog: a.o b.o
```

Due to the `private` modifier, `a.o` and `b.o` will not inherit the `EXTRA_CFLAGS` variable assignment from the `prog` target.
