# 4.4.2 Pitfalls of Using Wildcards

Now here is an example of a naive way of using wildcard expansion, that does not do what you would intend.
Suppose you would like to say that the executable file `foo` is made from all the object files in the directory, and you write this:

```makefile
objects = *.o

foo : $(objects)
        cc -o foo $(CFLAGS) $(objects)
```

The value of `objects` is the actual string `*.o`.
Wildcard expansion happens in the rule for `foo`, so that each _existing_ `.o` file becomes a prerequisite of `foo` and will be recompiled if necessary.

But what if you delete all the `.o` files?
When a wildcard matches no files, it is left as it is, so then `foo` will depend on the oddly-named file `*.o`.
Since no such file is likely to exist, `make` will give you an error saying it cannot figure out how to make `*.o`.
This is not what you want!

Actually it is possible to obtain the desired result with wildcard expansion, but you need more sophisticated techniques, including the `wildcard` function and string substitution.
See [The Function `wildcard`](./wildcard-function).

Microsoft operating systems (MS-DOS and MS-Windows) use backslashes to separate directories in pathnames, like so:

```
c:\foo\bar\baz.c
```

This is equivalent to the Unix-style `c:/foo/bar/baz.c` (the `c:` part is the so-called drive letter).
When `make` runs on these systems, it supports backslashes as well as the Unix-style forward slashes in pathnames.
However, this support does _not_ include the wildcard expansion, where backslash is a quote character.
Therefore, you _must_ use Unix-style slashes in these cases.
