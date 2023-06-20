# 5.9 Using Empty Recipes

It is sometimes useful to define recipes which do nothing.
This is done simply by giving a recipe that consists of nothing but whitespace.
For example:

```makefile
target: ;
```

defines an empty recipe for `target`.
You could also use a line beginning with a recipe prefix character to define an empty recipe, but this would be confusing because such a line looks empty.

You may be wondering why you would want to define a recipe that does nothing.
One reason this is useful is to prevent a target from getting implicit recipes (from implicit rules or the `.DEFAULT` special target;
see [Implicit Rules](./implicit-rules) and see [Defining Last-Resort Default Rules](./last-resort)).

Empty recipes can also be used to avoid errors for targets that will be created as a side-effect of another recipe: if the target does not exist the empty recipe ensures that `make` won't complain that it doesn't know how to build the target, and `make` will assume the target is out of date.

You may be inclined to define empty recipes for targets that are not actual files, but only exist so that their prerequisites can be remade.
However, this is not the best way to do that, because the prerequisites may not be remade properly if the target file actually does exist.
See [Phony Targets](./phony-targets), for a better way to do this.
