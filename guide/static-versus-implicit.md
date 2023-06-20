# 4.12.2 Static Pattern Rules versus Implicit Rules

A static pattern rule has much in common with an implicit rule defined as a pattern rule (see [Defining and Redefining Pattern Rules](./pattern-rules)).
Both have a pattern for the target and patterns for constructing the names of prerequisites.
The difference is in how `make` decides _when_ the rule applies.

An implicit rule _can_ apply to any target that matches its pattern, but it _does_ apply only when the target has no recipe otherwise specified, and only when the prerequisites can be found.
If more than one implicit rule appears applicable, only one applies;
the choice depends on the order of rules.

By contrast, a static pattern rule applies to the precise list of targets that you specify in the rule.
It cannot apply to any other target and it invariably does apply to each of the targets specified.
If two conflicting rules apply, and both have recipes, that's an error.

The static pattern rule can be better than an implicit rule for these reasons:

- You may wish to override the usual implicit rule for a few files whose names cannot be categorized syntactically but can be given in an explicit list.
- If you cannot be sure of the precise contents of the directories you are using, you may not be sure which other irrelevant files might lead `make` to use the wrong implicit rule.
  The choice might depend on the order in which the implicit rule search is done.
  With static pattern rules, there is no uncertainty: each rule applies to precisely the targets specified.
