# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js App Router project. PostHog has been configured with client-side analytics using the modern `instrumentation-client.ts` approach (recommended for Next.js 15.3+). A reverse proxy has been set up via Next.js rewrites to improve tracking reliability and reduce ad-blocker interference. Three custom events have been instrumented to track key user interactions with the Dev Events platform.

## Configuration Files Created/Modified

| File | Description |
|------|-------------|
| `.env` | Environment variables for PostHog API key and host |
| `instrumentation-client.ts` | Client-side PostHog initialization with exception capture |
| `next.config.ts` | Added reverse proxy rewrites for PostHog ingestion |

## Events Instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button to scroll to the events section | `components/ExoploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes event_title, event_slug, event_location, event_date properties) | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the navbar (includes link_name property) | `components/NavBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/117303/dashboard/491812)

### Insights
- [Event Card Clicks - Total](https://eu.posthog.com/project/117303/insights/lwGfi1Ie) - Total number of event card clicks over time
- [Navigation Link Clicks](https://eu.posthog.com/project/117303/insights/ixLjWUia) - Breakdown of navigation link clicks by link name
- [Explore Events Button Clicks](https://eu.posthog.com/project/117303/insights/yBrEEGxr) - Number of times users clicked the Explore Events button
- [Event Interest by Location](https://eu.posthog.com/project/117303/insights/LxANSzR8) - Breakdown of event card clicks by event location
- [Event Discovery Funnel](https://eu.posthog.com/project/117303/insights/5m23Lf9e) - Conversion funnel from exploring events to clicking on an event card

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
