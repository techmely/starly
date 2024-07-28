// So we can write code like:
// <Button
//   data-track-event-name="home__click_xyz"
//   data-track-params={JSON.stringify(params)}
// >

// </Button>
export function handleAnalytics(event: Event) {
  const element = event.target as HTMLElement;
  const { trackEventName, trackParams } = element?.dataset || {};

  if (trackEventName) {
    const actionParams = trackParams ? JSON.parse(trackParams) : {};
    console.log("track", trackEventName, actionParams);
  }
}
