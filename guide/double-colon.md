# 4.13 Double-Colon Rules

_Double-colon_ rules are explicit rules written with `::` instead of `:` after the target names.
They are handled differently from ordinary rules when the same target appears in more than one rule.
Pattern rules with double-colons have an entirely different meaning (see [Match-Anything Rules](./match-anything-rules)).

When a target appears in multiple rules, all the rules must be the same type: all ordinary, or all double-colon.
If they are double-colon, each of them is independent of the others.
Each double-colon rule's recipe is executed if the target is older than any prerequisites of that rule.
If there are no prerequisites for that rule, its recipe is always executed (even if the target already exists).
This can result in executing none, any, or all of the double-colon rules.

Double-colon rules with the same target are in fact completely separate from one another.
Each double-colon rule is processed individually, just as rules with different targets are processed.

The double-colon rules for a target are executed in the order they appear in the makefile.
However, the cases where double-colon rules really make sense are those where the order of executing the recipes would not matter.

Double-colon rules are somewhat obscure and not often very useful;
they provide a mechanism for cases in which the method used to update a target differs depending on which prerequisite files caused the update, and such cases are rare.

Each double-colon rule should specify a recipe;
if it does not, an implicit rule will be used if one applies.
See [Using Implicit Rules](./implicit-rules).
