import React, { useEffect, useState } from 'react'
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { client } from '../config/config';
import ContentCard from '../components/ContentCard';
import { Container } from '@chakra-ui/layout';
import Search from '../components/Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import _get from 'lodash/get'
import { ReactComponent as ReactLoading } from '../assets/loading.svg';
import useDebounce from '../hooks/useDebounce';

export const GET_CONTENT_CARD = gql`
query GetContentCards($limit: Int!, $offset: Int!, $keywords: String!) {
    contentCards(filter: {
        limit: $limit,
        offset: $offset,
        keywords: $keywords,
        types: [PODCAST]
    }) {
        meta {
            total,
            limit,
            offset
        }
        edges {
            ...on Podcast {
                name
                image {
                    ...Image
                }
                categories {
                    ...Category
                }
                experts {
                    ...Expert
                }
            }
        }
    }
}
fragment Image on Image {
    uri
}
fragment Category on Category {
    name
}
fragment Expert on Expert {
    firstName
    lastName
    title
    company
}
`;

const Home = () => {
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [search, setSearch] = useState("")
    const [contents, setContents] = useState([])
    const searchDebounce = useDebounce(search, 300);


    let [getContentCard, { loading, data, refetch }] = useLazyQuery(GET_CONTENT_CARD, {
        notifyOnNetworkStatusChange: true,
        client: client,
    });

    useEffect(() => {
        getContentCard({
            variables: {
                limit: pageSize, offset: page, keywords: search
            }
        })
    }, [refetch, searchDebounce]);

    const fetchMoreData = () => {
        let newPage = page + 1
        setPage(newPage)
        refetch({ limit: pageSize, offset: newPage, keywords: search });
    }

    const handleChangeSearch = (searchItem) => {
        setContents([])
        setSearch(searchItem)
        setPage(0)
        setTotalRecords(0)
    }

    useEffect(() => {
        if (data) {
            let contentCardsData = _get(data, "contentCards.edges", [])
            let newData = contents.concat(contentCardsData)
            setContents(newData)
            setTotalRecords(_get(data, "contentCards.meta.total", 0))

        }
    }, [data])

    return (
        <div className="contentcard-wrapper">
            <Container className="custom-container" maxW="xl" centerContent py={8} px={8} bgColor="#001315">
                <Search handleChangeSearch={handleChangeSearch} />
                <InfiniteScroll
                    dataLength={contents.length}
                    next={() => fetchMoreData()}
                    hasMore={contents.length !== totalRecords || loading}
                    loader={<ReactLoading />}
                >
                    <ContentCard contents={contents} />
                </InfiniteScroll>
            </Container>
        </div>
    )
}

export default Home