export type Event = {
  id: string;
  title: string;
  image: string; // path under /images
  slug: string;
  location: string;
  date: string; // human-readable or ISO (e.g. 2026-03-12)
  time: string; // human-readable time range
};

export const events: Event[] = [
  {
    id: "react-summit-2026",
    title: "React Summit 2026",
    slug: "react-summit-2026",
    date: "2026-03-12",
    time: "09:00 - 18:00",
    location: "RAI Amsterdam, Netherlands",
    image: "/images/event1.png",
  },

  {
    id: "jsconf-eu-2026",
    title: "JSConf EU 2026",
    slug: "jsconf-eu-2026",
    date: "2026-06-04",
    time: "10:00 - 17:30",
    location: "Radialsystem V, Berlin, Germany",
    image: "/images/event2.png",
  },

  {
    id: "nextjs-conf-2026",
    title: "Next.js Conf 2026",
    slug: "nextjs-conf-2026",
    date: "2026-10-14",
    time: "11:00 - 16:00",
    location: "San Francisco (hybrid)",
    image: "/images/event3.png",
  },

  {
    id: "hackmit-2026",
    title: "HackMIT 2026",
    slug: "hackmit-2026",
    date: "2026-02-21",
    time: "18:00 - 18:00 (48h)",
    location: "MIT Campus, Cambridge, MA",
    image: "/images/event4.png",
  },

  {
    id: "pycon-us-2026",
    title: "PyCon US 2026",
    slug: "pycon-us-2026",
    date: "2026-05-01",
    time: "09:00 - 17:00",
    location: "David L. Lawrence Convention Center, Pittsburgh",
    image: "/images/event5.png",
  },

  {
    id: "devopsdays-copenhagen-2026",
    title: "DevOpsDays Copenhagen 2026",
    slug: "devopsdays-copenhagen-2026",
    date: "2026-07-10",
    time: "09:30 - 16:30",
    location: "Industrial Culture House, Copenhagen",
    image: "/images/event6.png",
  },
];

export default events;
