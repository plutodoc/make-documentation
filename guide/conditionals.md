# 7 Conditional Parts of Makefiles

A _conditional_ directive causes part of a makefile to be obeyed or ignored depending on the values of variables.
Conditionals can compare the value of one variable to another, or the value of a variable to a constant string.
Conditionals control what `make` actually "sees" in the makefile, so they _cannot_ be used to control recipes at the time of execution.
