# 5.5 Errors in Recipes

After each shell invocation returns, `make` looks at its exit status.
If the shell completed successfully (the exit status is zero), the next line in the recipe is executed in a new shell;
after the last line is finished, the rule is finished.

If there is an error (the exit status is nonzero), `make` gives up on the current rule, and perhaps on all rules.

Sometimes the failure of a certain recipe line does not indicate a problem.
For example, you may use the `mkdir` command to ensure that a directory exists.
If the directory already exists, `mkdir` will report an error, but you probably want `make` to continue regardless.

To ignore errors in a recipe line, write a `-` at the beginning of the line's text (after the initial tab).
The `-` is discarded before the line is passed to the shell for execution.

For example,

```makefile
clean:
        -rm -f *.o
```

This causes `make` to continue even if `rm` is unable to remove a file.

When you run `make` with the `-i` or `--ignore-errors` flag, errors are ignored in all recipes of all rules.
A rule in the makefile for the special target `.IGNORE` has the same effect, if there are no prerequisites.
This is less flexible but sometimes useful.

When errors are to be ignored, because of either a `-` or the `-i` flag, `make` treats an error return just like success, except that it prints out a message that tells you the status code the shell exited with, and says that the error has been ignored.

When an error happens that `make` has not been told to ignore, it implies that the current target cannot be correctly remade, and neither can any other that depends on it either directly or indirectly.
No further recipes will be executed for these targets, since their preconditions have not been achieved.

Normally `make` gives up immediately in this circumstance, returning a nonzero status.
However, if the `-k` or `--keep-going` flag is specified, `make` continues to consider the other prerequisites of the pending targets, remaking them if necessary, before it gives up and returns nonzero status.
For example, after an error in compiling one object file, `make -k` will continue compiling other object files even though it already knows that linking them will be impossible.
See [Summary of Options](../running/options-summary).

The usual behavior assumes that your purpose is to get the specified targets up to date;
once `make` learns that this is impossible, it might as well report the failure immediately.
The `-k` option says that the real purpose is to test as many of the changes made in the program as possible, perhaps to find several independent problems so that you can correct them all before the next attempt to compile.
This is why Emacs' `compile` command passes the `-k` flag by default.

Usually when a recipe line fails, if it has changed the target file at all, the file is corrupted and cannot be used—or at least it is not completely updated.
Yet the file's time stamp says that it is now up to date, so the next time `make` runs, it will not try to update that file.
The situation is just the same as when the shell is killed by a signal;
see [Interrupting or Killing `make`](./interrupts).
So generally the right thing to do is to delete the target file if the recipe fails after beginning to change the file.
`make` will do this if `.DELETE_ON_ERROR` appears as a target.
This is almost always what you want `make` to do, but it is not historical practice;
so for compatibility, you must explicitly request it.
