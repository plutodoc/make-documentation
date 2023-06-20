# 5.4.3 Input During Parallel Execution

Two processes cannot both take input from the same device at the same time.
To make sure that only one recipe tries to take input from the terminal at once, `make` will invalidate the standard input streams of all but one running recipe.
If another recipe attempts to read from standard input it will usually incur a fatal error (a `Broken pipe` signal).

It is unpredictable which recipe will have a valid standard input stream (which will come from the terminal, or wherever you redirect the standard input of `make`).
The first recipe run will always get it first, and the first recipe started after that one finishes will get it next, and so on.

We will change how this aspect of `make` works if we find a better alternative.
In the mean time, you should not rely on any recipe using standard input at all if you are using the parallel execution feature;
but if you are not using this feature, then standard input works normally in all recipes.
