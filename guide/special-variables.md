# 6.14 Other Special Variables

GNU `make` supports some variables that have special properties.

- `MAKEFILE_LIST`

  Contains the name of each makefile that is parsed by `make`, in the order in which it was parsed.
  The name is appended just before `make` begins to parse the makefile.
  Thus, if the first thing a makefile does is examine the last word in this variable, it will be the name of the current makefile.
  Once the current makefile has used `include`, however, the last word will be the just-included makefile.

  If a makefile named `Makefile` has this content:

  ```makefile
  name1 := $(lastword $(MAKEFILE_LIST))

  include inc.mk

  name2 := $(lastword $(MAKEFILE_LIST))

  all:
          @echo name1 = $(name1)
          @echo name2 = $(name2)
  ```

  then you would expect to see this output:

  ```makefile
  name1 = Makefile
  name2 = inc.mk
  ```
- `.DEFAULT_GOAL`

  Sets the default goal to be used if no targets were specified on the command line (see [Arguments to Specify the Goals](./goals)).
  The `.DEFAULT_GOAL` variable allows you to discover the current default goal, restart the default goal selection algorithm by clearing its value, or to explicitly set the default goal.
  The following example illustrates these cases:

  ```makefile
  # Query the default goal.
  ifeq ($(.DEFAULT_GOAL),)
  $(warning no default goal is set)
  endif

  .PHONY: foo
  foo: ; @echo $@

  $(warning default goal is $(.DEFAULT_GOAL))

  # Reset the default goal.
  .DEFAULT_GOAL :=

  .PHONY: bar
  bar: ; @echo $@

  $(warning default goal is $(.DEFAULT_GOAL))

  # Set our own.
  .DEFAULT_GOAL := foo
  ```

  This makefile prints:

  ```
  no default goal is set
  default goal is foo
  default goal is bar
  foo
  ```

  Note that assigning more than one target name to `.DEFAULT_GOAL` is invalid and will result in an error.
- `MAKE_RESTARTS`

  This variable is set only if this instance of `make` has restarted (see [How Makefiles Are Remade](./remaking-makefiles)): it will contain the number of times this instance has restarted.
  Note this is not the same as recursion (counted by the `MAKELEVEL` variable).
  You should not set, modify, or export this variable.

- `MAKE_TERMOUT`
- `MAKE_TERMERR`

  When `make` starts it will check whether stdout and stderr will show their output on a terminal.
  If so, it will set `MAKE_TERMOUT` and `MAKE_TERMERR`, respectively, to the name of the terminal device (or `true` if this cannot be determined).
  If set these variables will be marked for export.
  These variables will not be changed by `make` and they will not be modified if already set.

  These values can be used (particularly in combination with output synchronization (see [Output During Parallel Execution](./parallel-output)) to determine whether `make` itself is writing to a terminal;
  they can be tested to decide whether to force recipe commands to generate colorized output for example.

  If you invoke a sub-`make` and redirect its stdout or stderr it is your responsibility to reset or unexport these variables as well, if your makefiles rely on them.
- `.RECIPEPREFIX`

  The first character of the value of this variable is used as the character make assumes is introducing a recipe line.
  If the variable is empty (as it is by default) that character is the standard tab character.
  For example, this is a valid makefile:

  ```makefile
  .RECIPEPREFIX = >
  all:
  > @echo Hello, world
  ```

  The value of `.RECIPEPREFIX` can be changed multiple times;
  once set it stays in effect for all rules parsed until it is modified.
- `.VARIABLES`

  Expands to a list of the _names_ of all global variables defined so far.
  This includes variables which have empty values, as well as built-in variables (see [Variables Used by Implicit Rules](./implicit-variables)), but does not include any variables which are only defined in a target-specific context.
  Note that any value you assign to this variable will be ignored;
  it will always return its special value.
- `.FEATURES`

  Expands to a list of special features supported by this version of `make`.
  Possible values include, but are not limited to:

  - `archives`

    Supports `ar` (archive) files using special file name syntax.
    See [Using `make` to Update Archive Files](./archives).
  - `check-symlink`

    Supports the `-L` (`--check-symlink-times`) flag.
    See [Summary of Options](./options-summary).
  - `else-if`

    Supports "else if" non-nested conditionals.
    See [Syntax of Conditionals](./conditional-syntax).
  - `extra-prereqs`

    Supports the `.EXTRA_PREREQS` special target.
  - `grouped-target`

    Supports grouped target syntax for explicit rules.
    See [Multiple Targets in a Rule](./multiple-targets).
  - `guile`

    Has GNU Guile available as an embedded extension language.
    See [GNU Guile Integration](./guile-integration).
  - `jobserver`

    Supports "job server" enhanced parallel builds.
    See [Parallel Execution](./parallel).
  - `jobserver-fifo`

    Supports "job server" enhanced parallel builds using named pipes.
    See [Integrating GNU make](./integrating-make).
  - `load`

    Supports dynamically loadable objects for creating custom extensions.
    See [Loading Dynamic Objects](./loading-objects).
  - `notintermediate`

    Supports the `.NOTINTERMEDIATE` special target.
    See [Integrating GNU make](./integrating-make).
  - `oneshell`

    Supports the `.ONESHELL` special target.
    See [Using One Shell](./one-shell).
  - `order-only`

    Supports order-only prerequisites.
    See [Types of Prerequisites](./prerequisite-types).
  - `output-sync`

    Supports the `--output-sync` command line option.
    See [Summary of Options](./options-summary).
  - `second-expansion`

    Supports secondary expansion of prerequisite lists.
  - `shell-export`

    Supports exporting `make` variables to `shell` functions.
  - `shortest-stem`

    Uses the "shortest stem" method of choosing which pattern, of multiple applicable options, will be used.
    See [How Patterns Match](./pattern-match).
  - `target-specific`

    Supports target-specific and pattern-specific variable assignments.
    See [Target-specific Variable Values](./target-specific).
  - `undefine`

    Supports the `undefine` directive.
    See [Undefine Directive](./undefine-directive).
- `.INCLUDE_DIRS`

  Expands to a list of directories that `make` searches for included makefiles (see [Including Other Makefiles](./include)).
  Note that modifying this variable's value does not change the list of directories which are searched.
- `.EXTRA_PREREQS`

  Each word in this variable is a new prerequisite which is added to targets for which it is set.
  These prerequisites differ from normal prerequisites in that they do not appear in any of the automatic variables (see [Automatic Variables](./automatic-variables)).
  This allows prerequisites to be defined which do not impact the recipe.

  Consider a rule to link a program:

  ```makefile
  myprog: myprog.o file1.o file2.o
      $(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^ $(LDLIBS)
  ```

  Now suppose you want to enhance this makefile to ensure that updates to the compiler cause the program to be re-linked.
  You can add the compiler as a prerequisite, but you must ensure that it's not passed as an argument to link command.
  You'll need something like this:

  ```makefile
  myprog: myprog.o file1.o file2.o $(CC)
      $(CC) $(CFLAGS) $(LDFLAGS) -o $@ $(filter-out $(CC),$^) $(LDLIBS)
  ```

  Then consider having multiple extra prerequisites: they would all have to be filtered out.
  Using `.EXTRA_PREREQS` and target-specific variables provides a simpler solution:

  ```makefile
  myprog: myprog.o file1.o file2.o
      $(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^ $(LDLIBS)
  myprog: .EXTRA_PREREQS = $(CC)
  ```

  This feature can also be useful if you want to add prerequisites to a makefile you cannot easily modify: you can create a new file such as `extra.mk`:

  ```makefile
  myprog: .EXTRA_PREREQS = $(CC)
  ```

  then invoke `make -f extra.mk -f Makefile`.

  Setting `.EXTRA_PREREQS` globally will cause those prerequisites to be added to all targets (which did not themselves override it with a target-specific value).
  Note `make` is smart enough not to add a prerequisite listed in `.EXTRA_PREREQS` as a prerequisite to itself.
