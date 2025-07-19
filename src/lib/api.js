
   export const fetchApi = async (url, method = "GET", body) => {
        try{
            const response = await fetch(url, {
                headers: {'Content-Type': 'application/json'},
                body: body ? JSON.stringify(body) : undefined,
            })
            return await response.json();
        } catch (error) {
            console.error('Request Failed', error);
            throw error;
        }
    }
