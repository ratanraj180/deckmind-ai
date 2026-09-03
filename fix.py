import os
path = r'e:\deckmind-ai\src\lib\mockData.ts'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace(',,', ',')
c = c.replace('layoutStyle: "split"', 'layoutStyle: "split",')
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
