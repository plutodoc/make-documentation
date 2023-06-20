# 5 Writing Recipes in Rules

The recipe of a rule consists of one or more shell command lines to be executed, one at a time, in the order they appear.
Typically, the result of executing these commands is that the target of the rule is brought up to date.

Users use many different shell programs, but recipes in makefiles are always interpreted by `/bin/sh` unless the makefile specifies otherwise.
See [Recipe Execution](./execution).
