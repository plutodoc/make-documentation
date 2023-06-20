# 4.5 Searching Directories for Prerequisites

For large systems, it is often desirable to put sources in a separate directory from the binaries.
The _directory search_ features of `make` facilitate this by searching several directories automatically to find a prerequisite.
When you redistribute the files among directories, you do not need to change the individual rules, just the search paths.
