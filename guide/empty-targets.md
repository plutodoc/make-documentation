# 4.8 Empty Target Files to Record Events

The _empty target_ is a variant of the phony target;
it is used to hold recipes for an action that you request explicitly from time to time.
Unlike a phony target, this target file can really exist;
but the file's contents do not matter, and usually are empty.

The purpose of the empty target file is to record, with its last-modification time, when the rule's recipe was last executed.
It does so because one of the commands in the recipe is a `touch` command to update the target file.

The empty target file should have some prerequisites (otherwise it doesn't make sense).
When you ask to remake the empty target, the recipe is executed if any prerequisite is more recent than the target;
in other words, if a prerequisite has changed since the last time you remade the target.
Here is an example:

```makefile
print: foo.c bar.c
        lpr -p $?
        touch print
```

With this rule, `make print` will execute the `lpr` command if either source file has changed since the last `make print`.
The automatic variable `$?` is used to print only those files that have changed (see [Automatic Variables](./automatic-variables)).
