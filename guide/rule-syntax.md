# 4.2 Rule Syntax

In general, a rule looks like this:

```makefile
targets : prerequisites
        recipe
        …
```

or like this:

```makefile
targets : prerequisites ; recipe
        recipe
        …
```

The `targets` are file names, separated by spaces.
Wildcard characters may be used (see [Using Wildcard Characters in File Names](./wildcards)) and a name of the form `a(m)` represents member `m` in archive file `a` (see [Archive Members as Targets](./archive-members)).
Usually there is only one target per rule, but occasionally there is a reason to have more (see [Multiple Targets in a Rule](./multiple-targets)).

The _recipe_ lines start with a tab character (or the first character in the value of the `.RECIPEPREFIX` variable;
see [Special Variables](./special-variables)).
The first recipe line may appear on the line after the prerequisites, with a tab character, or may appear on the same line, with a semicolon.
Either way, the effect is the same.
There are other differences in the syntax of recipes.
See [Writing Recipes in Rules](./recipes).

Because dollar signs are used to start `make` variable references, if you really want a dollar sign in a target or prerequisite you must write two of them, `$$` (see [How to Use Variables](./using-variables)).
If you have enabled secondary expansion (see [Secondary Expansion](./secondary-expansion)) and you want a literal dollar sign in the prerequisites list, you must actually write _four_ dollar signs (`$$$$`).

You may split a long line by inserting a backslash followed by a newline, but this is not required, as `make` places no limit on the length of a line in a makefile.

A rule tells `make` two things: when the targets are out of date, and how to update them when necessary.

The criterion for being out of date is specified in terms of the _prerequisites_, which consist of file names separated by spaces.
(Wildcards and archive members (see [Using make to Update Archive Files](./archives)) are allowed here too.)
A target is out of date if it does not exist or if it is older than any of the prerequisites (by comparison of last-modification times).
The idea is that the contents of the target file are computed based on information in the prerequisites, so if any of the prerequisites changes, the contents of the existing target file are no longer necessarily valid.

How to update is specified by a _recipe_.
This is one or more lines to be executed by the shell (normally `sh`), but with some extra features (see [Writing Recipes in Rules](./recipes)).
