# 6.6 Appending More Text to Variables

Often it is useful to add more text to the value of a variable already defined.
You do this with a line containing `+=`, like this:

```makefile
objects += another.o
```

This takes the value of the variable `objects`, and adds the text `another.o` to it (preceded by a single space, if it has a value already).
Thus:

```makefile
objects = main.o foo.o bar.o utils.o
objects += another.o
```

sets `objects` to `main.o foo.o bar.o utils.o another.o`.

Using `+=` is similar to:

```makefile
objects = main.o foo.o bar.o utils.o
objects := $(objects) another.o
```

but differs in ways that become important when you use more complex values.

When the variable in question has not been defined before, `+=` acts just like normal `=`: it defines a recursively-expanded variable.
However, when there _is_ a previous definition, exactly what `+=` does depends on what flavor of variable you defined originally.
See [The Two Flavors of Variables](./flavors), for an explanation of the two flavors of variables.

When you add to a variable's value with `+=`, `make` acts essentially as if you had included the extra text in the initial definition of the variable.
If you defined it first with `:=` or `::=`, making it a simply-expanded variable, `+=` adds to that simply-expanded definition, and expands the new text before appending it to the old value just as `:=` does (see [Setting Variables](./setting), for a full explanation of `:=` or `::=`).
In fact,

```makefile
variable := value
variable += more
```

is exactly equivalent to:

```makefile
variable := value
variable := $(variable) more
```

On the other hand, when you use `+=` with a variable that you defined first to be recursively-expanded using plain `=` or `:::=`, make appends the un-expanded text to the existing value, whatever it is.
This means that

```makefile
variable = value
variable += more
```

is roughly equivalent to:

```makefile
temp = value
variable = $(temp) more
```

except that of course it never defines a variable called `temp`.
The importance of this comes when the variable's old value contains variable references.
Take this common example:

```makefile
CFLAGS = $(includes) -O
…
CFLAGS += -pg # enable profiling
```

The first line defines the `CFLAGS` variable with a reference to another variable, `includes`.
(`CFLAGS` is used by the rules for C compilation;
see [Catalogue of Built-In Rules](./catalogue-of-rules).)
Using `=` for the definition makes `CFLAGS` a recursively-expanded variable, meaning `$(includes) -O` is _not_ expanded when `make` processes the definition of `CFLAGS`.
Thus, `includes` need not be defined yet for its value to take effect.
It only has to be defined before any reference to `CFLAGS`.
If we tried to append to the value of `CFLAGS` without using `+=`, we might do it like this:

```makefile
CFLAGS := $(CFLAGS) -pg # enable profiling
```

This is pretty close, but not quite what we want. Using `:=` redefines `CFLAGS` as a simply-expanded variable;
this means `make` expands the text `$(CFLAGS) -pg` before setting the variable.
If `includes` is not yet defined, we get ` -O -pg`, and a later definition of `includes` will have no effect.
Conversely, by using `+=` we set `CFLAGS` to the _unexpanded_ value `$(includes) -O -pg`.
Thus we preserve the reference to `includes`, so if that variable gets defined at any later point, a reference like `$(CFLAGS)` still uses its value.
