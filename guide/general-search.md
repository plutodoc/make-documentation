# 4.5.1 `VPATH`: Search Path for All Prerequisites

The value of the `make` variable `VPATH` specifies a list of directories that `make` should search.
Most often, the directories are expected to contain prerequisite files that are not in the current directory;
however, `make` uses `VPATH` as a search list for both prerequisites and targets of rules.

Thus, if a file that is listed as a target or prerequisite does not exist in the current directory, `make` searches the directories listed in `VPATH` for a file with that name.
If a file is found in one of them, that file may become the prerequisite (see below).
Rules may then specify the names of files in the prerequisite list as if they all existed in the current directory.
See [Writing Recipes with Directory Search](./recipes-search).

In the `VPATH` variable, directory names are separated by colons or blanks.
The order in which directories are listed is the order followed by `make` in its search.
(On MS-DOS and MS-Windows, semi-colons are used as separators of directory names in `VPATH`, since the colon can be used in the pathname itself, after the drive letter.)

For example,

```makefile
VPATH = src:../headers
```

specifies a path containing two directories, `src` and `../headers`, which `make` searches in that order.

With this value of `VPATH`, the following rule,

```makefile
foo.o : foo.c
```

is interpreted as if it were written like this:

```makefile
foo.o : src/foo.c
```

assuming the file `foo.c` does not exist in the current directory but is found in the directory `src`.
