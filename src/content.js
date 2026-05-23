export const TOURNAMENT = {
    title: 'OG Classic Format Singapore',
    subtitle:
        'Schedules, registration, and updates for the official Singapore hub.',
    href: 'https://www.ogcfvsingapore.com/',
}

export const WHATSAPP_COMMUNITY_URL =
    'https://chat.whatsapp.com/FliaDgWZ51v8KypAGQpDKo'

export const CARD_SHOPS = [
    {
        name: 'Mint Condition',
        area: 'Havelock',
        href: 'https://maps.app.goo.gl/j4XHGC9QLfXcHPSc9',
    },
    {
        name: 'Tefuda',
        area: 'MacPherson',
        href: 'https://maps.app.goo.gl/bBA9VD1sCFUT54h27',
    },
    {
        name: 'Sentinel',
        area: 'Tai Seng',
        href: 'https://maps.app.goo.gl/RCTJ2Z7KqZAoWo3D8',
    },
]

/** Other Singapore OG / Classic Vanguard communities (add more entries as needed). */
export const SG_OG_VANGUARD_GROUPS = [
    {
        name: 'NUS TCG Club',
        href: 'https://t.me/+U6V3HUg3G2owZGI9',
        linkLabel: 'Join on Telegram →',
    },
]

export const INFLUENCERS = [
    {
        label: 'Vintage Vanguard',
        handle: '@vintagevanguard13',
        href: 'https://www.tiktok.com/@vintagevanguard13',
        platform: 'tiktok',
    },
    {
        label: 'OmeletteX',
        handle: '@ChaneLX645',
        href: 'https://www.youtube.com/@ChaneLX645',
        platform: 'youtube',
    },
    {
        label: 'Lester',
        handle: '@lesterhereee',
        href: 'https://www.instagram.com/lesterhereee/',
        platform: 'instagram',
    },
    {
        label: 'Reax Collection',
        handle: '@reaxcollection',
        href: 'https://www.tiktok.com/@reaxcollection',
        platform: 'tiktok',
    },
    {
        label: 'Spencer',
        handle: '@misgradekingmgk',
        href: 'https://www.tiktok.com/@misgradekingmgk',
        platform: 'tiktok',
    },
    {
        label: 'Eugene',
        handle: '@ctj_collection',
        href: 'https://www.instagram.com/ctj_collection/',
        platform: 'instagram',
    },


]

export const BUY_OPTIONS = [
    {
        title: 'callane',
        detail: 'Decks, singles, and Vanguard accessories.',
        href: 'https://www.carousell.sg/u/callane/',
        linkLabel: 'Carousell →',
    },
    {
        title: 'Full Yen · Mr Poh',
        detail: 'SPs and high-rares.',
        href: 'https://sg.shp.ee/Jw5VZBri',
        linkLabel: 'Shopee →',
    },
    {
        title: 'Mint Condition',
        detail: 'Commons and rares.',
        href: 'https://maps.app.goo.gl/j4XHGC9QLfXcHPSc9',
        linkLabel: 'Google Maps →',
    },
]

export const META = {
    title: 'Season 3 meta decklists',
    body: 'Meta snapshots and deck ideas from VG Paradox.',
    href: 'https://vg-paradox.com/subpage/Legacy/BR/BRDecks',
}

export const COMMUNITY_DECKLIST = {
    title: 'Community Tournament decklist',
    body: "See what's popular among the community.",
    href: 'https://www.ogcfvsingapore.com/decklist',
}

export const LEADERS = ['Eugene', 'Lester', 'Yuhang', 'Gabriel', 'Spencer', 'Caden']

export const SPENDERS = ['Ben', 'Lucas', 'Evan']

export const WHALES = ['Kirk', 'Pathie']


/** ImageKit CDN — https://ik.imagekit.io/xnmaefnjt */
export const IMAGEKIT_BASE_URL = 'https://ik.imagekit.io/xnmaefnjt'

/** Build public ImageKit URL, e.g. …/23%20May%202026/26May13.jpg */
export function imageKitUrl(folderPath, fileName) {
    const folder = folderPath
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')
    return `${IMAGEKIT_BASE_URL}/${folder}/${encodeURIComponent(fileName)}`
}

/** Generate files from prefix + 1…count, e.g. 4Apr1.jpg … 4Apr11.jpg */
export function imageKitPhotoSeries({
    folderPath,
    prefix,
    count,
    ext = 'jpg',
    title,
}) {
    return Array.from({ length: count }, (_, i) => {
        const n = i + 1
        const file = `${prefix}${n}.${ext}`
        return {
            src: imageKitUrl(folderPath, file),
            alt: title,
        }
    })
}

/** Photos shown when a month folder is opened (excludes poster). */
export function getGalleryPhotos(event) {
    if (event.imageKit) {
        return imageKitPhotoSeries({
            folderPath: event.imageKit.folderPath,
            prefix: event.imageKit.prefix,
            count: event.imageKit.count,
            ext: event.imageKit.ext ?? 'jpg',
            title: event.title,
        })
    }
    return event.photos ?? []
}

export function galleryHasPhotos(event) {
    if (event.imageKit) return true
    return (event.photos ?? []).some((p) => p.src)
}

/** Monthly big events — poster on folder; photos load below on click */
export const GALLERY_EVENTS = [
    {
        id: '2026-05-sentinel-limit-break',
        month: 'May 2026',
        title: 'Sentinel Games Opening — Limit Break Tournament',

        poster: {
            src: '/gallery/PosterMay.JPG',
            alt: 'Sentinel Games Opening Limit Break Tournament poster — 23 May 2026, Singapore',
        },
        imageKit: {
            folderPath: '23 May 2026',
            prefix: '26May',
            count: 30,
            ext: 'jpg',
        },
    },
    {
        id: '2026-04-mint-limit-break',
        month: 'April 2026',
        title: 'Biggest OG Limit Break Tournament',

        poster: {
            src: '/gallery/PosterApril.jpg',
            alt: 'Biggest OG Limit Break Tournament poster — 4 April 2026, Mint Condition Singapore',
        },
        imageKit: {
            folderPath: '4 Apr 2026',
            prefix: '4Apr',
            count: 11,
            ext: 'jpg',
        },
    },

]

export const NAV_LINKS = [
    {
        label: 'Join',
        href: WHATSAPP_COMMUNITY_URL,
        external: true,
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Shop', href: '/#buy' },
    {
        label: 'Upcoming Tournament',
        href: 'https://www.ogcfvsingapore.com/',
        external: true,
    },

    { label: 'Feeling lucky', href: '/feelinglucky' },

]

export const STATS = [
    { value: '3', label: 'Cardshops' },
    { value: '250+', label: 'Active players' },
    { value: '100+', label: 'Tournaments yearly' },
]
