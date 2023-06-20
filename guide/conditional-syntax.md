# 7.2 Syntax of Conditionals

The syntax of a simple conditional with no `else` is as follows:

```makefile
conditional-directive
text-if-true
endif
```

The _text-if-true_ may be any lines of text, to be considered as part of the makefile if the condition is true.
If the condition is false, no text is used instead.

The syntax of a complex conditional is as follows:

```makefile
conditional-directive
text-if-true
else
text-if-false
endif
```

or:

```makefile
conditional-directive-one
text-if-one-is-true
else conditional-directive-two
text-if-two-is-true
else
text-if-one-and-two-are-false
endif
```

There can be as many "`else` conditional-directive" clauses as necessary.
Once a given condition is true, text-if-true is used and no other clause is used;
if no condition is true then text-if-false is used.
The text-if-true and text-if-false can be any number of lines of text.

The syntax of the conditional-directive is the same whether the conditional is simple or complex;
after an `else` or not.
There are four different directives that test different conditions.
Here is a table of them:

- `ifeq (arg1, arg2)`
- `ifeq 'arg1' 'arg2'`
- `ifeq "arg1" "arg2"`
- `ifeq "arg1" 'arg2'`
- `ifeq 'arg1' "arg2"`

  Expand all variable references in arg1 and arg2 and compare them.
  If they are identical, the text-if-true is effective;
  otherwise, the text-if-false, if any, is effective.

  Often you want to test if a variable has a non-empty value.
  When the value results from complex expansions of variables and functions, expansions you would consider empty may actually contain whitespace characters and thus are not seen as empty.
  However, you can use the `strip` function (see [Functions for String Substitution and Analysis](./text-functions)) to avoid interpreting whitespace as a non-empty value.
  For example:

  ```makefile
  ifeq ($(strip $(foo)),)
  text-if-empty
  endif
  ```

  will evaluate text-if-empty even if the expansion of `$(foo)` contains whitespace characters.

- `ifneq (arg1, arg2)`
- `ifneq 'arg1' 'arg2'`
- `ifneq "arg1" "arg2"`
- `ifneq "arg1" 'arg2'`
- `ifneq 'arg1' "arg2"`

  Expand all variable references in _arg1_ and _arg2_ and compare them.
  If they are different, the _text-if-true_ is effective;
  otherwise, the _text-if-false_, if any, is effective.

- `ifdef variable-name`

  The `ifdef` form takes the _name_ of a variable as its argument, not a reference to a variable.
  If the value of that variable has a non-empty value, the text-if-true is effective;
  otherwise, the text-if-false, if any, is effective.
  Variables that have never been defined have an empty value.
  The text variable-name is expanded, so it could be a variable or function that expands to the name of a variable.
  For example:

  ```makefile
  bar = true
  foo = bar
  ifdef $(foo)
  frobozz = yes
  endif
  ```

  The variable reference `$(foo)` is expanded, yielding `bar`, which is considered to be the name of a variable.
  The variable `bar` is not expanded, but its value is examined to determine if it is non-empty.

  Note that `ifdef` only tests whether a variable has a value.
  It does not expand the variable to see if that value is nonempty.
  Consequently, tests using `ifdef` return true for all definitions except those like `foo =`.
  To test for an empty value, use `ifeq ($(foo),)`. For example,

  ```makefile
  bar =
  foo = $(bar)
  ifdef foo
  frobozz = yes
  else
  frobozz = no
  endif
  ```

  sets `frobozz` to `yes`, while:

  ```makefile
  foo =
  ifdef foo
  frobozz = yes
  else
  frobozz = no
  endif
  ```

  sets `frobozz` to `no`.

- `ifndef variable-name`

  If the variable _variable-name_ has an empty value, the _text-if-true_ is effective;
  otherwise, the _text-if-false_, if any, is effective.
  The rules for expansion and testing of _variable-name_ are identical to the `ifdef` directive.

Extra spaces are allowed and ignored at the beginning of the conditional directive line, but a tab is not allowed.
(If the line begins with a tab, it will be considered part of a recipe for a rule.)
Aside from this, extra spaces or tabs may be inserted with no effect anywhere except within the directive name or within an argument.
A comment starting with `#` may appear at the end of the line.

The other two directives that play a part in a conditional are `else` and `endif`.
Each of these directives is written as one word, with no arguments.
Extra spaces are allowed and ignored at the beginning of the line, and spaces or tabs at the end.
A comment starting with `#` may appear at the end of the line.

Conditionals affect which lines of the makefile `make` uses.
If the condition is true, `make` reads the lines of the _text-if-true_ as part of the makefile;
if the condition is false, `make` ignores those lines completely.
It follows that syntactic units of the makefile, such as rules, may safely be split across the beginning or the end of the conditional.

`make` evaluates conditionals when it reads a makefile.
Consequently, you cannot use automatic variables in the tests of conditionals because they are not defined until recipes are run (see [Automatic Variables](./automatic-variables)).

To prevent intolerable confusion, it is not permitted to start a conditional in one makefile and end it in another.
However, you may write an `include` directive within a conditional, provided you do not attempt to terminate the conditional inside the included file.
