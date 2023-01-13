import {categories} from "../constants";
import fetchNews from "../libs/fetchNews";
import NewsList from "./NewsList";
import response from '../response.json'

async function Page() {

    const news: NewsResponse = await fetchNews(categories.join(','))
    // const news: NewsResponse = response || (await fetchNews(categories.join(',')))

    return (
        <div>
            <NewsList news={news} />
        </div>
    )
}

export default Page