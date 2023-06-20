# 4.5.6 Directory Search for Link Libraries

Directory search applies in a special way to libraries used with the linker.
This special feature comes into play when you write a prerequisite whose name is of the form `-lname`.
(You can tell something strange is going on here because the prerequisite is normally the name of a file, and the _file name_ of a library generally looks like `libname.a`, not like `-lname`.)

When a prerequisite's name has the form `-lname`, `make` handles it specially by searching for the file `libname.so`, and, if it is not found, for the file `libname.a` in the current directory, in directories specified by matching `vpath` search paths and the `VPATH` search path, and then in the directories `/lib`, `/usr/lib`, and `prefix/lib` (normally `/usr/local/lib`, but MS-DOS/MS-Windows versions of `make` behave as if _prefix_ is defined to be the root of the DJGPP installation tree).

For example, if there is a `/usr/lib/libcurses.a` library on your system (and no `/usr/lib/libcurses.so` file), then

```makefile
foo : foo.c -lcurses
        cc $^ -o $@
```

would cause the command `cc foo.c /usr/lib/libcurses.a -o foo` to be executed when `foo` is older than `foo.c` or than `/usr/lib/libcurses.a`.

Although the default set of files to be searched for is `libname.so` and `libname.a`, this is customizable via the `.LIBPATTERNS` variable.
Each word in the value of this variable is a pattern string.
When a prerequisite like `-lname` is seen, `make` will replace the percent in each pattern in the list with _name_ and perform the above directory searches using each library file name.

The default value for `.LIBPATTERNS` is `lib%.so lib%.a`, which provides the default behavior described above.

You can turn off link library expansion completely by setting this variable to an empty value.
