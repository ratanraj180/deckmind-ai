import re
import os

base = r'e:\deckmind-ai\src'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Fix src/app/api/admin/stats/route.ts
f1 = os.path.join(base, 'app', 'api', 'admin', 'stats', 'route.ts')
c1 = read_file(f1)
c1 = re.sub(r'\(p\) =>', '(p: any) =>', c1)
write_file(f1, c1)

# 2. Fix src/app/api/presentations/[id]/download/route.ts
f2 = os.path.join(base, 'app', 'api', 'presentations', '[id]', 'download', 'route.ts')
c2 = read_file(f2)
c2 = c2.replace('new NextResponse(pptxBuffer,', 'new NextResponse(pptxBuffer as any,')
write_file(f2, c2)

# 3. Fix src/lib/auth/config.ts
f3 = os.path.join(base, 'lib', 'auth', 'config.ts')
c3 = read_file(f3)
c3 = c3.replace('session.user.id = token.id as string;', 'if (session.user) { (session.user as any).id = token.id as string; }')
write_file(f3, c3)

# 4. Fix src/lib/mockData.ts
f4 = os.path.join(base, 'lib', 'mockData.ts')
c4 = read_file(f4)
c4 = re.sub(r'durationSeconds:\s*([^,]+),\s*speakerNotes:\s*(.*)', 
            r'durationSeconds: \1,\n    speakerNotes: \2,\n    templateId: "tpl-mock",\n    templateFamily: "modern",\n    layoutStyle: "split"', c4)
c4 = re.sub(r'updatedAt:\s*(.*)', 
            r'updatedAt: \1,\n    template: { id: "tpl-mock", name: "Mock", family: "modern", layoutStyle: "split", fontMood: "clean_sans", palette: { primary: "#000", secondary: "#000", accent: "#000", background: "#fff", text: "#000", cardBg: "#fff", border: "#eee", isDark: false } }', c4)
write_file(f4, c4)

print('Patched successfully!')
