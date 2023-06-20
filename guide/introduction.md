# 2 An Introduction to Makefiles

You need a file called a _makefile_ to tell `make` what to do. Most often, the makefile tells `make` how to compile and link a program.

In this chapter, we will discuss a simple makefile that describes how to compile and link a text editor which consists of eight C source files and three header files.
The makefile can also tell `make` how to run miscellaneous commands when explicitly asked (for example, to remove certain files as a clean-up operation).
To see a more complex example of a makefile, see [Complex Makefile Example](./complex-makefile).

When `make` recompiles the editor, each changed C source file must be recompiled.
If a header file has changed, each C source file that includes the header file must be recompiled to be safe.
Each compilation produces an object file corresponding to the source file.
Finally, if any source file has been recompiled, all the object files, whether newly made or saved from previous compilations, must be linked together to produce the new executable editor.
