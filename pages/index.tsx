import React from "react";
import Link from 'next/link';
import LogButton from "../component/log-button"
import myFetch from "../utils/fetch";

function HomePage() {
  const [api, setApi] = React.useState('');
  const [dataFetched, setDataFetched] = React.useState({});

  const clickHandler = async () => {
    const result = await myFetch(`/api/${api}`);
    setDataFetched(await result.json());
  }
  return (
    <div>
      <div>Welcome to Next.js!</div>
      <LogButton/>
      <Link href="/progress">
        <a>Progress Shows</a>
      </Link>
      <div>
        /api/<input type="text" onChange={e => setApi(e.target.value)} value={api}/>
        <button onClick={clickHandler}>GO</button>
      </div>
      <pre>{JSON.stringify(dataFetched, null, 2)}</pre>
    </div>
  )
}

export default HomePage