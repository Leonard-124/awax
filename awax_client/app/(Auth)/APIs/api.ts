


interface Profile {
    username: string,
    phone: string,
}

const BASE_URL = "https://paychain-backend.onrender.com/"


export async function fetchProfile({username, phone}: Profile) {
    try {
        // if(!token) throw new Error("Token is required");
        const res = await fetch(`${BASE_URL}/me`)
        if(!res.ok) throw new Error(`HTTP status error ${res.status}`);
        await res.json()
    } catch(err) {
        if(err) throw err
    }
}