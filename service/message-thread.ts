import type { AxiosInstance } from "axios";

type MessageThread = {
  hasPublisherRole: boolean;
  hasApplicantRole: boolean;
  totalResults: number;
  page: number;
  pageSize: number;
  results: [
    {
      id: number;
      relatedEntity: string | null;
      relatedEntityType: string | null;
      relatedEntityState: string | null;
      title: string;
      hasUnreadMessages: boolean;
      hasAttachments: boolean;
      lastMessage: {
        sender: { id: string; name: string };
        receiver: { id: string; name: string };
        body: string;
        status: string;
        attachments: Array<unknown>;
        id: string;
        created: string;
      };
    }
  ];
};

export async function logMessageThreads(client: AxiosInstance) {
  const messagesResponse = await client.post<MessageThread>(
    "/api/communications/threads",
    {
      page: 0,
      pageSize: 100,
      orderDirection: "DESC",
    }
  );

  messagesResponse.data.results.forEach((msg) =>
    console.log(
      `Recid ID: ${msg.relatedEntity}, Address: ${msg.title}, Created: ${msg.lastMessage.created}`
    )
  );
}
