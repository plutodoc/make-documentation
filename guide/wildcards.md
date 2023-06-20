# 4.4 Using Wildcard Characters in File Names

A single file name can specify many files using _wildcard characters_.
The wildcard characters in `make` are `*`, `?` and `[…]`, the same as in the Bourne shell.
For example, `*.c` specifies a list of all the files (in the working directory) whose names end in `.c`.

If an expression matches multiple files then the results will be sorted.
However multiple expressions will not be globally sorted.
For example, `*.c` `*.h` will list all the files whose names end in `.c`, sorted, followed by all the files whose names end in `.h`, sorted.

The character `~` at the beginning of a file name also has special significance.
If alone, or followed by a slash, it represents your home directory.
For example `~/bin` expands to `/home/you/bin`.
If the `~` is followed by a word, the string represents the home directory of the user named by that word.
For example `~john/bin` expands to `/home/john/bin`.
On systems which don't have a home directory for each user (such as MS-DOS or MS-Windows), this functionality can be simulated by setting the environment variable `HOME`.

Wildcard expansion is performed by `make` automatically in targets and in prerequisites.
In recipes, the shell is responsible for wildcard expansion.
In other contexts, wildcard expansion happens only if you request it explicitly with the `wildcard` function.

The special significance of a wildcard character can be turned off by preceding it with a backslash.
Thus, `foo\*bar` would refer to a specific file whose name consists of `foo`, an asterisk, and `bar`.
