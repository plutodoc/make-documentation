# 6.3.1 Substitution References

A _substitution reference_ substitutes the value of a variable with alterations that you specify.
It has the form `$(var:a=b)` (or `${var:a=b}`) and its meaning is to take the value of the variable `var`, replace every _a_ at the end of a word with _b_ in that value, and substitute the resulting string.

When we say "at the end of a word", we mean that a must appear either followed by whitespace or at the end of the value in order to be replaced;
other occurrences of a in the value are unaltered.
For example:

```makefile
foo := a.o b.o l.a c.o
bar := $(foo:.o=.c)
```

sets `bar` to `a.c b.c l.a c.c`.
See [Setting Variables](./setting).

A substitution reference is shorthand for the `patsubst` expansion function (see [Functions for String Substitution and Analysis](./text-functions)): `$(var:a=b)` is equivalent to `$(patsubst %a,%b,var)`.
We provide substitution references as well as `patsubst` for compatibility with other implementations of `make`.

Another type of substitution reference lets you use the full power of the `patsubst` function.
It has the same form `$(var:a=b)` described above, except that now a must contain a single `%` character.
This case is equivalent to `$(patsubst a,b,$(var))`.
See [Functions for String Substitution and Analysis](./text-functions), for a description of the `patsubst` function.
For example:

```makefile
foo := a.o b.o l.a c.o
bar := $(foo:%.o=%.c)
```

sets `bar` to `a.c b.c l.a c.c`.
