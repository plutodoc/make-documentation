# 6.7 The `override` Directive

If a variable has been set with a command argument (see [Overriding Variables](./overriding)), then ordinary assignments in the makefile are ignored.
If you want to set the variable in the makefile even though it was set with a command argument, you can use an `override` directive, which is a line that looks like this:

```makefile
override variable = value
```

or

```makefile
override variable := value
```

To append more text to a variable defined on the command line, use:

```makefile
override variable += more text
```

See [Appending More Text to Variables](./appending).

Variable assignments marked with the `override` flag have a higher priority than all other assignments, except another `override`.
Subsequent assignments or appends to this variable which are not marked `override` will be ignored.

The `override` directive was not invented for escalation in the war between makefiles and command arguments.
It was invented so you can alter and add to values that the user specifies with command arguments.

For example, suppose you always want the `-g` switch when you run the C compiler, but you would like to allow the user to specify the other switches with a command argument just as usual.
You could use this `override` directive:

```makefile
override CFLAGS += -g
```

You can also use `override` directives with `define` directives.
This is done as you might expect:

```makefile
override define foo =
bar
endef
```

See [Defining Multi-Line Variables](./multi-line).
