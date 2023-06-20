# 5.4 Parallel Execution

GNU `make` knows how to execute several recipes at once.
Normally, `make` will execute only one recipe at a time, waiting for it to finish before executing the next.
However, the `-j` or `--jobs` option tells `make` to execute many recipes simultaneously.
You can inhibit parallelism for some or all targets from within the makefile (see [Disabling Parallel Execution](./parallel-disable)).

On MS-DOS, the `-j` option has no effect, since that system doesn't support multi-processing.

If the `-j` option is followed by an integer, this is the number of recipes to execute at once;
this is called the number of _job slots_.
If there is nothing looking like an integer after the `-j` option, there is no limit on the number of job slots.
The default number of job slots is one, which means serial execution (one thing at a time).

Handling recursive `make` invocations raises issues for parallel execution.
For more information on this, see [Communicating Options to a Sub-`make`](./options-recursion).

If a recipe fails (is killed by a signal or exits with a nonzero status), and errors are not ignored for that recipe (see [Errors in Recipes](./errors)), the remaining recipe lines to remake the same target will not be run.
If a recipe fails and the `-k` or `--keep-going` option was not given (see [Summary of Options](../running/options-summary)), `make` aborts execution.
If make terminates for any reason (including a signal) with child processes running, it waits for them to finish before actually exiting.

When the system is heavily loaded, you will probably want to run fewer jobs than when it is lightly loaded.
You can use the `-l` option to tell `make` to limit the number of jobs to run at once, based on the load average.
The `-l` or `--max-load` option is followed by a floating-point number.
For example,

```bash
-l 2.5
```

will not let `make` start more than one job if the load average is above 2.5.
The `-l` option with no following number removes the load limit, if one was given with a previous `-l` option.

More precisely, when `make` goes to start up a job, and it already has at least one job running, it checks the current load average;
if it is not lower than the limit given with `-l`, `make` waits until the load average goes below that limit, or until all the other jobs finish.

By default, there is no load limit.
