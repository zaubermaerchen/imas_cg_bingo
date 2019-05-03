export function searchIdol(name: string | null = null, type: number | null = null, rarity: number | null = null, limit: number | null = null, offset: number | null = null): Promise<any> {
    const url = new URL("https://zaubermaerchen.info/imas_cg/api/idol/search/");
    if (name != null) {
        url.searchParams.append("name", name);
    }
    if (type != null) {
        url.searchParams.append("type", type.toString());
    }
    if (rarity != null) {
        url.searchParams.append("rarity", rarity.toString());
    }
    if (limit != null) {
        url.searchParams.append("limit", limit.toString());
    }
    if (offset != null) {
        url.searchParams.append("offset", offset.toString());
    }

    return fetch(url.href, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
        credentials: "omit"
    }).then((response: Response) => {
        return response.json();
    });
}

export function getIdol(idol_id: number): Promise<any> {
    const url = new URL("https://zaubermaerchen.info/imas_cg/api/idol/" + idol_id + "/");

    return fetch(url.href, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
        credentials: "omit"
    }).then((response: Response) => {
        return response.json();
    });
}