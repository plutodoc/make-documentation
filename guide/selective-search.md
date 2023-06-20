# 4.5.2 The `vpath` Directive

Similar to the `VPATH` variable, but more selective, is the `vpath` directive (note lower case), which allows you to specify a search path for a particular class of file names: those that match a particular pattern.
Thus you can supply certain search directories for one class of file names and other directories (or none) for other file names.

There are three forms of the `vpath` directive:

- `vpath pattern directories`

  Specify the search path _directories_ for file names that match _pattern_.

  The search path, _directories_, is a list of directories to be searched, separated by colons (semi-colons on MS-DOS and MS-Windows) or blanks, just like the search path used in the `VPATH` variable.
- `vpath pattern`

  Clear out the search path associated with _pattern_.
- `vpath`

  Clear all search paths previously specified with `vpath` directives.

A `vpath` pattern is a string containing a `%` character.
The string must match the file name of a prerequisite that is being searched for, the `%` character matching any sequence of zero or more characters (as in pattern rules;
see [Defining and Redefining Pattern Rules](./pattern-rules)).
For example, `%.h` matches files that end in `.h`.
(If there is no `%`, the pattern must match the prerequisite exactly, which is not useful very often.)

`%` characters in a `vpath` directive's pattern can be quoted with preceding backslashes (`\`).
Backslashes that would otherwise quote `%` characters can be quoted with more backslashes.
Backslashes that quote `%` characters or other backslashes are removed from the pattern before it is compared to file names.
Backslashes that are not in danger of quoting `%` characters go unmolested.

When a prerequisite fails to exist in the current directory, if the _pattern_ in a `vpath` directive matches the name of the prerequisite file, then the _directories_ in that directive are searched just like (and before) the directories in the `VPATH` variable.

For example,

```makefile
vpath %.h ../headers
```

tells `make` to look for any prerequisite whose name ends in `.h` in the directory `../headers` if the file is not found in the current directory.

If several `vpath` patterns match the prerequisite file's name, then `make` processes each matching `vpath` directive one by one, searching all the directories mentioned in each directive.
`make` handles multiple `vpath` directives in the order in which they appear in the makefile;
multiple directives with the same pattern are independent of each other.

Thus,

```makefile
vpath %.c foo
vpath %   blish
vpath %.c bar
```

will look for a file ending in `.c` in `foo`, then `blish`, then `bar`, while

```makefile
vpath %.c foo:bar
vpath %   blish
```

will look for a file ending in `.c` in `foo`, then `bar`, then `blish`.
