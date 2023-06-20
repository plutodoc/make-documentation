# 5.7.4 The `--print-directory` Option

If you use several levels of recursive `make` invocations, the `-w` or `--print-directory` option can make the output a lot easier to understand by showing each directory as `make` starts processing it and as `make` finishes processing it.
For example, if `make -w` is run in the directory `/u/gnu/make`, `make` will print a line of the form:

```makefile
make: Entering directory `/u/gnu/make'.
```

before doing anything else, and a line of the form:

```makefile
make: Leaving directory `/u/gnu/make'.
```

when processing is completed.

Normally, you do not need to specify this option because `make` does it for you: `-w` is turned on automatically when you use the `-C` option, and in sub-`make`s.
`make` will not automatically turn on `-w` if you also use `-s`, which says to be silent, or if you use `--no-print-directory` to explicitly disable it.
