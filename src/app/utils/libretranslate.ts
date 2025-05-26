export async function translateText(
    text: string,
    sourceLang: string,
    targetLang: string
): Promise<string> {
    const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: 'text',
        }),
    });

    const data = await res.json();
    return data.translatedText;
}
