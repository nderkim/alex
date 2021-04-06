const { exec } = require("child_process");

exec("git config core.hooksPath .git-hooks");
