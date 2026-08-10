export const EVENT = {
    name: process.env.NEXT_PUBLIC_QUINCEANERA_NAME ?? "",
    title: process.env.NEXT_PUBLIC_EVENT_TITLE ?? "",
    date_format: new Date(process.env.NEXT_PUBLIC_EVENT_DATE ?? ""),

    date: {
        day: process.env.NEXT_PUBLIC_EVENT_DAY ?? "",
        month: process.env.NEXT_PUBLIC_EVENT_MONTH ?? "",
        year: process.env.NEXT_PUBLIC_EVENT_YEAR ?? "",
    },

    ceremony: {
        time: process.env.NEXT_PUBLIC_CEREMONY_TIME ?? "",
        place: [
            process.env.NEXT_PUBLIC_CEREMONY_PLACE_LINE_1 ?? "",
            process.env.NEXT_PUBLIC_CEREMONY_PLACE_LINE_2 ?? "",
        ],
        mapsUrl: process.env.NEXT_PUBLIC_CEREMONY_MAPS_URL ?? "#",
    },

    reception: {
        time: process.env.NEXT_PUBLIC_RECEPTION_TIME ?? "",
        place: [
            process.env.NEXT_PUBLIC_RECEPTION_PLACE_LINE_1 ?? "",
            process.env.NEXT_PUBLIC_RECEPTION_PLACE_LINE_2 ?? "",
        ],
        mapsUrl: process.env.NEXT_PUBLIC_RECEPTION_MAPS_URL ?? "#",
    },

    data: {
        name: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
        title: process.env.NEXT_PUBLIC_EVENT_TITLE ?? "",
    }
};