import {createClient} from 'contentful'

const useContentful = () => {
    const client = createClient({
        space: process.env.REACT_APP_SPACE,
        accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    });

    const getBlogs = async () => {
        try {
            // fetch data
            const entries = await client.getEntries({
                content_type: "blog",
                select: "fields"
            })
            // filter the good stuff
            return entries.items.map(entry => ({
                subject: entry.fields.subject,
                content: entry.fields.content.content
                                                .map(x => x.content
                                                                .map(x2 => x2.value)
                                                )
                                                .reduce((cur, prev) => `${cur} \n ${prev}`)
            }))
        } catch (err) {
            console.error("@@@@", `Error fetching authors: ${err}`)
        }
    }

    return { getBlogs }
}

export default useContentful;