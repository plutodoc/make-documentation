# 6.10 Variables from the Environment

Variables in `make` can come from the environment in which `make` is run.
Every environment variable that `make` sees when it starts up is transformed into a `make` variable with the same name and value.
However, an explicit assignment in the makefile, or with a command argument, overrides the environment.
(If the `-e` flag is specified, then values from the environment override assignments in the makefile.
See [Summary of Options](./options-summary).
But this is not recommended practice.)

Thus, by setting the variable `CFLAGS` in your environment, you can cause all C compilations in most makefiles to use the compiler switches you prefer.
This is safe for variables with standard or conventional meanings because you know that no makefile will use them for other things.
(Note this is not totally reliable;
some makefiles set `CFLAGS` explicitly and therefore are not affected by the value in the environment.)

When `make` runs a recipe, some variables defined in the makefile are placed into the environment of each command `make` invokes.
By default, only variables that came from the `make`'s environment or set on its command line are placed into the environment of the commands.
You can use the `export` directive to pass other variables.
See [Communicating Variables to a Sub-`make`](./variables-in-recipes), for full details.

Other use of variables from the environment is not recommended.
It is not wise for makefiles to depend for their functioning on environment variables set up outside their control, since this would cause different users to get different results from the same makefile.
This is against the whole purpose of most makefiles.

Such problems would be especially likely with the variable `SHELL`, which is normally present in the environment to specify the user's choice of interactive shell.
It would be very undesirable for this choice to affect `make`;
so, `make` handles the `SHELL` environment variable in a special way;
see [Choosing the Shell](./choosing-the-shell).
