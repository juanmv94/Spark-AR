# Usage: drag and drop .patches file

import sys
import re

with open(sys.argv[1], 'r') as file:
  filedata = file.read()

# Replace the target string
filedata = re.sub(r'(?s)"templateId": "builtin.optionPicker"(.+?)"variantInfo"', '"templateId": "builtin.variadicOptionPicker"\\1"variadicInfo":{"input":5},"variantInfo"', filedata)

# Write the file out again
with open(sys.argv[1], 'w') as file:
  file.write(filedata)