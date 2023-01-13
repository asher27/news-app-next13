import fetchNews from "../../../libs/fetchNews";
import NewsList from "../../NewsList";
import {categories} from "../../../constants";

type Props = {
    params: {category: Category}
}

async function NewsCategoryPage({params: {category}}: Props) {

    const news: NewsResponse = await fetchNews(
        category,
        '',
        true
    )

    return (
        <div>
            <h1 className="headerTitle">{category}</h1>
            <NewsList news={news} />
        </div>
    )
}

export default NewsCategoryPage

export async function generateStaticParams() {

    return categories.map(category => ({
        category: category
    }))
}

// localhost:3000/news/business
// localhost:3000/news/entertainment
// localhost:3000/news/general
// prebuild these pages.........
