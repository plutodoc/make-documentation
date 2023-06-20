# 4 Writing Rules

A _rule_ appears in the makefile and says when and how to remake certain files, called the rule's _targets_ (most often only one per rule).
It lists the other files that are the _prerequisites_ of the target, and the _recipe_ to use to create or update the target.

The order of rules is not significant, except for determining the _default goal_: the target for `make` to consider, if you do not otherwise specify one.
The default goal is the target of the first rule in the first makefile.
There are two exceptions: a target starting with a period is not a default unless it also contains one or more slashes, `/`;
and, a target that defines a pattern rule has no effect on the default goal.
(See [Defining and Redefining Pattern Rules](./pattern-rules).)

Therefore, we usually write the makefile so that the first rule is the one for compiling the entire program or all the programs described by the makefile (often with a target called `all`).
See [Arguments to Specify the Goals](./goals).
