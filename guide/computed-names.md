# 6.3.2 Computed Variable Names

Computed variable names are a complicated concept needed only for sophisticated makefile programming.
For most purposes you need not consider them, except to know that making a variable with a dollar sign in its name might have strange results.
However, if you are the type that wants to understand everything, or you are actually interested in what they do, read on.

Variables may be referenced inside the name of a variable.
This is called a _computed variable name_ or a _nested variable reference_. For example,

```makefile
x = y
y = z
a := $($(x))
```

defines `a` as `z`: the `$(x)` inside `$($(x))` expands to `y`, so `$($(x))` expands to `$(y)` which in turn expands to `z`.
Here the name of the variable to reference is not stated explicitly;
it is computed by expansion of `$(x)`.
The reference `$(x)` here is nested within the outer variable reference.

The previous example shows two levels of nesting, but any number of levels is possible.
For example, here are three levels:

```makefile
x = y
y = z
z = u
a := $($($(x)))
```

Here the innermost `$(x)` expands to `y`, so `$($(x))` expands to `$(y)` which in turn expands to `z`;
now we have `$(z)`, which becomes `u`.

References to recursively-expanded variables within a variable name are re-expanded in the usual fashion.
For example:

```makefile
x = $(y)
y = z
z = Hello
a := $($(x))
```

defines `a` as `Hello`: `$($(x))` becomes `$($(y))` which becomes `$(z)` which becomes `Hello`.

Nested variable references can also contain modified references and function invocations (see [Functions for Transforming Text](./functions)), just like any other reference.
For example, using the `subst` function (see [Functions for String Substitution and Analysis](./text-functions)):

```makefile
x = variable1
variable2 := Hello
y = $(subst 1,2,$(x))
z = y
a := $($($(z)))
```

eventually defines `a` as `Hello`.
It is doubtful that anyone would ever want to write a nested reference as convoluted as this one, but it works: `$($($(z)))` expands to `$($(y))` which becomes `$($(subst 1,2,$(x)))`.
This gets the value `variable1` from `x` and changes it by substitution to `variable2`, so that the entire string becomes `$(variable2)`, a simple variable reference whose value is `Hello`.

A computed variable name need not consist entirely of a single variable reference.
It can contain several variable references, as well as some invariant text.
For example,

```makefile
a_dirs := dira dirb
1_dirs := dir1 dir2

a_files := filea fileb
1_files := file1 file2

ifeq "$(use_a)" "yes"
a1 := a
else
a1 := 1
endif

ifeq "$(use_dirs)" "yes"
df := dirs
else
df := files
endif

dirs := $($(a1)_$(df))
```

will give `dirs` the same value as `a_dirs`, `1_dirs`, `a_files` or `1_files` depending on the settings of `use_a` and `use_dirs`.

Computed variable names can also be used in substitution references:

```makefile
a_objects := a.o b.o c.o
1_objects := 1.o 2.o 3.o

sources := $($(a1)_objects:.o=.c)
```

defines `sources` as either `a.c b.c c.c` or `1.c 2.c 3.c`, depending on the value of `a1`.

The only restriction on this sort of use of nested variable references is that they cannot specify part of the name of a function to be called.
This is because the test for a recognized function name is done before the expansion of nested references.
For example,

```makefile
ifdef do_sort
func := sort
else
func := strip
endif

bar := a d b g q c

foo := $($(func) $(bar))
```

attempts to give `foo` the value of the variable `sort a d b g q c` or `strip a d b g q c`, rather than giving `a d b g q c` as the argument to either the `sort` or the `strip` function.
This restriction could be removed in the future if that change is shown to be a good idea.

You can also use computed variable names in the left-hand side of a variable assignment, or in a `define` directive, as in:

```makefile
dir = foo
$(dir)_sources := $(wildcard $(dir)/*.c)
define $(dir)_print =
lpr $($(dir)_sources)
endef
```

This example defines the variables `dir`, `foo_sources`, and `foo_print`.

Note that _nested variable references_ are quite different from _recursively expanded variables_ (see [The Two Flavors of Variables](./flavors)), though both are used together in complex ways when doing makefile programming.
