import getSubdomain from '@/utils/get-subdomain';
import { get } from '@vercel/edge-config';
export default function WildcardRoute(props) {
    return null;
}

export async function getServerSideProps(context) {
    const host = context.req.headers.host;
    const slug = `/${(context.params.slug || [])
        .filter((item) => item !== "slugs")
        .join("/")}`;

    const subdomain = getSubdomain(host)

    const configStore = await get('redirect_links')

    const redirectRules = configStore[subdomain];

    let redirectUrl = redirectRules?.paths?.[slug];

    if (!redirectUrl && redirectRules?.paths?.['*']) {
        redirectUrl = redirectRules?.paths?.['*']
    }

    return {
        redirect: {
            permanent: false,
            destination: redirectUrl
        },
    };
}
