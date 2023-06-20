# 6.9 Undefining Variables

If you want to clear a variable, setting its value to empty is usually sufficient.
Expanding such a variable will yield the same result (empty string) regardless of whether it was set or not.
However, if you are using the `flavor` (see [`flavor` Function](./flavor-function)) and `origin` (see [`origin` Function](./origin-function)) functions, there is a difference between a variable that was never set and a variable with an empty value.
In such situations you may want to use the `undefine` directive to make a variable appear as if it was never set. For example:

```makefile
foo := foo
bar = bar

undefine foo
undefine bar

$(info $(origin foo))
$(info $(flavor bar))
```

This example will print "undefined" for both variables.

If you want to undefine a command-line variable definition, you can use the `override` directive together with `undefine`, similar to how this is done for variable definitions:

```makefile
override undefine CFLAGS
```
