# 5.7.1 How the `MAKE` Variable Works

Recursive `make` commands should always use the variable `MAKE`, not the explicit command name `make`, as shown here:

```makefile
subsystem:
        cd subdir && $(MAKE)
```

The value of this variable is the file name with which `make` was invoked.
If this file name was `/bin/make`, then the recipe executed is `cd subdir && /bin/make`.
If you use a special version of `make` to run the top-level makefile, the same special version will be executed for recursive invocations.

As a special feature, using the variable `MAKE` in the recipe of a rule alters the effects of the `-t` (`--touch`), `-n` (`--just-print`), or `-q` (`--question`) option.
Using the `MAKE` variable has the same effect as using a `+` character at the beginning of the recipe line.
See [Instead of Executing the Recipes](../running/instead-of-execution).
This special feature is only enabled if the `MAKE` variable appears directly in the recipe: it does not apply if the `MAKE` variable is referenced through expansion of another variable.
In the latter case you must use the `+` token to get these special effects.

Consider the command `make -t` in the above example.
(The `-t` option marks targets as up to date without actually running any recipes;
see [Instead of Execution](../running/instead-of-execution).)
Following the usual definition of `-t`, a `make -t` command in the example would create a file named subsystem and do nothing else.
What you really want it to do is run `cd subdir && make -t`;
but that would require executing the recipe, and `-t` says not to execute recipes.

The special feature makes this do what you want: whenever a recipe line of a rule contains the variable `MAKE`, the flags `-t`, `-n` and `-q` do not apply to that line.
Recipe lines containing `MAKE` are executed normally despite the presence of a flag that causes most recipes not to be run.
The usual `MAKEFLAGS` mechanism passes the flags to the sub-`make` (see [Communicating Options to a Sub-`make`](./options-recursion)), so your request to touch the files, or print the recipes, is propagated to the subsystem.
