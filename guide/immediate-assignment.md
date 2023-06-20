# 6.2.3 Immediately Expanded Variable Assignment

Another form of assignment allows for immediate expansion, but unlike simple assignment the resulting variable is recursive: it will be re-expanded again on every use.
In order to avoid unexpected results, after the value is immediately expanded it will automatically be quoted: all instances of $ in the value after expansion will be converted into `$$`.
This type of assignment uses the `:::=` operator.
For example,

```makefile
var = first
OUT :::= $(var)
var = second
```

results in the OUT variable containing the text `first`, while here:


```makefile
var = one$$two
OUT :::= $(var)
var = three$$four
```

results in the OUT variable containing the text `one$$two`.
The value is expanded when the variable is assigned, so the result is the expansion of the first value of var, `one$two`;
then the value is re-escaped before the assignment is complete giving the final result of `one$$two`.

The variable OUT is thereafter considered a recursive variable, so it will be re-expanded when it is used.

This seems functionally equivalent to the `:=` / `::=` operators, but there are a few differences:

First, after assignment the variable is a normal recursive variable;
when you append to it with `+=` the value on the right-hand side is not expanded immediately.
If you prefer the `+=` operator to expand the right-hand side immediately you should use the `:=` / `::=` assignment instead.

Second, these variables are slightly less efficient than simply expanded variables since they do need to be re-expanded when they are used, rather than merely copied.
However since all variable references are escaped this expansion simply un-escapes the value, it won't expand any variables or run any functions.

Here is another example:

```makefile
var = one$$two
OUT :::= $(var)
OUT += $(var)
var = three$$four
```

After this, the value of OUT is the text `one$$two $(var)`.
When this variable is used it will be expanded and the result will be `one$two three$four`.

This style of assignment is equivalent to the traditional BSD `make` `:=` operator;
as you can see it works slightly differently than the GNU make `:=` operator.
The `:::=` operator is added to the POSIX specification in Issue 8 to provide portability.
