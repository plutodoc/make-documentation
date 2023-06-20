# 5.1.2 Using Variables in Recipes

The other way in which `make` processes recipes is by expanding any variable references in them (see [Basics of Variable References](../using-variables/reference)).
This occurs after make has finished reading all the makefiles and the target is determined to be out of date;
so, the recipes for targets which are not rebuilt are never expanded.

Variable and function references in recipes have identical syntax and semantics to references elsewhere in the makefile.
They also have the same quoting rules: if you want a dollar sign to appear in your recipe, you must double it (`$$`).
For shells like the default shell, that use dollar signs to introduce variables, it's important to keep clear in your mind whether the variable you want to reference is a `make` variable (use a single dollar sign) or a shell variable (use two dollar signs).
For example:

```makefile
LIST = one two three
all:
        for i in $(LIST); do \
            echo $$i; \
        done
```

results in the following command being passed to the shell:

```makefile
for i in one two three; do \
    echo $i; \
done
```

which generates the expected result:

```txt
one
two
three
```
