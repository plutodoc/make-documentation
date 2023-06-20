# 4.5.3 How Directory Searches are Performed

When a prerequisite is found through directory search, regardless of type (general or selective), the pathname located may not be the one that `make` actually provides you in the prerequisite list.
Sometimes the path discovered through directory search is thrown away.

The algorithm `make` uses to decide whether to keep or abandon a path found via directory search is as follows:

1. If a target file does not exist at the path specified in the makefile, directory search is performed.
2. If the directory search is successful, that path is kept and this file is tentatively stored as the target.
3. All prerequisites of this target are examined using this same method.
4. After processing the prerequisites, the target may or may not need to be rebuilt:
   1. If the target does _not_ need to be rebuilt, the path to the file found during directory search is used for any prerequisite lists which contain this target.
      In short, if `make` doesn't need to rebuild the target then you use the path found via directory search.
   2. If the target _does_ need to be rebuilt (is out-of-date), the pathname found during directory search is _thrown away_, and the target is rebuilt using the file name specified in the makefile.
      In short, if `make` must rebuild, then the target is rebuilt locally, not in the directory found via directory search.

This algorithm may seem complex, but in practice it is quite often exactly what you want.

Other versions of `make` use a simpler algorithm: if the file does not exist, and it is found via directory search, then that pathname is always used whether or not the target needs to be built.
Thus, if the target is rebuilt it is created at the pathname discovered during directory search.

If, in fact, this is the behavior you want for some or all of your directories, you can use the `GPATH` variable to indicate this to `make`.

`GPATH` has the same syntax and format as `VPATH` (that is, a space- or colon-delimited list of pathnames).
If an out-of-date target is found by directory search in a directory that also appears in `GPATH`, then that pathname is not thrown away.
The target is rebuilt using the expanded path.
