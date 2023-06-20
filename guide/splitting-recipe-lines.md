# 5.1.1 Splitting Recipe Lines

One of the few ways in which `make` does interpret recipes is checking for a backslash just before the newline.
As in normal makefile syntax, a single logical recipe line can be split into multiple physical lines in the makefile by placing a backslash before each newline.
A sequence of lines like this is considered a single recipe line, and one instance of the shell will be invoked to run it.

However, in contrast to how they are treated in other places in a makefile (see [Splitting Long Lines](./splitting-lines)), backslash/newline pairs are _not_ removed from the recipe.
Both the backslash and the newline characters are preserved and passed to the shell.
How the backslash/newline is interpreted depends on your shell.
If the first character of the next line after the backslash/newline is the recipe prefix character (a tab by default;
see [Special Variables](./special-variables)), then that character (and only that character) is removed.
Whitespace is never added to the recipe.

For example, the recipe for the all target in this makefile:

```makefile
all :
        @echo no\
space
        @echo no\
        space
        @echo one \
        space
        @echo one\
         space
```

consists of four separate shell commands where the output is:

```
nospace
nospace
one space
one space
```

As a more complex example, this makefile:

```makefile
all : ; @echo 'hello \
        world' ; echo "hello \
    world"
```

will invoke one shell with a command of:

```makefile
echo 'hello \
world' ; echo "hello \
    world"
```

which, according to shell quoting rules, will yield the following output:

```makefile
hello \
world
hello     world
```

Notice how the backslash/newline pair was removed inside the string quoted with double quotes (`"…"`), but not from the string quoted with single quotes (`'…'`).
This is the way the default shell (/bin/sh) handles backslash/newline pairs.
If you specify a different shell in your makefiles it may treat them differently.

Sometimes you want to split a long line inside of single quotes, but you don't want the backslash/newline to appear in the quoted content.
This is often the case when passing scripts to languages such as Perl, where extraneous backslashes inside the script can change its meaning or even be a syntax error.
One simple way of handling this is to place the quoted string, or even the entire command, into a `make` variable then use the variable in the recipe.
In this situation the newline quoting rules for makefiles will be used, and the backslash/newline will be removed. If we rewrite our example above using this method:

```makefile
HELLO = 'hello \
world'

all : ; @echo $(HELLO)
```

we will get output like this:

```txt
hello world
```

If you like, you can also use target-specific variables (see [Target-specific Variable Values](./target-specific)) to obtain a tighter correspondence between the variable and the recipe that uses it.
