# 5.7 Recursive Use of `make`

Recursive use of `make` means using `make` as a command in a makefile.
This technique is useful when you want separate makefiles for various subsystems that compose a larger system.
For example, suppose you have a sub-directory subdir which has its own makefile, and you would like the containing directory's makefile to run `make` on the sub-directory.
You can do it by writing this:

```makefile
subsystem:
        cd subdir && $(MAKE)
```

or, equivalently, this (see [Summary of Options](../running/options-summary)):

```makefile
subsystem:
        $(MAKE) -C subdir
```

You can write recursive `make` commands just by copying this example, but there are many things to know about how they work and why, and about how the sub-`make` relates to the top-level `make`.
You may also find it useful to declare targets that invoke recursive `make` commands as `.PHONY` (for more discussion on when this is useful, see [Phony Targets](../rules/phony-targets)).

For your convenience, when GNU `make` starts (after it has processed any `-C` options) it sets the variable `CURDIR` to the pathname of the current working directory.
This value is never touched by `make` again: in particular note that if you include files from other directories the value of `CURDIR` does not change.
The value has the same precedence it would have if it were set in the makefile (by default, an environment variable `CURDIR` will not override this value).
Note that setting this variable has no impact on the operation of `make` (it does not cause `make` to change its working directory, for example).
