# 5.3.2 Choosing the Shell

The program used as the shell is taken from the variable `SHELL`.
If this variable is not set in your makefile, the program /bin/sh is used as the shell.
The argument(s) passed to the shell are taken from the variable `.SHELLFLAGS`.
The default value of `.SHELLFLAGS` is `-c` normally, or `-ec` in POSIX-conforming mode.

Unlike most variables, the variable `SHELL` is never set from the environment.
This is because the `SHELL` environment variable is used to specify your personal choice of shell program for interactive use.
It would be very bad for personal choices like this to affect the functioning of makefiles.
See [Variables from the Environment](./environment).

Furthermore, when you do set `SHELL` in your makefile that value is _not_ exported in the environment to recipe lines that `make` invokes.
Instead, the value inherited from the user's environment, if any, is exported.
You can override this behavior by explicitly exporting `SHELL` (see [Communicating Variables to a Sub-`make`](./variables-recursion)), forcing it to be passed in the environment to recipe lines.

However, on MS-DOS and MS-Windows the value of `SHELL` in the environment **is** used, since on those systems most users do not set this variable, and therefore it is most likely set specifically to be used by `make`.
On MS-DOS, if the setting of `SHELL` is not suitable for `make`, you can set the variable `MAKESHELL` to the shell that `make` should use;
if set it will be used as the shell instead of the value of `SHELL`.

## Choosing a Shell in DOS and Windows

Choosing a shell in MS-DOS and MS-Windows is much more complex than on other systems.

On MS-DOS, if `SHELL` is not set, the value of the variable `COMSPEC` (which is always set) is used instead.

The processing of lines that set the variable `SHELL` in Makefiles is different on MS-DOS.
The stock shell, `command.com`, is ridiculously limited in its functionality and many users of `make` tend to install a replacement shell.
Therefore, on MS-DOS, `make` examines the value of `SHELL`, and changes its behavior based on whether it points to a Unix-style or DOS-style shell.
This allows reasonable functionality even if `SHELL` points to command.com.

If `SHELL` points to a Unix-style shell, `make` on MS-DOS additionally checks whether that shell can indeed be found;
if not, it ignores the line that sets `SHELL`.
In MS-DOS, GNU `make` searches for the shell in the following places:

1. In the precise place pointed to by the value of `SHELL`.
   For example, if the makefile specifies `SHELL = /bin/sh`, `make` will look in the directory `/bin` on the current drive.
2. In the current directory.
3. In each of the directories in the `PATH` variable, in order.

In every directory it examines, `make` will first look for the specific file (`sh` in the example above).
If this is not found, it will also look in that directory for that file with one of the known extensions which identify executable files.
For example `.exe`, `.com`, `.bat`, `.btm`, `.sh`, and some others.

If any of these attempts is successful, the value of `SHELL` will be set to the full pathname of the shell as found.
However, if none of these is found, the value of `SHELL` will not be changed, and thus the line that sets it will be effectively ignored.
This is so `make` will only support features specific to a Unix-style shell if such a shell is actually installed on the system where `make` runs.

Note that this extended search for the shell is limited to the cases where `SHELL` is set from the Makefile;
if it is set in the environment or command line, you are expected to set it to the full pathname of the shell, exactly as things are on Unix.

The effect of the above DOS-specific processing is that a Makefile that contains `SHELL = /bin/sh` (as many Unix makefiles do), will work on MS-DOS unaltered if you have e.g. `sh.exe` installed in some directory along your `PATH`.
