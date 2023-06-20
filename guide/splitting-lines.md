# 3.1.1 Splitting Long Lines

Makefiles use a "line-based" syntax in which the newline character is special and marks the end of a statement.
GNU `make` has no limit on the length of a statement line, up to the amount of memory in your computer.

However, it is difficult to read lines which are too long to display without wrapping or scrolling.
So, you can format your makefiles for readability by adding newlines into the middle of a statement: you do this by escaping the internal newlines with a backslash (`\`) character.
Where we need to make a distinction we will refer to "physical lines" as a single line ending with a newline (regardless of whether it is escaped) and a "logical line" being a complete statement including all escaped newlines up to the first non-escaped newline.

The way in which backslash/newline combinations are handled depends on whether the statement is a recipe line or a non-recipe line.
Handling of backslash/newline in a recipe line is discussed later (see [Splitting Recipe Lines](./splitting-recipe-lines)).

Outside of recipe lines, backslash/newlines are converted into a single space character.
Once that is done, all whitespace around the backslash/newline is condensed into a single space: this includes all whitespace preceding the backslash, all whitespace at the beginning of the line after the backslash/newline, and any consecutive backslash/newline combinations.

If the `.POSIX` special target is defined then backslash/newline handling is modified slightly to conform to POSIX.2: first, whitespace preceding a backslash is not removed and second, consecutive backslash/newlines are not condensed.

## Splitting Without Adding Whitespace

If you need to split a line but do _not_ want any whitespace added, you can utilize a subtle trick: replace your backslash/newline pairs with the three characters dollar sign/backslash/newline:

```makefile
var := one$\
       word
```

After `make` removes the backslash/newline and condenses the following line into a single space, this is equivalent to:

```makefile
var := one$ word
```

Then `make` will perform variable expansion.
The variable reference `$` refers to a variable with the one-character name `` (space) which does not exist, and so expands to the empty string, giving a final assignment which is the equivalent of:

```makefile
var := oneword
```
