import fs from 'fs';

const lines = fs.readFileSync('C:\\Users\\sarit\\.gemini\\antigravity-ide\\brain\\91a5c879-7dbe-43a4-bb18-2371416ab6e8\\.system_generated\\logs\\transcript_full.jsonl', 'utf-8').split('\n');

for (const line of lines) {
    if (!line) continue;
    try {
        const parsed = JSON.parse(line);
        if (parsed.step_index === 16 && parsed.content) {
            fs.writeFileSync('original_trending_states.txt', parsed.content);
            console.log('Successfully extracted TrendingStates.jsx');
            break;
        }
    } catch (e) {
        console.error('Error parsing line', e);
    }
}
