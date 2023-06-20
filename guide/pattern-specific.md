# 6.12 Pattern-specific Variable Values

In addition to target-specific variable values (see [Target-specific Variable Values](./target-specific)), GNU `make` supports pattern-specific variable values.
In this form, the variable is defined for any target that matches the pattern specified.

Set a pattern-specific variable value like this:

```makefile
pattern … : variable-assignment
```

where _pattern_ is a `%`-pattern.
As with target-specific variable values, multiple _pattern_ values create a pattern-specific variable value for each pattern individually.
The _variable-assignment_ can be any valid form of assignment.
Any command line variable setting will take precedence, unless `override` is specified.

For example:

```makefile
%.o : CFLAGS = -O
```

will assign `CFLAGS` the value of `-O` for all targets matching the pattern `%.o`.

If a target matches more than one pattern, the matching pattern-specific variables with longer stems are interpreted first.
This results in more specific variables taking precedence over the more generic ones, for example:

```makefile
%.o: %.c
        $(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@

lib/%.o: CFLAGS := -fPIC -g
%.o: CFLAGS := -g

all: foo.o lib/bar.o
```

In this example the first definition of the `CFLAGS` variable will be used to update `lib/bar.o` even though the second one also applies to this target.
Pattern-specific variables which result in the same stem length are considered in the order in which they were defined in the makefile.

Pattern-specific variables are searched after any target-specific variables defined explicitly for that target, and before target-specific variables defined for the parent target.
