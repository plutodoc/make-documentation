# 4.11 Multiple Rules for One Target

One file can be the target of several rules.
All the prerequisites mentioned in all the rules are merged into one list of prerequisites for the target.
If the target is older than any prerequisite from any rule, the recipe is executed.

There can only be one recipe to be executed for a file.
If more than one rule gives a recipe for the same file, `make` uses the last one given and prints an error message.
(As a special case, if the file's name begins with a dot, no error message is printed.
This odd behavior is only for compatibility with other implementations of `make`… you should avoid using it).
Occasionally it is useful to have the same target invoke multiple recipes which are defined in different parts of your makefile;
you can use _double-colon rules_ (see [Double-Colon](./double-colon)) for this.

An extra rule with just prerequisites can be used to give a few extra prerequisites to many files at once.
For example, makefiles often have a variable, such as `objects`, containing a list of all the compiler output files in the system being made.
An easy way to say that all of them must be recompiled if `config.h` changes is to write the following:

```makefile
objects = foo.o bar.o
foo.o : defs.h
bar.o : defs.h test.h
$(objects) : config.h
```

This could be inserted or taken out without changing the rules that really specify how to make the object files, making it a convenient form to use if you wish to add the additional prerequisite intermittently.

Another wrinkle is that the additional prerequisites could be specified with a variable that you set with a command line argument to `make` (see [Overriding Variables](./overriding)).
For example,

```makefile
extradeps=
$(objects) : $(extradeps)
```

means that the command `make extradeps=foo.h` will consider `foo.h` as a prerequisite of each object file, but plain `make` will not.

If none of the explicit rules for a target has a recipe, then `make` searches for an applicable implicit rule to find one see [Using Implicit Rules](./implicit-rules)).
