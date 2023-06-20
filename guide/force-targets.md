# 4.7 Rules without Recipes or Prerequisites

If a rule has no prerequisites or recipe, and the target of the rule is a nonexistent file, then `make` imagines this target to have been updated whenever its rule is run.
This implies that all targets depending on this one will always have their recipe run.

An example will illustrate this:

```makefile
clean: FORCE
        rm $(objects)
FORCE:
```

Here the target `FORCE` satisfies the special conditions, so the target `clean` that depends on it is forced to run its recipe.
There is nothing special about the name `FORCE`, but that is one name commonly used this way.

As you can see, using `FORCE` this way has the same results as using `.PHONY: clean`.

Using `.PHONY` is more explicit and more efficient.
However, other versions of `make` do not support `.PHONY`;
thus `FORCE` appears in many makefiles.
See [Phony Targets](./phony-targets).
