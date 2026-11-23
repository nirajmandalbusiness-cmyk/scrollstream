export type MediaPost = {
    id: string;
    type: 'video' | 'image';
    src: string;
    poster?: string;
    caption: string;
    creator: string;
};

// Free, license-friendly sample media (Pexels / Google sample assets)
export const mediaPosts: MediaPost[] = [
    {
        id: 'p1',
        type: 'video',
        src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
        caption: 'Burning up the feed 🔥 #demo',
        creator: '@scroller',
    },
    {
        id: 'p2',
        type: 'image',
        src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1080',
        caption: 'Golden hour vibes ✨',
        creator: '@lensmaster',
    },
    {
        id: 'p3',
        type: 'video',
        src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
        caption: 'Big dreams, bigger elephants 🐘',
        creator: '@animallover',
    },
    {
        id: 'p4',
        type: 'image',
        src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1080',
        caption: 'Mountain mornings 🏔️',
        creator: '@wanderer',
    },
    {
        id: 'p5',
        type: 'video',
        src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        caption: 'Sunday cartoon energy 🐰',
        creator: '@cartoonfan',
    },
];