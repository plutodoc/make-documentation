# 6.2.2 Simply Expanded Variable Assignment

To avoid all the problems and inconveniences of recursively expanded variables, there is another flavor: simply expanded variables.

_Simply expanded variables_ are defined by lines using `:=` or `::=` (see [Setting Variables](./setting)).
Both forms are equivalent in GNU `make`;
however only the `::=` form is described by the POSIX standard (support for `::=` was added to the POSIX standard in 2012, so older versions of `make` won't accept this form either).

The value of a simply expanded variable is scanned once and for all, expanding any references to other variables and functions, when the variable is defined.
The actual value of the simply expanded variable is the result of expanding the text that you write.
It does not contain any references to other variables;
it contains their values _as of the time this variable was defined_. Therefore,

```makefile
x := foo
y := $(x) bar
x := later
```

is equivalent to

```makefile
y := foo bar
x := later
```

Here is a somewhat more complicated example, illustrating the use of `:=` in conjunction with the `shell` function.
(See [The `shell` Function](./shell-function).)
This example also shows use of the variable `MAKELEVEL`, which is changed when it is passed down from level to level.
(See [Communicating Variables to a Sub-`make`](./variables-recursion), for information about `MAKELEVEL`.)

```makefile
ifeq (0,${MAKELEVEL})
whoami    := $(shell whoami)
host-type := $(shell arch)
MAKE := ${MAKE} host-type=${host-type} whoami=${whoami}
endif
```

An advantage of this use of `:=` is that a typical 'descend into a directory' recipe then looks like this:

```makefile
${subdirs}:
        ${MAKE} -C $@ all
```

Simply expanded variables generally make complicated makefile programming more predictable because they work like variables in most programming languages.
They allow you to redefine a variable using its own value (or its value processed in some way by one of the expansion functions) and to use the expansion functions much more efficiently (see [Functions for Transforming Text](./functions)).

You can also use them to introduce controlled leading whitespace into variable values.
Leading whitespace characters are discarded from your input before substitution of variable references and function calls;
this means you can include leading spaces in a variable value by protecting them with variable references, like this:

```makefile
nullstring :=
space := $(nullstring) # end of the line
```

Here the value of the variable `space` is precisely one space.
The comment `# end of the line` is included here just for clarity.
Since trailing space characters are _not_ stripped from variable values, just a space at the end of the line would have the same effect (but be rather hard to read).
If you put whitespace at the end of a variable value, it is a good idea to put a comment like that at the end of the line to make your intent clear.
Conversely, if you do _not_ want any whitespace characters at the end of your variable value, you must remember not to put a random comment on the end of the line after some whitespace, such as this:

```makefile
dir := /foo/bar    # directory to put the frobs in
```

Here the value of the variable `dir` is `/foo/bar    ` (with four trailing spaces), which was probably not the intention.
(Imagine something like `$(dir)/file` with this definition!)
