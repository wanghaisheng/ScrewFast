export type ContactUsData = {
    pageTitle: string;
    subTitle: string;
    form: {
      formTitle: string;
      formSubTitle: string;
      fields: Array<
        | {
            type: "text";
            id: string;
            label: string;
            name: string;
          }
        | {
            type: "email";
            id: string;
          }
        | {
            type: "phone";
            id: string;
          }
        | {
            type: "textarea";
            id: string;
            label: string;
            name: string;
          }
      >;
      submitButton: {
        type: "button";
        title: string;
      };
    };
    contactMethods: Array<{
      heading: string;
      content: string;
      link?: {
        isVisible: boolean;
        title?: string;
        url?: string;
      };
      isArrowVisible?: boolean;
      address?: {
        isVisible: boolean;
        content?: string;
      };
      icon: string;
    }>;
  };
  