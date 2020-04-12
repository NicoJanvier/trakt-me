import React from 'react';
import useSWR from 'swr';
import myFetch from '../utils/fetch';
import { WatchedShowObject } from './api/trakt/tv/progress';
import Link from 'next/link';
import styled from 'styled-components';

const fetcher = (url: string) => myFetch(url).then(r => r.json())

const ShowList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 16px;
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const ShowLink = styled.a`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  > * {
    width: 100%;
  }
`

const ProgressPage = () => {
  const { data, error } = useSWR<WatchedShowObject[]>('/api/trakt/tv/progress', fetcher);
  if (error) return <div>Error loading watched shows</div>;
  if (!data) return <div>Loading...</div>
  return (
    <ShowList>
      {data.map(({ title, image, trakt_id, last_watched_at }) => (
        <li key={trakt_id}>
          <Link href={`/tv/${trakt_id}`}>
            <ShowLink>
              <img src={image}/>
              <span>{title}</span>
            </ShowLink>
          </Link>
        </li>
      ))}
    </ShowList>
  )
}


export default ProgressPage;
