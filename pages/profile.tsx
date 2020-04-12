import { GetServerSideProps, NextPage } from "next"
import fetch from 'isomorphic-unfetch';
import getHost from "../utils/getHost";

type ProfileProps = {
  profile: any;
}
const ProfilePage: NextPage<ProfileProps> = ({ profile }) => {
  return (
    <div>
      <div>Profile page</div>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { cookie } = context.req.headers;
  const res = await fetch(`${getHost(context.req)}/api/trakt/profile`, { credentials: 'include', headers: { cookie }});
  const profile = await res.json();
  return {
    props: { profile }
  }
}

export default ProfilePage