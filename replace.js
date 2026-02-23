const fs = require('fs');
const files = ['src/app/goals/page.tsx', 'src/app/tasks/page.tsx'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/ w-40"/g, ' w-full max-w-sm"');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
