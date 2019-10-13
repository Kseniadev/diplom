export class Api {
    constructor (url) {
        this.url = url;
    }
    getInfoFromApi () {
        return fetch(this.url)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response.json())
                } else {
                    return Promise.reject(new Error(response.statusText))
                }
            })
            .then(json => {
                if (json.totalResults === 0) {
                    return Promise.reject(json = "К сожалению, по вашему запросу ничего не найдено");
                }
                if (json.message === "Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key.") {
                    return Promise.reject (json = "Неправильно указан ключ API, подробности на сайте: https://newsapi.org ");
                }
                return json;
            })
    }
}
