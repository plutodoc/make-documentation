# 1 Overview of `make`

The `make` utility automatically determines which pieces of a large program need to be recompiled, and issues commands to recompile them.
This manual describes GNU `make`, which was implemented by Richard Stallman and Roland McGrath.
Development since Version 3.76 has been handled by Paul D. Smith.

GNU `make` conforms to section 6.2 of IEEE Standard 1003.2-1992 (POSIX.2).

Our examples show C programs, since they are most common, but you can use `make` with any programming language whose compiler can be run with a shell command.
Indeed, `make` is not limited to programs.
You can use it to describe any task where some files must be updated automatically from others whenever the others change.
