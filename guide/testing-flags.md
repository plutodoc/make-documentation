# 7.3 Conditionals that Test Flags

You can write a conditional that tests `make` command flags such as `-t` by using the variable `MAKEFLAGS` together with the `findstring` function (see [Functions for String Substitution and Analysis](./text-functions)).
This is useful when `touch` is not enough to make a file appear up to date.

Recall that `MAKEFLAGS` will put all single-letter options (such as `-t`) into the first word, and that word will be empty if no single-letter options were given.
To work with this, it's helpful to add a value at the start to ensure there's a word: for example `-$(MAKEFLAGS)`.

The `findstring` function determines whether one string appears as a substring of another.
If you want to test for the `-t` flag, use `t` as the first string and the value of `MAKEFLAGS` as the other.

For example, here is how to arrange to use `ranlib -t` to finish marking an archive file up to date:

```makefile
archive.a: …
ifneq (,$(findstring t,$(MAKEFLAGS)))
        +touch archive.a
        +ranlib -t archive.a
else
        ranlib archive.a
endif
```

The `+` prefix marks those recipe lines as "recursive" so that they will be executed despite use of the `-t` flag.
See [Recursive Use of `make`](./recursion).
