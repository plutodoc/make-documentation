# 6.11 Target-specific Variable Values

Variable values in `make` are usually global;
that is, they are the same regardless of where they are evaluated (unless they're reset, of course).
Exceptions to that are variables defined with the `let` function (see [The `let` Function](./let-function)) or the `foreach` function (see [The `foreach` Function](./foreach-function), and automatic variables (see [Automatic Variables](./automatic-variables)).

Another exception are _target-specific variable values_.
This feature allows you to define different values for the same variable, based on the target that `make` is currently building.
As with automatic variables, these values are only available within the context of a target's recipe (and in other target-specific assignments).

Set a target-specific variable value like this:

```makefile
target … : variable-assignment
```

Target-specific variable assignments can be prefixed with any or all of the special keywords `export`, `override`, or `private`;
these apply their normal behavior to this instance of the variable only.

Multiple _target_ values create a target-specific variable value for each member of the target list individually.

The _variable-assignment_ can be any valid form of assignment;
recursive (`=`), simple (`:=` or `::=`), appending (`+=`), or conditional (`?=`).
All variables that appear within the variable-assignment are evaluated within the context of the target: thus, any previously-defined target-specific variable values will be in effect.
Note that this variable is actually distinct from any "global" value: the two variables do not have to have the same flavor (recursive vs. simple).

Target-specific variables have the same priority as any other makefile variable.
Variables provided on the command line (and in the environment if the `-e` option is in force) will take precedence.
Specifying the `override` directive will allow the target-specific variable value to be preferred.

There is one more special feature of target-specific variables: when you define a target-specific variable that variable value is also in effect for all prerequisites of this target, and all their prerequisites, etc. (unless those prerequisites override that variable with their own target-specific variable value).
So, for example, a statement like this:

```makefile
prog : CFLAGS = -g
prog : prog.o foo.o bar.o
```

will set `CFLAGS` to `-g` in the recipe for `prog`, but it will also set `CFLAGS` to `-g` in the recipes that create `prog.o`, `foo.o`, and `bar.o`, and any recipes which create their prerequisites.

Be aware that a given prerequisite will only be built once per invocation of make, at most.
If the same file is a prerequisite of multiple targets, and each of those targets has a different value for the same target-specific variable, then the first target to be built will cause that prerequisite to be built and the prerequisite will inherit the target-specific value from the first target.
It will ignore the target-specific values from any other targets.
