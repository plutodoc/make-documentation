# 3.2 What Name to Give Your Makefile

By default, when `make` looks for the makefile, it tries the following names, in order: `GNUmakefile`, `makefile` and `Makefile`.

Normally you should call your makefile either `makefile` or `Makefile`.
(We recommend `Makefile` because it appears prominently near the beginning of a directory listing, right near other important files such as `README`.)
The first name checked, `GNUmakefile`, is not recommended for most makefiles.
You should use this name if you have a makefile that is specific to GNU `make`, and will not be understood by other versions of `make`.
Other `make` programs look for `makefile` and `Makefile`, but not `GNUmakefile`.

If `make` finds none of these names, it does not use any makefile.
Then you must specify a goal with a command argument, and `make` will attempt to figure out how to remake it using only its built-in implicit rules.
See [Using Implicit Rules](./implicit-rules).

If you want to use a nonstandard name for your makefile, you can specify the makefile name with the `-f` or `--file` option.
The arguments `-f name` or `--file=name` tell `make` to read the file _name_ as the makefile.
If you use more than one `-f` or `--file` option, you can specify several makefiles.
All the makefiles are effectively concatenated in the order specified.
The default makefile names `GNUmakefile`, `makefile` and `Makefile` are not checked automatically if you specify `-f` or `--file`.
