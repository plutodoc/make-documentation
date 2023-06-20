# 5.6 Interrupting or Killing `make`

If `make` gets a fatal signal while a shell is executing, it may delete the target file that the recipe was supposed to update.
This is done if the target file's last-modification time has changed since `make` first checked it.

The purpose of deleting the target is to make sure that it is remade from scratch when `make` is next run.
Why is this?
Suppose you type `Ctrl` + `c` while a compiler is running, and it has begun to write an object file `foo.o`.
The `Ctrl` + `c` kills the compiler, resulting in an incomplete file whose last-modification time is newer than the source file `foo.c`.
But `make` also receives the `Ctrl` + `c` signal and deletes this incomplete file.
If `make` did not do this, the next invocation of `make` would think that `foo.o` did not require updating—resulting in a strange error message from the linker when it tries to link an object file half of which is missing.

You can prevent the deletion of a target file in this way by making the special target `.PRECIOUS` depend on it.
Before remaking a target, `make` checks to see whether it appears on the prerequisites of `.PRECIOUS`, and thereby decides whether the target should be deleted if a signal happens.
Some reasons why you might do this are that the target is updated in some atomic fashion, or exists only to record a modification-time (its contents do not matter), or must exist at all times to prevent other sorts of trouble.

Although `make` does its best to clean up there are certain situations in which cleanup is impossible.
For example, `make` may be killed by an uncatchable signal.
Or, one of the programs make invokes may be killed or crash, leaving behind an up-to-date but corrupt target file: `make` will not realize that this failure requires the target to be cleaned.
Or `make` itself may encounter a bug and crash.

For these reasons it's best to write _defensive recipes_, which won't leave behind corrupted targets even if they fail.
Most commonly these recipes create temporary files rather than updating the target directly, then rename the temporary file to the final target name.
Some compilers already behave this way, so that you don't need to write a defensive recipe.
