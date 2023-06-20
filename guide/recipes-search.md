# 4.5.4 Writing Recipes with Directory Search

When a prerequisite is found in another directory through directory search, this cannot change the recipe of the rule;
they will execute as written.
Therefore, you must write the recipe with care so that it will look for the prerequisite in the directory where `make` finds it.

This is done with the _automatic variables_ such as `$^` (see [Automatic Variables](./automatic-variables)).
For instance, the value of `$^` is a list of all the prerequisites of the rule, including the names of the directories in which they were found, and the value of `$@` is the target. Thus:

```makefile
foo.o : foo.c
        cc -c $(CFLAGS) $^ -o $@
```

(The variable `CFLAGS` exists so you can specify flags for C compilation by implicit rules;
we use it here for consistency so it will affect all C compilations uniformly;
see [Variables Used by Implicit Rules](./implicit-variables).)

Often the prerequisites include header files as well, which you do not want to mention in the recipe.
The automatic variable `$<` is just the first prerequisite:

```makefile
VPATH = src:../headers
foo.o : foo.c defs.h hack.h
        cc -c $(CFLAGS) $< -o $@
```
