# 4.9 Special Built-in Target Names

Certain names have special meanings if they appear as targets.

- `.PHONY`

  The prerequisites of the special target `.PHONY` are considered to be phony targets.
  When it is time to consider such a target, `make` will run its recipe unconditionally, regardless of whether a file with that name exists or what its last-modification time is.
  See [Phony Targets](./phony-targets).
- `.SUFFIXES`

  The prerequisites of the special target `.SUFFIXES` are the list of suffixes to be used in checking for suffix rules.
  See [Old-Fashioned Suffix Rules](./suffix-rules).
- `.DEFAULT`

  The recipe specified for `.DEFAULT` is used for any target for which no rules are found (either explicit rules or implicit rules).
  See [Defining Last-Resort Default Rules](./last-resort).
  If a `.DEFAULT` recipe is specified, every file mentioned as a prerequisite, but not as a target in a rule, will have that recipe executed on its behalf.
  See [Implicit Rule Search Algorithm](./implicit-rule-search).
- `.PRECIOUS`

  The targets which `.PRECIOUS` depends on are given the following special treatment: if `make` is killed or interrupted during the execution of their recipes, the target is not deleted.
  See [Interrupting or Killing `make`](./interrupts).
  Also, if the target is an intermediate file, it will not be deleted after it is no longer needed, as is normally done.
  See [Chains of Implicit Rules](./chained-rules).
  In this latter respect it overlaps with the `.SECONDARY` special target.

  You can also list the target pattern of an implicit rule (such as `%.o`) as a prerequisite file of the special target `.PRECIOUS` to preserve intermediate files created by rules whose target patterns match that file's name.
- `.INTERMEDIATE`

  The targets which `.INTERMEDIATE` depends on are treated as intermediate files.
  See [Chains of Implicit Rules](./chained-rules).
  `.INTERMEDIATE` with no prerequisites has no effect.
- `.NOTINTERMEDIATE`

  Prerequisites of the special target `.NOTINTERMEDIATE` are never considered intermediate files.
  See [Chains of Implicit Rules](./chained-rules).
  `.NOTINTERMEDIATE` with no prerequisites causes all targets to be treated as not intermediate.

  If the prerequisite is a target pattern then targets that are built using that pattern rule are not considered intermediate.
- `.SECONDARY`

  The targets which `.SECONDARY` depends on are treated as intermediate files, except that they are never automatically deleted.
  See [Chains of Implicit Rules](./chained-rules).

  `.SECONDARY` can be used to avoid redundant rebuilds in some unusual situations.
  For example:

  ```makefile
  hello.bin: hello.o bye.o
          $(CC) -o $@ $^

  %.o: %.c
          $(CC) -c -o $@ $<

  .SECONDARY: hello.o bye.o
  ```

  Suppose `hello.bin` is up to date in regards to the source files, _but_ the object file `hello.o` is missing.
  Without `.SECONDARY` make would rebuild `hello.o` then rebuild `hello.bin` even though the source files had not changed.
  By declaring `hello.o` as `.SECONDARY` make will not need to rebuild it and won't need to rebuild `hello.bin` either.
  Of course, if one of the source files _were_ updated then all object files would be rebuilt so that the creation of `hello.bin` could succeed.

  `.SECONDARY` with no prerequisites causes all targets to be treated as secondary (i.e., no target is removed because it is considered intermediate).
- `.SECONDEXPANSION`

  If `.SECONDEXPANSION` is mentioned as a target anywhere in the makefile, then all prerequisite lists defined _after_ it appears will be expanded a second time after all makefiles have been read in.
  See [Secondary Expansion](./secondary-expansion).
- `.DELETE_ON_ERROR`

  If `.DELETE_ON_ERROR` is mentioned as a target anywhere in the makefile, then `make` will delete the target of a rule if it has changed and its recipe exits with a nonzero exit status, just as it does when it receives a signal.
  See [Errors in Recipes](./errors).
- `.IGNORE`

  If you specify prerequisites for `.IGNORE`, then `make` will ignore errors in execution of the recipe for those particular files.
  The recipe for `.IGNORE` (if any) is ignored.

  If mentioned as a target with no prerequisites, `.IGNORE` says to ignore errors in execution of recipes for all files.
  This usage of `.IGNORE` is supported only for historical compatibility.
  Since this affects every recipe in the makefile, it is not very useful;
  we recommend you use the more selective ways to ignore errors in specific recipes.
  See [Errors in Recipes](./errors).
- `.LOW_RESOLUTION_TIME`

  If you specify prerequisites for `.LOW_RESOLUTION_TIME`, `make` assumes that these files are created by commands that generate low resolution time stamps.
  The recipe for the `.LOW_RESOLUTION_TIME` target are ignored.

  The high resolution file time stamps of many modern file systems lessen the chance of `make` incorrectly concluding that a file is up to date.
  Unfortunately, some hosts do not provide a way to set a high resolution file time stamp, so commands like `cp -p` that explicitly set a file's time stamp must discard its sub-second part.
  If a file is created by such a command, you should list it as a prerequisite of `.LOW_RESOLUTION_TIME` so that `make` does not mistakenly conclude that the file is out of date.
  For example:

  ```makefile
  .LOW_RESOLUTION_TIME: dst
  dst: src
          cp -p src dst
  ```

  Since `cp -p` discards the sub-second part of src's time stamp, `dst` is typically slightly older than `src` even when it is up to date.
  The `.LOW_RESOLUTION_TIME` line causes `make` to consider `dst` to be up to date if its time stamp is at the start of the same second that `src`'s time stamp is in.

  Due to a limitation of the archive format, archive member time stamps are always low resolution.
  You need not list archive members as prerequisites of `.LOW_RESOLUTION_TIME`, as `make` does this automatically.
- `.SILENT`

  If you specify prerequisites for `.SILENT`, then `make` will not print the recipe used to remake those particular files before executing them.
  The recipe for `.SILENT` is ignored.

  If mentioned as a target with no prerequisites, `.SILENT` says not to print any recipes before executing them.
  You may also use more selective ways to silence specific recipe command lines.
  See [Recipe Echoing](./echoing).
  If you want to silence all recipes for a particular run of `make`, use the `-s` or `--silent` option (see [Options Summary](./options-summary)).
- `.EXPORT_ALL_VARIABLES`

  Simply by being mentioned as a target, this tells `make` to export all variables to child processes by default.
  See [Communicating Variables to a Sub-`make`](./variables-recursion).
- `.NOTPARALLEL`

  If `.NOTPARALLEL` is mentioned as a target, then this invocation of `make` will be run serially, even if the `-j` option is given.
  Any recursively invoked `make` command will still run recipes in parallel (unless its makefile also contains this target).

  If `.NOTPARALLEL` has targets as prerequisites, then all the prerequisites of those targets will be run serially.
  This implicitly adds a `.WAIT` between each prerequisite of the listed targets.
  See [Disabling Parallel Execution](./parallel-disable).
- `.ONESHELL`

  If `.ONESHELL` is mentioned as a target, then when a target is built all lines of the recipe will be given to a single invocation of the shell rather than each line being invoked separately.
  (See [Recipe Execution](./execution)).
- `.POSIX`

  If `.POSIX` is mentioned as a target, then the makefile will be parsed and run in POSIX-conforming mode.
  This does _not_ mean that only POSIX-conforming makefiles will be accepted: all advanced GNU `make` features are still available.
  Rather, this target causes `make` to behave as required by POSIX in those areas where `make`'s default behavior differs.

  In particular, if this target is mentioned then recipes will be invoked as if the shell had been passed the `-e` flag: the first failing command in a recipe will cause the recipe to fail immediately.

Any defined implicit rule suffix also counts as a special target if it appears as a target, and so does the concatenation of two suffixes, such as `.c.o`.
These targets are suffix rules, an obsolete way of defining implicit rules (but a way still widely used).
In principle, any target name could be special in this way if you break it in two and add both pieces to the suffix list.
In practice, suffixes normally begin with `.`, so these special target names also begin with `.`.
See [Old-Fashioned Suffix Rules](./suffix-rules).
