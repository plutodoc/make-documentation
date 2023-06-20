# 6.2.4 Conditional Variable Assignment

There is another assignment operator for variables, `?=`.
This is called a conditional variable assignment operator, because it only has an effect if the variable is not yet defined.
This statement:

```makefile
FOO ?= bar
```

is exactly equivalent to this (see [The `origin` Function](./origin-function)):

```makefile
ifeq ($(origin FOO), undefined)
  FOO = bar
endif
```

Note that a variable set to an empty value is still defined, so `?=` will not set that variable.
