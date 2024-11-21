interface Window {
  gtag: (
    type: string,
    tagId: string,
    config?: {
      page_path?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
}