# 3.9 Secondary Expansion

Previously we learned that GNU `make` works in two distinct phases: a read-in phase and a target-update phase (see [How `make` Reads a Makefile](./reading-makefiles)).
GNU make also has the ability to enable a _second expansion_ of the prerequisites (only) for some or all targets defined in the makefile.
In order for this second expansion to occur, the special target `.SECONDEXPANSION` must be defined before the first prerequisite list that makes use of this feature.

If `.SECONDEXPANSION` target is defined then when GNU `make` needs to check the prerequisites of a target, the prerequisites are expanded a _second time_.
In most circumstances this secondary expansion will have no effect, since all variable and function references will have been expanded during the initial parsing of the makefiles.
In order to take advantage of the secondary expansion phase of the parser, then, it's necessary to _escape_ the variable or function reference in the makefile.
In this case the first expansion merely un-escapes the reference but doesn't expand it, and expansion is left to the secondary expansion phase.
For example, consider this makefile:

```makefile
.SECONDEXPANSION:
ONEVAR = onefile
TWOVAR = twofile
myfile: $(ONEVAR) $$(TWOVAR)
```

After the first expansion phase the prerequisites list of the `myfile` target will be `onefile` and `$(TWOVAR)`;
the first (unescaped) variable reference to _ONEVAR_ is expanded, while the second (escaped) variable reference is simply unescaped, without being recognized as a variable reference.
Now during the secondary expansion the first word is expanded again but since it contains no variable or function references it remains the value `onefile`, while the second word is now a normal reference to the variable _TWOVAR_, which is expanded to the value `twofile`.
The final result is that there are two prerequisites, `onefile` and `twofile`.

Obviously, this is not a very interesting case since the same result could more easily have been achieved simply by having both variables appear, unescaped, in the prerequisites list.
One difference becomes apparent if the variables are reset; consider this example:

```makefile
.SECONDEXPANSION:
AVAR = top
onefile: $(AVAR)
twofile: $$(AVAR)
AVAR = bottom
```

Here the prerequisite of `onefile` will be expanded immediately, and resolve to the value `top`, while the prerequisite of `twofile` will not be full expanded until the secondary expansion and yield a value of `bottom`.

This is marginally more exciting, but the true power of this feature only becomes apparent when you discover that secondary expansions always take place within the scope of the automatic variables for that target.
This means that you can use variables such as `$@`, `$*`, etc. during the second expansion and they will have their expected values, just as in the recipe.
All you have to do is defer the expansion by escaping the `$`.
Also, secondary expansion occurs for both explicit and implicit (pattern) rules.
Knowing this, the possible uses for this feature increase dramatically.
For example:

```makefile
.SECONDEXPANSION:
main_OBJS := main.o try.o test.o
lib_OBJS := lib.o api.o

main lib: $$($$@_OBJS)
```

Here, after the initial expansion the prerequisites of both the `main` and `lib` targets will be `$($@_OBJS)`.
During the secondary expansion, the `$@` variable is set to the name of the target and so the expansion for the `main` target will yield `$(main_OBJS)`, or `main.o try.o test.o`, while the secondary expansion for the `lib` target will yield `$(lib_OBJS)`, or `lib.o api.o`.

You can also mix in functions here, as long as they are properly escaped:

```makefile
main_SRCS := main.c try.c test.c
lib_SRCS := lib.c api.c

.SECONDEXPANSION:
main lib: $$(patsubst %.c,%.o,$$($$@_SRCS))
```

This version allows users to specify source files rather than object files, but gives the same resulting prerequisites list as the previous example.

Evaluation of automatic variables during the secondary expansion phase, especially of the target name variable `$$@`, behaves similarly to evaluation within recipes.
However, there are some subtle differences and "corner cases" which come into play for the different types of rule definitions that `make` understands.
The subtleties of using the different automatic variables are described below.

## Secondary Expansion of Explicit Rules

During the secondary expansion of explicit rules, `$$@` and `$$%` evaluate, respectively, to the file name of the target and, when the target is an archive member, the target member name.
The `$$<` variable evaluates to the first prerequisite in the first rule for this target.
`$$^` and `$$+` evaluate to the list of all prerequisites of rules _that have already appeared_ for the same target (`$$+` with repetitions and `$$^` without).
The following example will help illustrate these behaviors:

```makefile
.SECONDEXPANSION:

foo: foo.1 bar.1 $$< $$^ $$+    # line #1

foo: foo.2 bar.2 $$< $$^ $$+    # line #2

foo: foo.3 bar.3 $$< $$^ $$+    # line #3
```

In the first prerequisite list, all three variables (`$$<`, `$$^`, and `$$+`) expand to the empty string.
In the second, they will have values `foo.1`, `foo.1 bar.1`, and `foo.1 bar.1` respectively.
In the third they will have values `foo.1`, `foo.1 bar.1 foo.2 bar.2`, and `foo.1 bar.1 foo.2 bar.2 foo.1 foo.1 bar.1 foo.1 bar.1` respectively.

Rules undergo secondary expansion in makefile order, except that the rule with the recipe is always evaluated last.

The variables `$$?` and `$$*` are not available and expand to the empty string.

## Secondary Expansion of Static Pattern Rules

Rules for secondary expansion of static pattern rules are identical to those for explicit rules, above, with one exception: for static pattern rules the `$$*` variable is set to the pattern stem.
As with explicit rules, `$$?` is not available and expands to the empty string.

## Secondary Expansion of Implicit Rules

As `make` searches for an implicit rule, it substitutes the stem and then performs secondary expansion for every rule with a matching target pattern.
The value of the automatic variables is derived in the same fashion as for static pattern rules. As an example:

```makefile
.SECONDEXPANSION:

foo: bar

foo foz: fo%: bo%

%oo: $$< $$^ $$+ $$*
```

When the implicit rule is tried for target foo, `$$<` expands to `bar`, `$$^` expands to `bar boo`, `$$+` also expands to `bar boo`, and `$$*` expands to `f`.

Note that the directory prefix (D), as described in [Implicit Rule Search Algorithm](./implicit-rule-search), is appended (after expansion) to all the patterns in the prerequisites list.
As an example:

```makefile
.SECONDEXPANSION:

/tmp/foo.o:

%.o: $$(addsuffix /%.c,foo bar) foo.h
        @echo $^
```

The prerequisite list printed, after the secondary expansion and directory prefix reconstruction, will be `/tmp/foo/foo.c /tmp/bar/foo.c foo.h`.
If you are not interested in this reconstruction, you can use `$$*` instead of `%` in the prerequisites list.
