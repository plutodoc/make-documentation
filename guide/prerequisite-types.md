# 4.3 Types of Prerequisites

There are actually two different types of prerequisites understood by GNU `make`: normal prerequisites such as described in the previous section, and _order-only_ prerequisites.
A normal prerequisite makes two statements: first, it imposes an order in which recipes will be invoked: the recipes for all prerequisites of a target will be completed before the recipe for the target is run.
Second, it imposes a dependency relationship: if any prerequisite is newer than the target, then the target is considered out-of-date and must be rebuilt.

Normally, this is exactly what you want: if a target's prerequisite is updated, then the target should also be updated.

Occasionally you may want to ensure that a prerequisite is built before a target, but _without_ forcing the target to be updated if the prerequisite is updated.
_Order-only_ prerequisites are used to create this type of relationship.
Order-only prerequisites can be specified by placing a pipe symbol (`|`) in the prerequisites list: any prerequisites to the left of the pipe symbol are normal;
any prerequisites to the right are order-only:

```makefile
targets : normal-prerequisites | order-only-prerequisites
```

The normal prerequisites section may of course be empty.
Also, you may still declare multiple lines of prerequisites for the same target: they are appended appropriately (normal prerequisites are appended to the list of normal prerequisites;
order-only prerequisites are appended to the list of order-only prerequisites).
Note that if you declare the same file to be both a normal and an order-only prerequisite, the normal prerequisite takes precedence (since they have a strict superset of the behavior of an order-only prerequisite).

Order-only prerequisites are never checked when determining if the target is out of date;
even order-only prerequisites marked as phony (see [Phony Targets](./phony-targets)) will not cause the target to be rebuilt.

Consider an example where your targets are to be placed in a separate directory, and that directory might not exist before `make` is run.
In this situation, you want the directory to be created before any targets are placed into it but, because the timestamps on directories change whenever a file is added, removed, or renamed, we certainly don't want to rebuild all the targets whenever the directory's timestamp changes.
One way to manage this is with order-only prerequisites: make the directory an order-only prerequisite on all the targets:

```makefile
OBJDIR := objdir
OBJS := $(addprefix $(OBJDIR)/,foo.o bar.o baz.o)

$(OBJDIR)/%.o : %.c
        $(COMPILE.c) $(OUTPUT_OPTION) $<

all: $(OBJS)

$(OBJS): | $(OBJDIR)

$(OBJDIR):
        mkdir $(OBJDIR)
```

Now the rule to create the `objdir` directory will be run, if needed, before any `.o` is built, but no `.o` will be built because the `objdir` directory timestamp changed.
