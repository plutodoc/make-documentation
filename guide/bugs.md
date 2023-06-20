# 1.2 Problems and Bugs

If you have problems with GNU `make` or think you've found a bug, please report it to the developers;
we cannot promise to do anything but we might well want to fix it.

Before reporting a bug, make sure you've actually found a real bug.
Carefully reread the documentation and see if it really says you can do what you're trying to do.
If it's not clear whether you should be able to do something or not, report that too;
it's a bug in the documentation!

Before reporting a bug or trying to fix it yourself, try to isolate it to the smallest possible makefile that reproduces the problem.
Then send us the makefile and the exact results `make` gave you, including any error or warning messages.
Please don't paraphrase these messages: it's best to cut and paste them into your report.
When generating this small makefile, be sure to not use any non-free or unusual tools in your recipes: you can almost always emulate what such a tool would do with simple shell commands.
Finally, be sure to explain what you expected to occur;
this will help us decide whether the problem was really in the documentation.

Once you have a precise problem you can report it in one of two ways.
Either send electronic mail to:

```
bug-make@gnu.org
```

or use our Web-based project management tool, at:

```
https://savannah.gnu.org/projects/make/
```

In addition to the information above, please be careful to include the version number of `make` you are using.
You can get this information with the command `make --version`.
Be sure also to include the type of machine and operating system you are using.
One way to obtain this information is by looking at the final lines of output from the command `make --help`.

If you have a code change you'd like to submit, see the `README` file section "Submitting Patches" for information.
