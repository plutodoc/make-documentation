# 5.3 Recipe Execution

When it is time to execute recipes to update a target, they are executed by invoking a new sub-shell for each line of the recipe, unless the `.ONESHELL` special target is in effect (see [Using One Shell](./one-shell)) (In practice, `make` may take shortcuts that do not affect the results.)

Please note: this implies that setting shell variables and invoking shell commands such as `cd` that set a context local to each process will not affect the following lines in the recipe.

If you want to use `cd` to affect the next statement, put both statements in a single recipe line.
Then `make` will invoke one shell to run the entire line, and the shell will execute the statements in sequence.
For example:

```makefile
foo : bar/lose
        cd $(<D) && gobble $(<F) > ../$@
```

Here we use the shell AND operator (`&&`) so that if the `cd` command fails, the script will fail without trying to invoke the `gobble` command in the wrong directory, which could cause problems (in this case it would certainly cause `../foo` to be truncated, at least).
