# 6.5 Setting Variables

To set a variable from the makefile, write a line starting with the variable name followed by `=`, `:=`, or `::=`.
Whatever follows the `=`, `:=`, or `::=` on the line becomes the value.
For example,

```makefile
objects = main.o foo.o bar.o utils.o
```

defines a variable named `objects`.
Whitespace around the variable name and immediately after the `=` is ignored.

Variables defined with `=` are _recursively expanded_ variables.
Variables defined with `:=` or `::=` are _simply expanded_ variables;
these definitions can contain variable references which will be expanded before the definition is made.
See [The Two Flavors of Variables](./flavors).

The variable name may contain function and variable references, which are expanded when the line is read to find the actual variable name to use.

There is no limit on the length of the value of a variable except the amount of memory on the computer.
You can split the value of a variable into multiple physical lines for readability (see [Splitting Long Lines](./splitting-lines)).

Most variable names are considered to have the empty string as a value if you have never set them.
Several variables have built-in initial values that are not empty, but you can set them in the usual ways (see [Variables Used by Implicit Rules](./implicit-variables)).
Several special variables are set automatically to a new value for each rule;
these are called the _automatic_ variables (see [Automatic Variables](./automatic-variables)).

If you'd like a variable to be set to a value only if it's not already set, then you can use the shorthand operator `?=` instead of `=`.
These two settings of the variable `FOO` are identical (see [The `origin` Function](./origin-function)):

```makefile
FOO ?= bar
```

and

```makefile
ifeq ($(origin FOO), undefined)
FOO = bar
endif
```

The shell assignment operator `!=` can be used to execute a shell script and set a variable to its output.
This operator first evaluates the right-hand side, then passes that result to the shell for execution.
If the result of the execution ends in a newline, that one newline is removed;
all other newlines are replaced by spaces.
The resulting string is then placed into the named recursively-expanded variable.
For example:

```makefile
hash != printf '\043'
file_list != find . -name '*.c'
```

If the result of the execution could produce a `$`, and you don't intend what follows that to be interpreted as a make variable or function reference, then you must replace every `$` with `$$` as part of the execution.
Alternatively, you can set a simply expanded variable to the result of running a program using the `shell` function call.
See [The `shell` Function](./shell-function).
For example:

```makefile
hash := $(shell printf '\043')
var := $(shell find . -name "*.c")
```

As with the `shell` function, the exit status of the just-invoked shell script is stored in the `.SHELLSTATUS` variable.
