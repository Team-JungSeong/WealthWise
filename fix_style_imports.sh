#!/bin/bash
find src/styles -type f -name "*.ts" | xargs sed -i "" -E "s|import ([A-Za-z0-9_{}]+) from \"\\.\\.\/\\.\\.\/components\/common\/([A-Za-z0-9_]+)\"|import \1 from \"components/common/\2\"|g"
find src/styles -type f -name "*.ts" | xargs sed -i "" -E "s|import ([A-Za-z0-9_{}]+) from \"\\.\\.\/\\.\\.\/\\.\\.\/components\/common\/([A-Za-z0-9_]+)\"|import \1 from \"components/common/\2\"|g"
echo "Style imports fixed successfully!"
