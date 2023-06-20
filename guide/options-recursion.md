# 5.7.3 Communicating Options to a Sub-`make`

Flags such as `-s` and `-k` are passed automatically to the sub-`make` through the variable `MAKEFLAGS`.
This variable is set up automatically by `make` to contain the flag letters that `make` received.
Thus, if you do `make -ks` then `MAKEFLAGS` gets the value `ks`.

As a consequence, every sub-`make` gets a value for `MAKEFLAGS` in its environment.
In response, it takes the flags from that value and processes them as if they had been given as arguments.
See [Summary of Options](./options-summary).
This means that, unlike other environment variables, `MAKEFLAGS` specified in the environment take precedence over `MAKEFLAGS` specified in the makefile.

The value of `MAKEFLAGS` is a possibly empty group of characters representing single-letter options that take no argument, followed by a space and any options that take arguments or which have long option names.
If an option has both single-letter and long options, the single-letter option is always preferred.
If there are no single-letter options on the command line, then the value of `MAKEFLAGS` starts with a space.

Likewise variables defined on the command line are passed to the sub-`make` through `MAKEFLAGS`.
Words in the value of `MAKEFLAGS` that contain `=`, `make` treats as variable definitions just as if they appeared on the command line.
See [Overriding Variables](./overriding).

The options `-C`, `-f`, `-o`, and `-W` are not put into `MAKEFLAGS`;
these options are not passed down.

The `-j` option is a special case (see [Parallel Execution](./parallel)).
If you set it to some numeric value `N` and your operating system supports it (most any UNIX system will;
others typically won't), the parent `make` and all the sub-`make`s will communicate to ensure that there are only `N` jobs running at the same time between them all.
Note that any job that is marked recursive (see [Instead of Executing Recipes](./instead-of-execution)) doesn't count against the total jobs (otherwise we could get `N` sub-`make`s running and have no slots left over for any real work!)

If your operating system doesn't support the above communication, then no `-j` is added to `MAKEFLAGS`, so that sub-`make`s run in non-parallel mode.
If the `-j` option were passed down to sub-`make`s you would get many more jobs running in parallel than you asked for.
If you give `-j` with no numeric argument, meaning to run as many jobs as possible in parallel, this is passed down, since multiple infinities are no more than one.

If you do not want to pass the other flags down, you must change the value of `MAKEFLAGS`, like this:

```makefile
subsystem:
        cd subdir && $(MAKE) MAKEFLAGS=
```

The command line variable definitions really appear in the variable `MAKEOVERRIDES`, and `MAKEFLAGS` contains a reference to this variable.
If you do want to pass flags down normally, but don't want to pass down the command line variable definitions, you can reset `MAKEOVERRIDES` to empty, like this:

```makefile
MAKEOVERRIDES =
```

This is not usually useful to do. However, some systems have a small fixed limit on the size of the environment, and putting so much information into the value of `MAKEFLAGS` can exceed it.
If you see the error message `Arg list too long`, this may be the problem.
(For strict compliance with POSIX.2, changing `MAKEOVERRIDES` does not affect `MAKEFLAGS` if the special target `.POSIX` appears in the makefile.
You probably do not care about this.)

A similar variable `MFLAGS` exists also, for historical compatibility.
It has the same value as `MAKEFLAGS` except that it does not contain the command line variable definitions, and it always begins with a hyphen unless it is empty (`MAKEFLAGS` begins with a hyphen only when it begins with an option that has no single-letter version, such as `--warn-undefined-variables`).
`MFLAGS` was traditionally used explicitly in the recursive `make` command, like this:

```makefile
subsystem:
        cd subdir && $(MAKE) $(MFLAGS)
```

but now `MAKEFLAGS` makes this usage redundant.
If you want your makefiles to be compatible with old `make` programs, use this technique;
it will work fine with more modern `make` versions too.

The `MAKEFLAGS` variable can also be useful if you want to have certain options, such as `-k` (see [Summary of Options](./options-summary)), set each time you run `make`.
You simply put a value for `MAKEFLAGS` in your environment.
You can also set `MAKEFLAGS` in a makefile, to specify additional flags that should also be in effect for that makefile.
(Note that you cannot use `MFLAGS` this way.
That variable is set only for compatibility;
`make` does not interpret a value you set for it in any way.)

When `make` interprets the value of `MAKEFLAGS` (either from the environment or from a makefile), it first prepends a hyphen if the value does not already begin with one.
Then it chops the value into words separated by blanks, and parses these words as if they were options given on the command line (except that `-C`, `-f`, `-h`, `-o`, `-W`, and their long-named versions are ignored;
and there is no error for an invalid option).

If you do put `MAKEFLAGS` in your environment, you should be sure not to include any options that will drastically affect the actions of `make` and undermine the purpose of makefiles and of `make` itself.
For instance, the '-t', '-n', and '-q' options, if put in one of these variables, could have disastrous consequences and would certainly have at least surprising and probably annoying effects.

If you'd like to run other implementations of `make` in addition to GNU `make`, and hence do not want to add GNU `make`-specific flags to the `MAKEFLAGS` variable, you can add them to the `GNUMAKEFLAGS` variable instead.
This variable is parsed just before `MAKEFLAGS`, in the same way as `MAKEFLAGS`.
When `make` constructs `MAKEFLAGS` to pass to a recursive `make` it will include all flags, even those taken from `GNUMAKEFLAGS`.
As a result, after parsing `GNUMAKEFLAGS` GNU `make` sets this variable to the empty string to avoid duplicating flags during recursion.

It's best to use `GNUMAKEFLAGS` only with flags which won't materially change the behavior of your makefiles.
If your makefiles require GNU make anyway then simply use `MAKEFLAGS`. Flags such as `--no-print-directory` or `--output-sync` may be appropriate for `GNUMAKEFLAGS`.
