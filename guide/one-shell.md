# 5.3.1 Using One Shell

Sometimes you would prefer that all the lines in the recipe be passed to a single invocation of the shell.
There are generally two situations where this is useful: first, it can improve performance in makefiles where recipes consist of many command lines, by avoiding extra processes.
Second, you might want newlines to be included in your recipe command (for example perhaps you are using a very different interpreter as your `SHELL`).
If the `.ONESHELL` special target appears anywhere in the makefile then _all_ recipe lines for each target will be provided to a single invocation of the shell.
Newlines between recipe lines will be preserved.
For example:

```makefile
.ONESHELL:
foo : bar/lose
        cd $(@D)
        gobble $(@F) > ../$@
```

would now work as expected even though the commands are on different recipe lines.

If `.ONESHELL` is provided, then only the first line of the recipe will be checked for the special prefix characters (`@`, `-`, and `+`).
Subsequent lines will include the special characters in the recipe line when the `SHELL` is invoked.
If you want your recipe to start with one of these special characters you'll need to arrange for them to not be the first characters on the first line, perhaps by adding a comment or similar.
For example, this would be a syntax error in Perl because the first '@' is removed by make:

```makefile
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        @f = qw(a b c);
        print "@f\n";
```

However, either of these alternatives would work properly:

```makefile
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        # Make sure "@" is not the first character on the first line
        @f = qw(a b c);
        print "@f\n";
```

or

```makefile
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        my @f = qw(a b c);
        print "@f\n";
```

As a special feature, if `SHELL` is determined to be a POSIX-style shell, the special prefix characters in "internal" recipe lines will be _removed_ before the recipe is processed.
This feature is intended to allow existing makefiles to add the `.ONESHELL` special target and still run properly without extensive modifications.
Since the special prefix characters are not legal at the beginning of a line in a POSIX shell script this is not a loss in functionality.
For example, this works as expected:

```makefile
.ONESHELL:
foo : bar/lose
        @cd $(@D)
        @gobble $(@F) > ../$@
```

Even with this special feature, however, makefiles with `.ONESHELL` will behave differently in ways that could be noticeable.
For example, normally if any line in the recipe fails, that causes the rule to fail and no more recipe lines are processed.
Under `.ONESHELL` a failure of any but the final recipe line will not be noticed by `make`.
You can modify `.SHELLFLAGS` to add the `-e` option to the shell which will cause any failure anywhere in the command line to cause the shell to fail, but this could itself cause your recipe to behave differently.
Ultimately you may need to harden your recipe lines to allow them to work with `.ONESHELL`.
