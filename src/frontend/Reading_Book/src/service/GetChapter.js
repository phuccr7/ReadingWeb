export async function getListChapter() {
    try {
        const response = await fetch('https://ebook4u-server.onrender.com/api/book/all', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });


        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
    }
}