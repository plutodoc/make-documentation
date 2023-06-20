# 6.2.1 Recursively Expanded Variable Assignment

The first flavor of variable is a _recursively expanded_ variable.
Variables of this sort are defined by lines using `=` (see [Setting Variables](./setting)) or by the `define` directive (see [Defining Multi-Line Variables](./multi-line)).
The value you specify is installed verbatim;
if it contains references to other variables, these references are expanded whenever this variable is substituted (in the course of expanding some other string).
When this happens, it is called _recursive expansion_.

For example,

```makefile
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:;echo $(foo)
```

will echo `Huh?`: `$(foo)` expands to `$(bar)` which expands to `$(ugh)` which finally expands to `Huh?`.

This flavor of variable is the only sort supported by most other versions of `make`.
It has its advantages and its disadvantages.
An advantage (most would say) is that:

```makefile
CFLAGS = $(include_dirs) -O
include_dirs = -Ifoo -Ibar
```

will do what was intended: when `CFLAGS` is expanded in a recipe, it will expand to `-Ifoo -Ibar -O`.
A major disadvantage is that you cannot append something on the end of a variable, as in

```makefile
CFLAGS = $(CFLAGS) -O
```

because it will cause an infinite loop in the variable expansion.
(Actually `make` detects the infinite loop and reports an error.)

Another disadvantage is that any functions (see [Functions for Transforming Text](./functions)) referenced in the definition will be executed every time the variable is expanded.
This makes `make` run slower;
worse, it causes the `wildcard` and `shell` functions to give unpredictable results because you cannot easily control when they are called, or even how many times.
