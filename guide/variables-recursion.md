# 5.7.2 Communicating Variables to a Sub-`make`

Variable values of the top-level `make` can be passed to the sub-`make` through the environment by explicit request.
These variables are defined in the sub-`make` as defaults, but they do not override variables defined in the makefile used by the sub-`make` unless you use the `-e` switch (see [Summary of Options](./options-summary)).

To pass down, or _export_, a variable, `make` adds the variable and its value to the environment for running each line of the recipe.
The sub-`make`, in turn, uses the environment to initialize its table of variable values.
See [Variables from the Environment](./environment).

Except by explicit request, `make` exports a variable only if it is either defined in the environment initially or set on the command line, and if its name consists only of letters, numbers, and underscores.
Some shells cannot cope with environment variable names consisting of characters other than letters, numbers, and underscores.

The value of the `make` variable `SHELL` is not exported.
Instead, the value of the `SHELL` variable from the invoking environment is passed to the sub-`make`.
You can force `make` to export its value for `SHELL` by using the `export` directive, described below.
See [Choosing the Shell](./choosing-the-shell).

The special variable `MAKEFLAGS` is always exported (unless you unexport it). `MAKEFILES` is exported if you set it to anything.

`make` automatically passes down variable values that were defined on the command line, by putting them in the `MAKEFLAGS` variable.
See [Communicating Options to a Sub-`make`](./options-recursion).

Variables are _not_ normally passed down if they were created by default by `make` (see [Variables Used by Implicit Rules](./implicit-variables)).
The sub-`make` will define these for itself.

If you want to export specific variables to a sub-`make`, use the `export` directive, like this:

```makefile
export variable …
```

If you want to _prevent_ a variable from being exported, use the `unexport` directive, like this:

```makefile
unexport variable …
```

In both of these forms, the arguments to `export` and `unexport` are expanded, and so could be variables or functions which expand to a (list of) variable names to be (un)exported.

As a convenience, you can define a variable and export it at the same time by doing:

```makefile
export variable = value
```

has the same result as:

```makefile
variable = value
export variable
```

and

```makefile
export variable := value
```

has the same result as:

```makefile
variable := value
export variable
```

Likewise,

```makefile
export variable += value
```

is just like:

```makefile
variable += value
export variable
```

See [Appending More Text to Variables](./appending).

You may notice that the `export` and `unexport` directives work in `make` in the same way they work in the shell, `sh`.

If you want all variables to be exported by default, you can use `export` by itself:

```makefile
export
```

This tells `make` that variables which are not explicitly mentioned in an `export` or `unexport` directive should be exported.
Any variable given in an `unexport` directive will still _not_ be exported.

The behavior elicited by an `export` directive by itself was the default in older versions of GNU `make`.
If your makefiles depend on this behavior and you want to be compatible with old versions of `make`, you can write a rule for the special target `.EXPORT_ALL_VARIABLES` instead of using the `export` directive.
This will be ignored by old `make`s, while the `export` directive will cause a syntax error.

When using `export` by itself or `.EXPORT_ALL_VARIABLES` to export variables by default, only variables whose names consist solely of alphanumerics and underscores will be exported.
To export other variables you must specifically mention them in an `export` directive.

Adding a variable's value to the environment requires it to be expanded.
If expanding a variable has side-effects (such as the `info` or `eval` or similar functions) then these side-effects will be seen every time a command is invoked.
You can avoid this by ensuring that such variables have names which are not exportable by default.
However, a better solution is to not use this "export by default" facility at all, and instead explicitly export the relevant variables by name.

You can use `unexport` by itself to tell `make` not to export variables by default.
Since this is the default behavior, you would only need to do this if `export` had been used by itself earlier (in an included makefile, perhaps).
You **cannot** use `export` and `unexport` by themselves to have variables exported for some recipes and not for others.
The last `export` or `unexport` directive that appears by itself determines the behavior for the entire run of `make`.

As a special feature, the variable `MAKELEVEL` is changed when it is passed down from level to level.
This variable's value is a string which is the depth of the level as a decimal number.
The value is `0` for the top-level `make`;
`1` for a sub-`make`, `2` for a sub-sub-`make`, and so on.
The incrementation happens when `make` sets up the environment for a recipe.

The main use of `MAKELEVEL` is to test it in a conditional directive (see [Conditional Parts of Makefiles](./conditionals));
this way you can write a makefile that behaves one way if run recursively and another way if run directly by you.

You can use the variable `MAKEFILES` to cause all sub-`make` commands to use additional makefiles.
The value of `MAKEFILES` is a whitespace-separated list of file names.
This variable, if defined in the outer-level makefile, is passed down through the environment;
then it serves as a list of extra makefiles for the sub-`make` to read before the usual or specified ones.
See [The Variable `MAKEFILES`](./makefiles-variable).
