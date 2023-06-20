# 5.4.2 Output During Parallel Execution

When running several recipes in parallel the output from each recipe appears as soon as it is generated, with the result that messages from different recipes may be interspersed, sometimes even appearing on the same line.
This can make reading the output very difficult.

To avoid this you can use the `--output-sync` (`-O`) option.
This option instructs `make` to save the output from the commands it invokes and print it all once the commands are completed.
Additionally, if there are multiple recursive `make` invocations running in parallel, they will communicate so that only one of them is generating output at a time.

If working directory printing is enabled (see [The `--print-directory` Option](./the-option)), the enter/leave messages are printed around each output grouping.
If you prefer not to see these messages add the `--no-print-directory` option to `MAKEFLAGS`.

There are four levels of granularity when synchronizing output, specified by giving an argument to the option (e.g., `-Oline` or `--output-sync=recurse`).

- `none`

  This is the default: all output is sent directly as it is generated and no synchronization is performed.
- `line`

  Output from each individual line of the recipe is grouped and printed as soon as that line is complete.
  If a recipe consists of multiple lines, they may be interspersed with lines from other recipes.
- `target`

  Output from the entire recipe for each target is grouped and printed once the target is complete.
  This is the default if the `--output-sync` or `-O` option is given with no argument.
- `recurse`

  Output from each recursive invocation of `make` is grouped and printed once the recursive invocation is complete.

Regardless of the mode chosen, the total build time will be the same.
The only difference is in how the output appears.

The `target` and `recurse` modes both collect the output of the entire recipe of a target and display it uninterrupted when the recipe completes.
The difference between them is in how recipes that contain recursive invocations of `make` are treated (see [Recursive Use of `make`](./recursion)).
For all recipes which have no recursive lines, the `target` and `recurse` modes behave identically.

If the `recurse` mode is chosen, recipes that contain recursive `make` invocations are treated the same as other targets: the output from the recipe, including the output from the recursive `make`, is saved and printed after the entire recipe is complete.
This ensures output from all the targets built by a given recursive `make` instance are grouped together, which may make the output easier to understand.
However it also leads to long periodsof time during the build where no output is seen, followed by large bursts of output.
If you are not watching the build as it proceeds, but instead viewing a log of the build after the fact, this may be the best option for you.

If you are watching the output, the long gaps of quiet during the build can be frustrating.
The `target` output synchronization mode detects when `make` is going to be invoked recursively, using the standard methods, and it will not synchronize the output of those lines.
The recursive `make` will perform the synchronization for its targets and the output from each will be displayed immediately when it completes.
Be aware that output from recursive lines of the recipe are not synchronized (for example if the recursive line prints a message before running `make`, that message will not be synchronized).

The `line` mode can be useful for front-ends that are watching the output of `make` to track when recipes are started and completed.

Some programs invoked by `make` may behave differently if they determine they're writing output to a terminal versus a file (often described as "interactive" vs. "non-interactive" modes).
For example, many programs that can display colorized output will not do so if they determine they are not writing to a terminal.
If your makefile invokes a program like this then using the output synchronization options will cause the program to believe it's running in "non-interactive" mode even though the output will ultimately go to the terminal.
