# 4.5.5 Directory Search and Implicit Rules

The search through the directories specified in `VPATH` or with `vpath` also happens during consideration of implicit rules (see [Using Implicit Rules](./implicit-rules)).

For example, when a file `foo.o` has no explicit rule, `make` considers implicit rules, such as the built-in rule to compile `foo.c` if that file exists.
If such a file is lacking in the current directory, the appropriate directories are searched for it.
If `foo.c` exists (or is mentioned in the makefile) in any of the directories, the implicit rule for C compilation is applied.

The recipes of implicit rules normally use automatic variables as a matter of necessity;
consequently they will use the file names found by directory search with no extra effort.
