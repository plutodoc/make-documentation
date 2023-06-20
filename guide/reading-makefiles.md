# 3.7 How `make` Reads a Makefile

GNU `make` does its work in two distinct phases.
During the first phase it reads all the makefiles, included makefiles, etc. and internalizes all the variables and their values and implicit and explicit rules, and builds a dependency graph of all the targets and their prerequisites.
During the second phase, `make` uses this internalized data to determine which targets need to be updated and run the recipes necessary to update them.

It's important to understand this two-phase approach because it has a direct impact on how variable and function expansion happens;
this is often a source of some confusion when writing makefiles.
Below is a summary of the different constructs that can be found in a makefile, and the phase in which expansion happens for each part of the construct.

We say that expansion is _immediate_ if it happens during the first phase: `make` will expand that part of the construct as the makefile is parsed.
We say that expansion is _deferred_ if it is not immediate.
Expansion of a deferred construct part is delayed until the expansion is used: either when it is referenced in an immediate context, or when it is needed during the second phase.

You may not be familiar with some of these constructs yet.
You can reference this section as you become familiar with them, in later chapters.

## Variable Assignment

Variable definitions are parsed as follows:

```makefile
immediate = deferred
immediate ?= deferred
immediate := immediate
immediate ::= immediate
immediate :::= immediate-with-escape
immediate += deferred or immediate
immediate != immediate

define immediate
  deferred
endef

define immediate =
  deferred
endef

define immediate ?=
  deferred
endef

define immediate :=
  immediate
endef

define immediate ::=
  immediate
endef

define immediate :::=
  immediate-with-escape
endef

define immediate +=
  deferred or immediate
endef

define immediate !=
  immediate
endef
```

For the append operator `+=`, the right-hand side is considered immediate if the variable was previously set as a simple variable (`:=` or `::=`), and deferred otherwise.

For the _immediate-with-escape_ operator `:::=`, the value on the right-hand side is immediately expanded but then escaped (that is, all instances of `$` in the result of the expansion are replaced with `$$`).

For the shell assignment operator `!=`, the right-hand side is evaluated immediately and handed to the shell.
The result is stored in the variable named on the left, and that variable is considered a recursively expanded variable (and will thus be re-evaluated on each reference).

## Conditional Directives

Conditional directives are parsed immediately.
This means, for example, that automatic variables cannot be used in conditional directives, as automatic variables are not set until the recipe for that rule is invoked.
If you need to use automatic variables in a conditional directive you _must_ move the condition into the recipe and use shell conditional syntax instead.

## Rule Definition

A rule is always expanded the same way, regardless of the form:

```makefile
immediate : immediate ; deferred
        deferred
```

That is, the target and prerequisite sections are expanded immediately, and the recipe used to build the target is always deferred.
This is true for explicit rules, pattern rules, suffix rules, static pattern rules, and simple prerequisite definitions.
