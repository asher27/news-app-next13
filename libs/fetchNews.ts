import {gql} from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async(
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {

//     Graph Query...
    const query = gql`
    query myQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
    ) {
  myQuery(
  access_key: $access_key
  category : $categories
  countries: "us"
  sort: "published_desc"
  keywords: $keywords
  ) {
    data {
      author
      category
      country
      description
      image
      language
      published_at
      source
      title
      url
    }
    pagination {
      count
      limit
      offset
      total
    }
  }
}
`

//     Fetch function with Nextjs 13 caching...
    const res = await fetch('https://wanaque.stepzen.net/api/kilted-donkey/__graphql', {
        method: 'POST',
        cache: isDynamic ? 'no-cache' :  'default',
        next: isDynamic ? {revalidate: 0} : {revalidate: 20},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query: query,
            variables: {
                access_key: process.env.MEDIA_STACK_ACCESS_KEY,
                categories: category,
                keywords: keywords,
            }
        })
    })

    console.log(
        "LOADING NEW DATA FROM API for category >>> ",
        category,
        keywords
    )

    const newsResponse = await  res.json()
    console.log("newsResponse >>> ", newsResponse)
//     Sort function by image vs not image present
    const sortedNewsResponse = sortNewsByImage(newsResponse.data.myQuery)
//     return res
    return sortedNewsResponse
}

export default fetchNews;

