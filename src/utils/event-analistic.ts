export const eventAnalistic = ({ action, category, label, value }: any) => {
  if (
    typeof window !== "undefined" &&
    typeof (window as any).gtag === "function"
  ) {
    (window as any)?.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.error("Google Analytics gtag function is not available.");
  }
};
