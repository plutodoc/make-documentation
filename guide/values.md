# 6.4 How Variables Get Their Values

Variables can get values in several different ways:

- You can specify an overriding value when you run `make`.
  See [Overriding Variables](./overriding).
- You can specify a value in the makefile, either with an assignment (see [Setting Variables](./setting)) or with a verbatim definition (see [Defining Multi-Line Variables](./multi-line)).
- You can specify a short-lived value with the `let` function (see [The `let` Function](./let-function)) or with the `foreach` function (see [The `foreach` Function](./foreach-function)).
- Variables in the environment become `make` variables.
  See [Variables from the Environment](./environment).
- Several _automatic_ variables are given new values for each rule.
  Each of these has a single conventional use. See [Automatic Variables](./automatic-variables).
- Several variables have constant initial values. See [Variables Used by Implicit Rules](./implicit-variables).
